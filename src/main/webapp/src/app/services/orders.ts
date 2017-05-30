import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';
import { Order, OrderItem } from '../models';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';


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

  deleteOrder(orderId): Observable<any> {
    return this.api.delete(`${this.path}/${orderId}`)
      .do(() => this.storeHelper.findAndDelete('orders', orderId));
  }

  addOrderItem(orderId) {
    return this.storeHelper.findAndAddProduct('orders', orderId, new OrderItem());
    // return this.api.post(`${this.path}/${orderId}/add-order-item`)
      // .do(() => this.getOrders().subscribe());
  }

  deleteOrderItem(id, itemId) {
    return this.storeHelper.findProductAndDelete('orders', id, itemId);
    // return this.api.delete(`${this.path}/order-item/${itemId}`)
    //   .do(() => this.storeHelper.findAndDelete('orders', itemId));
  }

  getStore() {
    this.storeHelper.onGetState();
  }

  updateField(orderId, fieldName, value) {

    let updated = this.storeHelper.findDeepAndUpdate('orders', orderId, fieldName, value);
    if (updated) {
      fieldName = this.camelCaseToDash(fieldName);
      return this.api.post(
        `${this.path}/${orderId}/update-${fieldName}`,
        `${fieldName}=${value}`
        ).subscribe();
    }

  }


  private camelCaseToDash(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  }

}
