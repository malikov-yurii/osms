import { Component } from '@angular/core';
import { OrderService } from '../services/index';

@Component({
  selector: 'main-container',
  template: `
    <div>
        <main class="class">get a dollar ixix</main>
    
        <order-block
        [order]="order"
        *ngFor="let order of orders"
        >
       
       
        </order-block>
    
    </div>
  `
})

export class Orders{
  orders = [];

  constructor(private orderService: OrderService) {
    this.orderService.getOrders()
      .subscribe(resp => this.orders = resp.data);
  }



}