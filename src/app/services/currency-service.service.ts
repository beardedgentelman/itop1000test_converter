import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, throwError, catchError, Observable, tap } from 'rxjs';
import { ErrorService } from './error.service';
import { ICurrency } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  rates: ICurrency[] = [];

  private apiUrl =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  getAllRates(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(this.apiUrl).pipe(
      retry(2),
      catchError(this.errorHandler.bind(this)),
      tap((rates: ICurrency[]) => {
        this.rates = rates;
      })
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
