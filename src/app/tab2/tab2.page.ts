import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currencyService';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  currencies: string[] = [];
  baseCurrency = 'USD';
  targetCurrency = 'EUR';
  amount = 1;
  conversionResult: number | null = null;
  history: { base: string; target: string; amount: number; result: number }[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.loadCurrencies();
  }

  loadCurrencies() {
    this.currencyService.getExchangeRates('USD').subscribe((data: any) => {
      this.currencies = Object.keys(data.rates);
    });
  }

  convert() {
    this.currencyService.getExchangeRates(this.baseCurrency).subscribe((data: any) => {
      const rate = data.rates[this.targetCurrency];
      this.conversionResult = this.amount * rate;

    
      this.history.unshift({
        base: this.baseCurrency,
        target: this.targetCurrency,
        amount: this.amount,
        result: this.conversionResult,
      });


      if (this.history.length > 10) {
        this.history.pop();
      }
    });
  }
}
