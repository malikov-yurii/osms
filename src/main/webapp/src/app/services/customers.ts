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
      .do(({totalElements, elements}) => {
        elements.sort((a, b) => a.id - b.id);
        this.storeHelper.update(this.customersPath, elements);
      });
  }


  list(searchQuery: string = '', page: number = 1, length: number = 10) {
    let customerResult = this.searchService.search(this.storeHelper.get(this.customersPath), searchQuery);

    let customerResultPage = customerResult.slice((page - 1) * length, page * length);

    return Observable.of({
      customers: customerResultPage,
      filtered: customerResult.length
    });
  }

}
