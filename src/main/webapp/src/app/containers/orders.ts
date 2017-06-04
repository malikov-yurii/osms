import { Component, OnDestroy } from '@angular/core';
import { OrderService } from '../services/index';
import { Store } from '../store';
import { Order, Product } from '../models';
import { Subscription } from "rxjs/Rx";


@Component({
  template: `
    <div class="wrapper">
    
    <input type="text" name="" id="" [(ngModel)]="searchQuery">
    
      <div class="add-order" style="display: inline-block;" (click)="onAddOrder()">Add New Order</div>
    
      <div class="get-orders" style="display: inline-block;" (click)="onGetAllOrders()">Get All Orders</div>
    
      <div class="consoleorders"  style="display: inline-block;" (click)="consoleOrders()">Console all orders</div>
      
      <div class="consolestore" style="display: inline-block;" (click)="onGetStore()">Console current state</div>
    
    
    
    
    
    
    
    
    
    
    
      <div
        *ngFor="let order of orders | search: searchQuery"
        [ngClass]="getOrderColor(order.status)"
       >
       
        <div class="order-manage">
          <div title="Add product" class="order-manage__block order-manage__block--add" (click)="onAddProduct(order.id)">
            <i class="material-icons">add_box</i>
            <div class="order-manage__text">Add product</div>
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
            *ngFor="let key of order | keys:['id', 'customerId', 'orderItemTos', 'date']"
          >
          
            <ng-template [ngIf]="!hasInput(key)">
              <div class="order-info__block order-info__block--{{ key }}"
              contenteditable
              withHotkeys
              #infoBlock
              (addProduct)="onAddProduct(order.id)"
              (blur)="onUpdateOrderInfo(order.id, key, $event.target.innerText)"
              (moveFocus)="onMoveFocus(infoBlock, true)"
            >
                {{ order[key] }}
              </div>
            </ng-template>
          
            <ng-template [ngIf]="hasInput(key)">
              <div class="order-info__block order-info__block--{{ key }}">
                <select name="{{ key }}" (change)="onUpdateOrderInfo(order.id, key, $event.target.value)">
                  <option
                   *ngFor="let value of infoBlocks[key]"
                   [value]="value"
                   [attr.selected]="value === order[key] ? '' : null"
                  >{{ value }}</option>
                </select>
              </div>  
            </ng-template>
          
          </ng-container>
        </div>
        
        
        <div class="order-products">
          <div
            *ngFor="let product of order.orderItemTos; let odd = odd, let even = even;"
            [ngClass]="{'order-product': true, odd: odd, even: even}"
          >
          
            <ng-container
              *ngFor="let key of product | keys:['id', 'orderProductId', 'supplier'];"
            >
            
              <ng-template [ngIf]="!hasInput(key)">
                <div class="order-product__block order-product__block--{{ key }}"
                  contenteditable
                  withHotkeys
                  #productBlock
                  (moveFocus)="onMoveFocus(productBlock)"                  
                  (addProduct)="onAddProduct(order.id)"
                  (blur)="onUpdateProduct(order.id, product.id, key, $event.target.innerText)"
                >
                  {{ product[key] }}
                </div>  
              </ng-template>
          
              <ng-template [ngIf]="hasInput(key)">
                <div class="order-product__block order-product__block--{{ key }}">
                  <input type="number" value="{{ product[key] }}"
                     (blur)="onUpdateProduct(order.id, product.id, key, $event.target.value)"
                  >
                </div>  
              </ng-template>
                
            </ng-container>

            <div class="order-product__block order-product__block--delete" (click)="onDeleteProduct(order.id, product.id)">
              <i class="material-icons">delete</i>            
            </div>
            
          </div>
        </div>
        
      </div>    
    </div>
  `,
  host: {
    '(document:keydown)': 'onDocKeydown($event)'
  }
})

export class Orders implements OnDestroy {
  orders: Order[] = [];
  subscription: Subscription;
  infoBlocks = {
    status: ['SHP', 'WFP', 'OK', 'NEW', 'NOT'],
    paymentType: ['PB', 'SV', 'NP']
  };
  searchQuery: any = '';


  constructor(
    private orderService: OrderService,
    private store: Store
  ) {
    this.orderService.getOrders().subscribe();

    // @NOT NEEDED ??
    this.subscription = this.store.changes
      .map(resp => resp.orders)
      .subscribe(resp => this.orders = resp);


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddOrder() {
    this.orderService.addOrder();
  }

  onDeleteOrder(orderId) {
    if (confirm('Действительно удалить этот заказ?')) {
      this.orderService.deleteOrder(orderId);
    }
  }

  onGetAllOrders() {
    this.orderService.getAllOrders().subscribe(resp => console.log(resp.data));
  }

  onAddProduct(orderId) {
    this.orderService.addProduct(orderId);
  }

  onDeleteProduct(id, productId) {
    if (confirm('Действительно удалить эту позицию?')) {
      this.orderService.deleteProduct(id, productId);
    }
  }

  onGetStore() {
    this.orderService.getStore();
  }

  onUpdateOrderInfo(orderId, fieldName, value) {
    this.orderService.updateOrderInfo(orderId, fieldName, value);
  }

  onUpdateProduct(orderId, productId, fieldName, value) {
    this.orderService.updateProduct(orderId, productId, fieldName, value);
  }

  onSaveOrders() {

  }





  onMoveFocus(el, fromInfoBlock) {
    let parentNextSibling = el.parentNode.nextElementSibling;
    if (parentNextSibling) {
      if (fromInfoBlock) {
        el.parentNode.nextElementSibling.children[0].children[0].focus();
      } else {
        let index = Array.from(el.parentNode.children).indexOf(el);
        parentNextSibling.children[index].focus();
      }
    }

  }


  consoleOrders() {
    console.log(this.orders);
  }








  hasInput(key) {
    return key === 'status' || key === 'paymentType' || key === 'quantity' ? true : false;
  }

  trackById(index: number, value) {
    return value.id;
  }

  getOrderColor(orderStatus) {
    let status = `order--${orderStatus.toLowerCase()}`;
    return {
      'order': true,
      [status]: true
    };
  }

  onDocKeydown(e) {
    if (e.ctrlKey && e.code === 'KeyS') {
      this.onSaveOrders();
      return false;
    } else if (e.ctrlKey && e.code === 'KeyB') {
      this.onAddOrder();
      return false;
    }
  }


}





// @TODO
// change order of json keys in backend
