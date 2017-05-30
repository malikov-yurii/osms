import { Component, OnDestroy } from '@angular/core';
import { OrderService } from '../services/index';
import { Store } from '../store';
import { Order, OrderItem } from '../models';
import { Subscription } from "rxjs/Rx";


@Component({
  template: `
    <div class="wrapper">
    
      <div class="add-order" style="display: inline-block;" (click)="onAddOrder()">Add New Order</div>
    
      <div class="get-orders" style="display: inline-block;" (click)="onGetAllOrders()">Get All Orders</div>
    
      <div class="consoleorders"  style="display: inline-block;" (click)="consoleOrders()">Console all orders</div>
      
      <div class="consolestore" style="display: inline-block;" (click)="onGetStore()">Console current state</div>
    
    
      <div
        *ngFor="let order of orders; let i = index; trackBy: trackByIndex"
        [ngClass]="getOrderColor(order.status)"
       >
       
        <div class="order-manage">
          <div title="Add order item" class="order-manage__block order-manage__block--add" (click)="onAddOrderItem(order.id)">
            <i class="material-icons">add_box</i>
            <div class="order-manage__text">Add order item</div>
          </div>
          <div title="Edit customer" class="order-manage__block order-manage__block--edit" (click)="onEditCustomer(order.customerId)">
            <i class="material-icons">mode_edit</i>
            <div class="order-manage__text">Edit customer</div>
          </div>
          <div title="Delete order" class="order-manage__block order-manage__block--delete" (click)="onDeleteOrder(order.id)">
            <i class="material-icons">delete_forever</i>
            <div class="order-manage__text">Delete order</div>
          </div>
        </div>
      
        <div class="order-info">
          <ng-container 
            *ngFor="let key of order | keys:['id', 'customerId', 'orderItemTos', 'date'];"
          >
          
            <ng-template [ngIf]="!hasInput(key)">
              <div class="order-info__block order-info__block--{{ key }}" contenteditable (input)="orders[i][key]" ngDefaultControl>
                {{ order[key] }}
              </div>
            </ng-template>
          
            <ng-template [ngIf]="hasInput(key)">
              <div class="order-info__block order-info__block--{{ key }}">
                <select name="{{ key }}" (change)="onSelect($event.target)">
                  <option
                   *ngFor="let keyItem of infoBlocks[key]"
                   [value]="keyItem"
                   [attr.selected]="keyItem === order[key] ? '' : null"
                  >{{ keyItem }}</option>
                </select>
              </div>  
            </ng-template>
          
          </ng-container>
        </div>
        <div class="order-items">
          <div
            *ngFor="let item of order.orderItemTos; let odd = odd, let even = even"
            [ngClass]="{'order-item': true, odd: odd, even: even}"
          >
            <div
              *ngFor="let key of item | keys:['orderItemId', 'orderProductId', 'supplier'] "

              class="order-item__block order-item__block--{{ key }}"
              contenteditable
            >
              {{ item[key] }}
            </div>
            <div class="order-item__block order-item__block--delete" (click)="onDeleteOrderItem(order.id, item.orderItemId)">
              <i class="material-icons">delete</i>            
            </div>
          </div>
        </div>
        
      </div>    
    </div>
  `
})

export class Orders implements OnDestroy {
  orders: Order[] = [];
  subscription: Subscription;
  infoBlocks = {
    status: ['SHP', 'WFP', 'OK', 'NEW', 'NOT'],
    paymentType: ['PB', 'SV', 'NP']
  };


  constructor(
    private orderService: OrderService,
    private store: Store
  ) {
    this.orderService.getOrders().subscribe();

    this.subscription = this.store.changes
      .map(resp => resp.orders)
      .subscribe(resp => this.orders = resp)
  }

  ngOnDestroy() {
    console.log('destroyed');
    this.subscription.unsubscribe();
  }

  onAddOrder() {
    this.orderService.addOrder();
  }

  onDeleteOrder(orderId) {
    if (confirm('Действительно удалить этот заказ?')) {
      this.orderService.deleteOrder(orderId).subscribe();
    }
  }

  onGetAllOrders() {
    this.orderService.getAllOrders().subscribe(resp => console.log(resp.data));
  }

  getOrderColor(orderStatus) {
    let status = `order--${orderStatus.toLowerCase()}`;
    return {
      'order': true,
      [status]: true
    };
  }

  onAddOrderItem(orderId) {
    this.orderService.addOrderItem(orderId);
  }

  onDeleteOrderItem(id, orderItemId) {
    if (confirm('Действительно удалить эту позицию?')) {
      this.orderService.deleteOrderItem(id, orderItemId);
    }
  }

  onGetStore() {
    this.orderService.getStore();
  }

  hasInput(key) {
    return key === 'status' || key === 'paymentType' ? true : false;
  }

  trackByIndex(index: number, value) {
    return index;
  }

  onSelect(target) {
    console.log(typeof target.name);
    console.log(target.value);
  }

  onChange(target) {
    console.log(target);
    console.log(target.name);
    console.log(target.value);
  }

  consoleOrders() {
    console.log(this.orders);
  }

}





// @TODO IF POSSIBLE
// rename orderItemId to id
