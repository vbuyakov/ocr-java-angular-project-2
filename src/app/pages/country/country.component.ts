import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap, catchError, EMPTY, of } from 'rxjs';
import { DataService } from '../../services/data-service';
import { Olympic } from '../../models/olympic-results';
import { Loader } from '../../components/loader/loader';
import { CountryMedalsChart } from '../../components/country-medals-chart/country-medals-chart';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  standalone: true,
  imports: [RouterLink, Loader, CountryMedalsChart, NgOptimizedImage],
})
export class CountryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);

  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;
  public loading: boolean = true;
  public years: number[] = [];
  public medals: number[] = [];

  ngOnInit() {
    this.loading = true;
    this.route.paramMap
      .pipe(
        switchMap((param) => {
          const countryName = param.get('countryName');
          if (!countryName) {
            this.router.navigate(['/not-found']);
            return EMPTY;
          }
          return this.dataService.getCountryResult(countryName);
        }),
        switchMap((selectedCountry) => {
          if (!selectedCountry) {
            this.router.navigate(['/not-found']);
            return EMPTY;
          }
          return of(selectedCountry);
        }),
        catchError(() => {
          this.router.navigate(['/not-found']);
          return EMPTY;
        })
      )
      .subscribe((selectedCountry) => {
        this.titlePage = selectedCountry.country;
        this.totalEntries = selectedCountry.participations.length;

        this.years = selectedCountry.participations.map((participation) => participation.year);
        const medalsData = selectedCountry.participations.map((participation) => participation.medalsCount);
        this.medals = medalsData;
        this.totalMedals = medalsData.reduce((acc, count) => acc + count, 0);

        const athleteCounts = selectedCountry.participations.map((participation) => participation.athleteCount);
        this.totalAthletes = athleteCounts.reduce((acc, count) => acc + count, 0);

        this.loading = false;
      });
  }
}
