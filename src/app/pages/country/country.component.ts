import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
import { switchMap, catchError, EMPTY, of } from 'rxjs';
import { DataService } from '../../services/data-service';
import { Olympic } from '../../models/olympic-results';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class CountryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);

  public lineChart!: Chart<"line", string[], number>;
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;

  ngOnInit() {
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
        
        const years = selectedCountry.participations.map((participation) => participation.year);
        const medals = selectedCountry.participations.map((participation) => participation.medalsCount);
        this.totalMedals = medals.reduce((acc, count) => acc + count, 0);
        
        const athleteCounts = selectedCountry.participations.map((participation) => participation.athleteCount);
        this.totalAthletes = athleteCounts.reduce((acc, count) => acc + count, 0);
        
        this.buildChart(years, medals.map(String));
      });
  }

  buildChart(years: number[], medals: string[]) {
    const lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: "medals",
            data: medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
    this.lineChart = lineChart;
  }
}
