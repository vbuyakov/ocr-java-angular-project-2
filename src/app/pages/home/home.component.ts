import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data-service';
import { Olympic } from '../../models/olympic-results';
import { Loader } from '../../components/loader/loader';
import { AllCountriesChart } from '../../components/all-countries-chart/all-countries-chart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [Loader, AllCountriesChart],
})
export class HomeComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  public totalCountries: number = 0;
  public totalJOs: number = 0;
  public loading: boolean = true;
  public countries: string[] = [];
  public medals: number[] = [];
  titlePage: string = "Medals per Country";

  ngOnInit() {
    this.loading = true;
    this.dataService.getResults().subscribe({
      next: (data) => {
        // Handle empty or missing data
        if (!data || data.length === 0) {
          this.router.navigate(['/not-found']);
          return;
        }

        this.totalJOs = Array.from(new Set(data.map((olympic: Olympic) => 
          olympic.participations.map((participation) => participation.year)
        ).flat())).length;
        
        this.countries = data.map((olympic: Olympic) => olympic.country);
        this.totalCountries = this.countries.length;
        
        const medals = data.map((olympic: Olympic) => 
          olympic.participations.map((participation) => participation.medalsCount)
        );
        this.medals = medals.map((medalArray) => 
          medalArray.reduce((acc, count) => acc + count, 0)
        );
        
        this.loading = false;
      },
      error: () => {
        // Redirect to not-found page on error (user-friendly, no technical messages)
        this.router.navigate(['/not-found']);
      }
    });
  }
}

