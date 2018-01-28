import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService, StoreHelper, SearchService } from './index';

@Injectable()
export class CustomerService {

  private customersPath: string = 'customer';

  constructor(
    private api: ApiService,
    private storeHelper: StoreHelper,
    private searchService: SearchService
  ) {}

  getAllCustomers() {
    return this.api.get(`${this.customersPath}?pageNumber=0&pageCapacity=10000`)
      .do(({totalElements, content}) => {
        content.sort((a, b) => a.customerId - b.customerId);
        this.storeHelper.update(this.customersPath, content);
      });
  }


  list(searchQuery: string = '', page: number = 1, length: number = 10) {
    let customerResult = this.searchService.search(this.storeHelper.get(this.customersPath), searchQuery, ['customerFirstName', 'customerLastName', 'customerEmail', 'customerNote', 'customerPhoneNumber', 'customerCity']);

    let customerResultPage = customerResult.slice((page - 1) * length, page * length);

    return Observable.of({
      customers: customerResultPage,
      filtered: customerResult.length
    });
  }

  purgeStore() {
    this.storeHelper.update(this.customersPath, []);
  }

}
