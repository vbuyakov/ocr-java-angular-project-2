import { Component, inject, Input, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { Logger } from '../../services/logger';

@Component({
  selector: 'app-country-medals-chart',
  standalone: true,
  imports: [],
  templateUrl: './country-medals-chart.html',
  styleUrl: './country-medals-chart.scss',
})
export class CountryMedalsChart implements OnChanges, AfterViewInit, OnDestroy {
  private logger = inject(Logger);

  @Input() years: number[] = [];
  @Input() medals: number[] = [];
  @ViewChild('chartCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private lineChart?: Chart<"line", string[], number>;

  ngAfterViewInit() {
    if (this.years.length > 0 && this.medals.length > 0) {
      this.buildChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['years'] || changes['medals']) {
      if (this.years.length > 0 && this.medals.length > 0) {
        setTimeout(() => this.buildChart(), 0);
      }
    }
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  private destroyChart() {
    if (this.lineChart) {
      try {
        this.lineChart.destroy();
      } catch (error) {
        // Chart might already be destroyed or in an invalid state
      }
      this.lineChart = undefined;
    }
  }

  private buildChart() {
    // Destroy existing chart if it exists
    this.destroyChart();

    if (!this.canvasRef?.nativeElement) {
      return;
    }

    try {
      this.lineChart = new Chart(this.canvasRef.nativeElement, {
        type: 'line',
        data: {
          labels: this.years,
          datasets: [
            {
              label: "medals",
              data: this.medals.map(String),
              backgroundColor: '#0b868f'
            },
          ]
        },
        options: {
          aspectRatio: 2.5
        }
      });
    } catch (error) {
      this.logger.error('Error creating country medals chart', error);
    }
  }
}
