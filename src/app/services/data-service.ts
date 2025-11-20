import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Olympic, OlympicResults } from '../models/olympic-results';
import { Logger } from './logger';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private logger = inject(Logger);
  private apiUrl = environment.apiUrl;

  /**
   * Gets all Olympic results
   * @returns Observable of Olympic results array
   */
  getResults(): Observable<OlympicResults> {
    this.logger.debug('Fetching Olympic results from', this.apiUrl);
    return this.http.get<OlympicResults>(this.apiUrl).pipe(
      map((data) => {
        this.logger.log('Olympic results loaded successfully', { count: data.length });
        return data;
      }),
      catchError((error) => {
        this.logger.error('Error fetching Olympic results', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Gets Olympic results for a specific country
   * @param countryName - Name of the country
   * @returns Observable of Olympic data for the country, or undefined if not found
   */
  getCountryResult(countryName: string): Observable<Olympic | undefined> {
    this.logger.debug('Fetching results for country', countryName);
    return this.getResults().pipe(
      map((data) => {
        const country = data.find((olympic) => olympic.country === countryName);
        if (country) {
          this.logger.log('Country results found', { country: countryName });
        } else {
          this.logger.warn('Country not found', { country: countryName });
        }
        return country;
      }),
      catchError((error) => {
        this.logger.error('Error fetching country results', { country: countryName, error });
        return throwError(() => error);
      })
    );
  }
}
