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

  addOrderItem(orderId): Observable<any> {
    return this.api.post(`${this.path}/${orderId}/add-order-item`)
      .do(() => this.getOrders().subscribe());
  }

  deleteOrderItem(itemId): Observable<any> {
    return this.api.delete(`${this.path}/order-item/${itemId}`)
      .do(() => this.storeHelper.findAndDelete('orders', itemId));
  }

  getStore() {
    this.storeHelper.onGetState();
  }
}
