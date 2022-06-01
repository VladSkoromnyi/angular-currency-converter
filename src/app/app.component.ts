import { Component } from '@angular/core';
import { CurrencyapidataService } from './currencyapidata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency-converter';
  currencyJson: any = [];

  resultFromTo = 0;
  resultToFrom = 0;
  select_from = 'USD';
  select_to = 'UAH';

  currencies = [
    "USD",
    "UAH",
    "EUR",
  ]

  errorMessage = '';
  regex = /^\d+$/;

  headerCurrency = {
    USD: 0,
    EUR: 0,
  }

  changeSelectFrom(value: string) {
    this.select_from = value;
  }

  changeSelectTo(value: string) {
    this.select_to = value;
  }

  changeAmountFrom(value: string) {
    this.resultFromTo = +value;
  }

  changeAmountTo(value: string) {
    this.resultToFrom = +value;
  }

  validation(value: string) {
    if (!this.regex.test(value) && value.length) {
      this.errorMessage = 'Please enter a valid value'
    } else {
      this.errorMessage = '';
    }
  }

  constructor (private currency: CurrencyapidataService) { }

  ngOnInit() {
    this.currency.getPrice()
      .subscribe((result: any) => {
        this.headerCurrency = result;
      })
  }

  convertFromTo(value: string) {
    this.currency.getCurrencyData(this.select_from, this.select_to)
      .subscribe(data => {
        this.changeAmountFrom(value);
        this.validation(value);
        console.log(this.errorMessage);
        this.currencyJson = data;
        this.resultFromTo = +this.resultFromTo * this.currencyJson[this.select_to];
      });
  }

  convertToFrom(value: string) {
    this.currency.getCurrencyData(this.select_to, this.select_from)
      .subscribe(data => {
        this.changeAmountTo(value);
        this.validation(value);
        this.currencyJson = data;
        this.resultToFrom = +this.resultToFrom * this.currencyJson[this.select_from];
      });
  }
}
