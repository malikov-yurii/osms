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
        elements = elements.map(el => {
          el.categories = el.categories.join('; ');
          return el;
        });
        this.storeHelper.update(this.productsPath, elements);
      });
  }


  list(searchQuery: string, page: number, length: number, filterData: {any}) {
    let searchResult = this.searchService.search(this.storeHelper.get(this.productsPath), searchQuery);
    let filterResult = searchResult.filter(product => {
      let flag = 0;

      for (let prop in filterData) {
        if (filterData.hasOwnProperty(prop)) {

          if (product[prop]) {
            if (product[prop].indexOf(filterData[prop]) > -1) {
              flag++;
            } else {
              return false;
            }
          } else {
            flag++;
          }

        }
      }

      return flag === Object.keys(filterData).length ? true : false;
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
    return this.api.put(`${this.productsPath}/${productId}`, body, true);
  }

  purgeStore() {
    this.storeHelper.update(this.productsPath, []);
  }

}
