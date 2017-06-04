import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

import { ApiService} from './api';
import { StoreHelper } from './store-helper';
import { Order, Product } from '../models';


@Injectable()
export class OrderService {
  path: string = 'orders';

  constructor(
    private api: ApiService,
    private storeHelper: StoreHelper
  ) {}

  getOrders(): Observable<any> {
    return this.api.get(`${this.path}?start=0&length=10`)
      .do(resp => this.storeHelper.update('orders', resp.data));
  }

  getAllOrders(): Observable<any> {
    return this.api.get(`${this.path}?start=0&length=10000`);
  }

  addOrder() {
    return this.storeHelper.add('orders', new Order());
  }

  deleteOrder(orderId) {
    return this.storeHelper.findAndDelete('orders', orderId);
    // return this.api.delete(`${this.path}/${orderId}`)
    //   .do(() => this.storeHelper.findAndDelete('orders', orderId));
  }

  addProduct(orderId) {
    return this.storeHelper.findAndAddProduct('orders', orderId, new Product());
    // return this.api.post(`${this.path}/${orderId}/add-order-item`)
    // .do(() => this.getOrders().subscribe());
  }

  deleteProduct(orderId, productId) {
    return this.storeHelper.findProductAndDelete('orders', orderId, productId);
    // return this.api.delete(`${this.path}/order-item/${productId}`)
    //   .do(() => this.storeHelper.findAndDelete('orders', productId));
  }

  getStore() {
    this.storeHelper.onGetState();
  }

  updateOrderInfo(orderId, fieldName, value) {

    let updated = this.storeHelper.findAndUpdate('orders', orderId, fieldName, value);
    if (updated) {

      if (parseInt(orderId, 10)) {
        fieldName = this.camelCaseToDash(fieldName);
        this.api.post(
          `${this.path}/${orderId}/update-${fieldName}`,
          `${fieldName}=${value}`
        ).subscribe();
      }

    }

  }

  updateProduct(orderId, productId, fieldName, value) {

    let updated = this.storeHelper.findProductAndUpdate('orders', orderId, productId, fieldName, value);
    if (updated) {

      if (parseInt(orderId, 10)) {
        fieldName = this.camelCaseToDash(fieldName);
        this.api.post(
          `${this.path}/${productId}/update-${fieldName}`,
          `${fieldName}=${value}`
        ).subscribe(
          data => {
            if (data) { this.storeHelper.findAndUpdate('orders', orderId, 'totalSum', data); }
          }
        );
      }

    }

  }




  private camelCaseToDash(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  }

}