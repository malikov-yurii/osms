import { Component, OnInit } from '@angular/core';

import { fadeInOut } from '../animations';
import { ICurrency } from '../../models/currencies.interface';
import { ApiService } from '../../services/api.service';
import { finalize } from 'rxjs/operators';
import { NotyService } from '../../services/noty.service';

@Component({
  moduleId: module.id,
  selector: 'nav-header',
  templateUrl: 'header.html',
  styleUrls: ['header.css'],
  animations: [fadeInOut({paramsVoid: 'collapsed', paramsAny: 'expanded'})]
})
export class Header implements OnInit {
  menuState: string;
  currencies: ICurrency[] = [];

  constructor(private api: ApiService,
              private notyService: NotyService) {
    this.menuState = 'collapsed';
  }

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies(updated = false) {
    const apiUrl = updated ? '/currencies/updated' : '/currencies';

    if (updated && this.currencies.some(currency => (new Date().getTime() - currency.lastAutoUpdateAttempt.getTime()) < 300000)) {
      this.notyService.renderNoty('Нельзя обновлять чаще, чем 1 раз в 5 минут!', true);
      return;
    }

    this.currencies.forEach(currency => currency.isLoading = true);
    this.api.get(apiUrl, updated)
      .pipe( finalize(() => this.currencies.forEach(currency => currency.isLoading = false)) )
      .subscribe((currencies: ICurrency[]) => {
        this.currencies = currencies.map(currency => {
          return {
            ...currency,
            lastUpdated: new Date(currency.lastUpdated),
            lastAutoUpdateAttempt: new Date(currency.lastAutoUpdateAttempt),
            isLoading: true,
            isEditable: false
          }
        });
      });
  }

  toggleMenuState() {
    this.menuState = this.menuState === 'collapsed' ? 'expanded' : 'collapsed';
  }

  setRate(currency: ICurrency) {
    let exchangeRate: any = prompt('Введите новое значение курса, например: 31.35');

    if (!exchangeRate) {
      return;
    } else {
      exchangeRate = parseFloat(exchangeRate.replace(',', '.'));
    }

    currency.isLoading = true;
    this.api.put(`/currencies`, [{ code: currency.code, exchangeRate }])
      .pipe( finalize(() => currency.isLoading = false) )
      .subscribe(
        () => currency.exchangeRate = exchangeRate,
        error => this.notyService.renderNoty(error, true)
      );
  }
}
