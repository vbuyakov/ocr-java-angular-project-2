import { Component, inject, Input, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import Chart from 'chart.js/auto';
import { Logger } from '../../services/logger';

@Component({
  selector: 'app-all-countries-chart',
  standalone: true,
  imports: [],
  templateUrl: './all-countries-chart.html',
  styleUrl: './all-countries-chart.scss',
})
export class AllCountriesChart implements OnChanges, AfterViewInit, OnDestroy {
  private router = inject(Router);
  private logger = inject(Logger);
  private breakpointObserver = inject(BreakpointObserver);

  @Input() countries: string[] = [];
  @Input() medals: number[] = [];
  @ViewChild('chartCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private pieChart?: Chart<"pie", number[], string>;
  private isMobile = false;

  ngAfterViewInit() {
    // Initialize mobile state synchronously
    this.isMobile = this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet]);

    // Observe breakpoint changes
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(result => result.matches))
      .subscribe(isMobile => {
        this.isMobile = isMobile;
        // Rebuild chart when breakpoint changes
        if (this.countries.length > 0 && this.medals.length > 0) {
          setTimeout(() => this.buildChart(), 0);
        }
      });

    if (this.countries.length > 0 && this.medals.length > 0) {
      this.buildChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['countries'] || changes['medals']) {
      if (this.countries.length > 0 && this.medals.length > 0) {
        setTimeout(() => this.buildChart(), 0);
      }
    }
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  private destroyChart() {
    if (this.pieChart) {
      try {
        this.pieChart.destroy();
      } catch (error) {
        // Chart might already be destroyed or in an invalid state
      }
      this.pieChart = undefined;
    }
  }

  private buildChart() {
    // Destroy existing chart if it exists
    this.destroyChart();

    if (!this.canvasRef?.nativeElement) {
      return;
    }

    try {
      this.pieChart = new Chart(this.canvasRef.nativeElement, {
        type: 'pie',
        data: {
          labels: this.countries,
          datasets: [{
            label: 'Medals',
            data: this.medals,
            backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
            hoverOffset: 4
          }],
        },
        options: {
          // Use smaller aspectRatio on mobile (makes chart taller/more visible)
          aspectRatio: this.isMobile ? 1.2 : 2.5,
          responsive: true,
          maintainAspectRatio: true,
          onClick: (e) => {
            if (e.native && this.pieChart) {
              try {
                const points = this.pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true);
                if (points.length && this.pieChart.data.labels) {
                  const firstPoint = points[0];
                  const countryName = this.pieChart.data.labels[firstPoint.index];
                  if (countryName) {
                    this.router.navigate(['country', countryName]);
                  }
                }
              } catch (error) {
                // Ignore errors during navigation or if chart is being destroyed
              }
            }
          }
        }
      });
    } catch (error) {
      this.logger.error('Error creating all countries chart', error);
    }
  }
}
