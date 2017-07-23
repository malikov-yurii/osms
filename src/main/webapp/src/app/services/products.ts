import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService, StoreHelper, SearchService } from './index';

@Injectable()
export class ProductService {

  private productsPath: string = 'product';

  constructor(
    private api: ApiService,
    private storeHelper: StoreHelper,
    private searchService: SearchService
  ) {}

  getAllProducts() {
    return this.api.get(`${this.productsPath}?pageNumber=0&pageCapacity=10000`)
      .do(({totalElements, elements}) => {
        elements.sort((a, b) => a.id - b.id);
        this.storeHelper.update(this.productsPath, elements);
      });
  }


  list(searchQuery: string, page: number, length: number, filterData: {label, data}) {
    let searchResult = this.searchService.search(this.storeHelper.get(this.productsPath), searchQuery);
    let filterResult = searchResult.filter(product => {
      if (product[filterData.label]) {
        if (product[filterData.label].indexOf(filterData.data) > -1) { return true; }
      } else { return true; }
    });

    let productResultPage = filterResult.slice((page - 1) * length, page * length);

    return Observable.of({
      products: productResultPage,
      filtered: filterResult.length
    });
  }

  updateProductField(productId, productVarId, body) {
    if (productVarId !== 0) {
      body['variationId'] = productVarId;
    }
    this.api.put(`${this.productsPath}/${productId}`, body, true).subscribe();
  }

}
