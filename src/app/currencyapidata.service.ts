import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyapidataService {
  result: any;

  constructor(private http: HttpClient) { }

  getCurrencyData(
    select_from: string,
    select_to: string,
  ) {
    const API_KEY = '7ab44d8b24a58044e0baa46d274f044f2fcd907487ebaf5b2f2bfa5b5c3ab770';

    const BASE_URL = `https://min-api.cryptocompare.com/data/price?fsym=${select_from}&tsyms=${select_to}&api_key=${API_KEY}`;

    return this.http.get(BASE_URL);
  }

  getPrice() {
    const BASE_URL = 'https://min-api.cryptocompare.com/data/price?fsym=UAH&tsyms=USD,EUR';

    return this.http.get(BASE_URL);
  }
}

