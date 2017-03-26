import { Injectable } from '@angular/core';
import { ApiService } from './api';

@Injectable()
export class OrderService {
  path: string = 'orders?start=10&length=10';

  constructor(private api: ApiService) {}

  getOrders() {
    return this.api.get(this.path);
  }

  createOrder(order) {
    return this.api.post(this.path, order);
  }

  deleteOrder(order) {
    return this.api.delete(`${this.path}${order.id}`);
  }


};