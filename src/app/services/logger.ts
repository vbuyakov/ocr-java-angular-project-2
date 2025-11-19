import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProdLogger } from './prod-logger';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  private prodLogger = inject(ProdLogger);

  /**
   * Logs a message to the console in development, or to production logger in production
   */
  log(message: string, ...args: any[]): void {
    if (environment.production) {
      this.prodLogger.log(message, ...args);
    } else {
      console.log(message, ...args);
    }
  }

  /**
   * Logs an error message
   */
  error(message: string, ...args: any[]): void {
    if (environment.production) {
      this.prodLogger.error(message, ...args);
    } else {
      console.error(message, ...args);
    }
  }

  /**
   * Logs a warning message
   */
  warn(message: string, ...args: any[]): void {
    if (environment.production) {
      this.prodLogger.warn(message, ...args);
    } else {
      console.warn(message, ...args);
    }
  }

  /**
   * Logs an info message
   */
  info(message: string, ...args: any[]): void {
    if (environment.production) {
      this.prodLogger.info(message, ...args);
    } else {
      console.info(message, ...args);
    }
  }

  /**
   * Logs a debug message (typically only in development)
   */
  debug(message: string, ...args: any[]): void {
    if (environment.production) {
      this.prodLogger.debug(message, ...args);
    } else {
      console.debug(message, ...args);
    }
  }
}
