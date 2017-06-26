import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import { ApiService} from './api';
import { StoreHelper } from './store-helper';
import { SearchService } from './search';
import { Order, Product } from '../models';


@Injectable()
export class OrderService {
  ordersPath: string = 'orders';
  productsPath: string = 'orderItemTos';

  constructor(
    private api: ApiService,
    private storeHelper: StoreHelper,
    private searchService: SearchService
  ) {}

  getOrders(start: number, length: number): Observable<any> {
    return this.api.get(`${this.ordersPath}?start=${start}&length=${length}`)
      .do(resp => this.storeHelper.update(this.ordersPath, resp.data));
  }

  preloadOrders(start: number, length: number, multiplier: number): Observable<any> {
    return this.api.get(`${this.ordersPath}?start=${start + length}&length=${length * multiplier}`)
      .do(resp => this.storeHelper.addArrayLast(this.ordersPath, resp.data));
  }

  getAllOrders(): Observable<any> {
    return this.api.get(`${this.ordersPath}?start=0&length=10000`);
  }



  addOrder() {
    let newOrder = new Order();
    let newOrderId = newOrder.id;
    this.storeHelper.add(this.ordersPath, newOrder);
  }

  deleteOrder(orderId) {
    return this.storeHelper.findAndDelete(this.ordersPath, orderId);
    // return this.api.delete(`${this.ordersPath}/${orderId}`)
    //   .do(() => this.storeHelper.findAndDelete(this.ordersPath, orderId));
  }

  addProduct(orderId) {
    return this.storeHelper.findDeepAndAdd(this.ordersPath, orderId, this.productsPath, new Product());
    // return this.api.post(`${this.ordersPath}/${orderId}/add-order-item`)
    // .do(() => this.getOrders().subscribe());
  }

  deleteProduct(orderId, productId) {
    return this.storeHelper.findDeepAndDelete(this.ordersPath, orderId, this.productsPath, productId);
    // return this.api.delete(`${this.ordersPath}/order-item/${productId}`)
    //   .do(() => this.storeHelper.findAndDelete(this.ordersPath, productId));
  }

  getStore() {
    this.storeHelper.onGetState();
  }

  updateOrderInfo(orderId, fieldName, value) {

    let updated = this.storeHelper.findAndUpdate(this.ordersPath, orderId, fieldName, value);
    if (updated) {

      if (parseInt(orderId, 10)) {
        fieldName = this.camelCaseToDash(fieldName);
        this.api.post(
          `${this.ordersPath}/${orderId}/update-${fieldName}`,
          `${fieldName}=${value}`
        ).subscribe();
      }

    }
  }
  updateOrderInfoWithObject(orderId, object) {
    let updated = this.storeHelper.findAndUpdateWithObject(this.ordersPath, orderId, object);
  }

  updateProduct(orderId, productId, fieldName, value) {

    let updated = this.storeHelper.findDeepAndUpdate(this.ordersPath, orderId, this.productsPath, productId, fieldName, value);
    if (updated) {

      if (parseInt(orderId, 10)) {
        fieldName = this.camelCaseToDash(fieldName);
        this.api.post(
          `${this.ordersPath}/${productId}/update-${fieldName}`,
          `${fieldName}=${value}`
        ).subscribe(
          data => {
            if (data) { this.storeHelper.findAndUpdate(this.ordersPath, orderId, 'totalSum', data); }
          }
        );
      }

    }
  }


  list(searchQuery: string = '', page: number = 1, length: number = 10) {
    let orderResult = this.searchService.search(this.storeHelper.get(this.ordersPath), searchQuery);

    let orderResultPage = orderResult.slice((page - 1) * length, page * length);

    return Observable.of({
      orders: orderResultPage,
      filtered: orderResult.length
    });
  }

  autocomplete(type: string, term: string) {
    if (type === 'info') {
      return this.api.post(
        `${this.ordersPath}/autocomplete-last-name`,
        `term=${term}`
      )
    } else if (type === 'product') {
      return this.api.post(
        `${this.ordersPath}/autocomplete-order-item-name`,
        `term=${term}`
      )
    }
  }




  private camelCaseToDash(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  }

}
