import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/';

  constructor(private http: HttpClient, private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  
  getExchangeRates(baseCurrency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${baseCurrency}`).pipe(
    
      tap(async (data: any) => {
        await this.storage.set('rates', {
          date: new Date().toISOString(),
          rates: data,
        });
      }),
      
      catchError(async () => {
        const savedRates = await this.storage.get('rates');
        if (savedRates) {
          return of(savedRates.rates); 
        } else {
          throw new Error('Sem conexão e sem dados armazenados.');
        }
      })
    );
  }
}
