import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { ApiService } from './api.service';

@Injectable()
export class PoshtaService {

  path: string = 'https://api.novaposhta.ua/v2.0/json';
  key: string = '1d11b1e838978931f9620705eb0f76df';
  myRef1 = '8a98c68a-7747-11e6-a54a-005056801333';
  myRef2 = '4dab9da1-9c0a-11e6-a54a-005056801333';

  constructor(private api: ApiService) {}

  getDocumentList(): Observable<any> {
    return this.api.postBody(`${this.path}/`, {
      apiKey: this.key,
      modelName: 'InternetDocument',
      calledMethod: 'getDocumentList',
      DateTimeFrom: '01.09.2017',
      DateTimeTo: '30.09.2017',
      GetFullList: '1'
    });
  }

  getCounterparties(): Observable<any> {
    return this.api.postBody(`${this.path}/`, {
      apiKey: this.key,
      modelName: 'Counterparty',
      calledMethod: 'getCounterparties',
      methodProperties: {
        CounterpartyProperty: 'Recipient'
        //FindByString: 'св'
      }
    });
  }

  getCounterpartyContactPerson() {
    return this.api.postBody(`${this.path}/`, {
      apiKey: this.key,
      modelName: 'Counterparty',
      calledMethod: 'getCounterpartyContactPersons',
      methodProperties: {
        Ref: this.myRef1,
        Page: '1'
      }
    });
  }

  getCounterpartyAddresses() {
    return this.api.postBody(`${this.path}/`, {
      apiKey: this.key,
      modelName: 'Counterparty',
      calledMethod: 'getCounterpartyAddresses',
      methodProperties: {
        Ref: this.myRef1,
        CounterpartyProperty: 'Recipient'
      }
    });
  }
}