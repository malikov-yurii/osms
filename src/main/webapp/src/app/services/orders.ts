import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

import { ApiService} from './api';
import { StoreHelper } from './store-helper';
import { SearchService } from './search';
import { Order, Product } from '../models';


@Injectable()
export class OrderService {
  ordersPath: string = 'orders';

  constructor(
    private api: ApiService,
    private storeHelper: StoreHelper,
    private searchService: SearchService
  ) {}

  getOrders(): Observable<any> {
    return this.api.get(`${this.ordersPath}?start=0&length=10`)
      .do(resp => this.storeHelper.update(this.ordersPath, resp.data));
  }

  getAllOrders(): Observable<any> {
    return this.api.get(`${this.ordersPath}?start=0&length=10000`);
  }

  addOrder() {
    return this.storeHelper.add(this.ordersPath, new Order());
  }

  deleteOrder(orderId) {
    return this.storeHelper.findAndDelete(this.ordersPath, orderId);
    // return this.api.delete(`${this.ordersPath}/${orderId}`)
    //   .do(() => this.storeHelper.findAndDelete(this.ordersPath, orderId));
  }

  addProduct(orderId) {
    return this.storeHelper.findAndAddProduct(this.ordersPath, orderId, new Product());
    // return this.api.post(`${this.ordersPath}/${orderId}/add-order-item`)
    // .do(() => this.getOrders().subscribe());
  }

  deleteProduct(orderId, productId) {
    return this.storeHelper.findProductAndDelete(this.ordersPath, orderId, productId);
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

  updateProduct(orderId, productId, fieldName, value) {

    let updated = this.storeHelper.findProductAndUpdate(this.ordersPath, orderId, productId, fieldName, value);
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

  search(searchQuery) {
    return this.searchService.search(this.storeHelper.get(this.ordersPath), searchQuery);
  }



  private camelCaseToDash(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  }

}