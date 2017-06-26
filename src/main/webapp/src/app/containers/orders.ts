import { Component, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';

import { OrderService } from '../services/index';
import { Store } from '../store';
import { Order, StaticDATA } from '../models';


@Component({
  template: `
    <div class="wrapper">
    
      <input type="text" name="searchStream" id=""
        #searchControl
        [formControl]="searchStream"
        [(ngModel)]="searchQuery"
      >
    
      <div class="add-order" style="display: inline-block;" (click)="onAddOrder()">Add New Order</div>
    
      <div class="get-orders" style="display: inline-block;" (click)="onGetAllOrders()">Get All Orders</div>
    
      <div class="consoleorders"  style="display: inline-block;" (click)="consoleOrders()">Console all orders</div>
      
      <div class="consolestore" style="display: inline-block;" (click)="onGetStore()">Console current state</div>
      
      <div class="total">Total orders: {{ totalOrders }}</div>
      <div class="preloaded">Preloaded orders: {{ preloadedOrders }}</div>
      <div class="filtered">Filtered orders: {{ filteredOrders$ | async }}</div>
      
      
      <ul class="pagination">
        <li (click)="pageClicked(prevPage())">Prev</li>
        <li (click)="pageClicked(1)">1</li>
        <li (click)="pageClicked(2)">2</li>
        <li (click)="pageClicked(3)">3</li>
        <li (click)="pageClicked(4)">4</li>
        <li (click)="pageClicked(nextPage())">Next</li>
      </ul>
    
      <div
        *ngFor="let order of orders$ | async; trackBy: trackById"
        class="order order--{{ order.status }}"
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
              <div 
                class="order-info__block order-info__block--{{ key }}"
                contenteditable                
                #infoBlock
                hotkeys
                [autocomplete]="['info', key]"
                [(contenteditableModel)]="order[key]"
                (selectedAutocomplete)="onSelectAutocompleteInfo(order.id, $event)"
                (addProduct)="onAddProduct(order.id)"
                (blur)="onUpdateOrderInfo(order.id, key, $event.target.innerText)"
                (moveFocus)="onMoveFocus(infoBlock, true)"
              ></div>
            </ng-template>
          
            <ng-template [ngIf]="hasInput(key)">
              <div class="order-info__block order-info__block--{{ key }}">
                <select name="{{ key }}" (change)="onUpdateOrderInfo(order.id, key, $event.target.value)">
                  <option
                   *ngFor="let value of infoBlocks[key]"
                   [value]="value"
                   [attr.selected]="value === order[key] ? '' : null"
                  >
                    {{ value }}
                  </option>
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
                <div
                  class="order-product__block order-product__block--{{ key }}"
                  contenteditable
                  #productBlock
                  hotkeys
                  [autocomplete]="['info', key]"
                  [(contenteditableModel)]="product[key]"
                  (moveFocus)="onMoveFocus(productBlock)"                  
                  (addProduct)="onAddProduct(order.id)"
                  (blur)="onUpdateProduct(order.id, product.id, key, $event.target.innerText)"
                ></div>  
              </ng-template>
          
              <ng-template [ngIf]="hasInput(key)">
                <div class="order-product__block order-product__block--{{ key }}">
                  <input
                    type="number"
                    value="{{ product[key] }}"
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

export class Orders implements OnInit, OnDestroy {
  orders$: Observable<Order[]>;

  @ViewChild('searchControl') searchControl: ElementRef;
  private searchStream: FormControl = new FormControl();
  searchQuery: string = '';
  filteredOrders$: Observable<number>;

  totalOrders: number = 0;
  preloadedOrders: number = 0;
  page: number = 1;
  pageLength: number = 10;
  private pageStream = new Subject<number>();

  infoBlocks = StaticDATA.infoBlocks;


  constructor(
    private orderService: OrderService,
    private store: Store
  ) {}

  ngOnInit() {

    this.orderService.getOrders(0, this.pageLength).subscribe(resp => {
      this.totalOrders = resp.recordsTotal;
      this.orderService.preloadOrders(0, this.pageLength, 19).subscribe();
    });

    let storeSource = this.store.changes
      .map(store => {
        this.preloadedOrders = store.orders.length;
        return {search: this.searchQuery, page: this.page}
      });

    let searchSource = this.searchStream
      .valueChanges
      .debounceTime(100)
      .distinctUntilChanged()
      .map(searchQuery => {
        return {search: searchQuery, page: 1}
      });

    let pageSource = this.pageStream
      .map(pageNumber => {
        this.page = pageNumber;
        return {search: this.searchQuery, page: pageNumber}
      });

    let source = pageSource
      .merge(searchSource, storeSource)
      .startWith({search: this.searchQuery, page: this.page})
      .switchMap((params: {search: string, page: number}) => {
        return this.orderService.list(params.search, params.page)
      })
      .share();

    this.orders$ = source.pluck('orders');
    this.filteredOrders$ = source.pluck('filtered');

  }



  ngOnDestroy() {

  }

  pageClicked(page: number) {
    this.pageStream.next(page);
  }










  // Manage orders
  onAddOrder() {
    this.orderService.addOrder();
  }

  onSaveOrders() {

  }

  onDeleteOrder(orderId) {
    if (confirm('Действительно удалить этот заказ?')) {
      this.orderService.deleteOrder(orderId);
    }
  }



  // Manage order info
  onUpdateOrderInfo(orderId, fieldName, value) {
    this.orderService.updateOrderInfo(orderId, fieldName, value);
  }

  onSelectAutocompleteInfo(orderId, data) {
    this.orderService.updateOrderInfoWithObject(orderId, data);
  }



  // Manage products
  onAddProduct(orderId) {
    this.orderService.addProduct(orderId);
  }

  onUpdateProduct(orderId, productId, fieldName, value) {
    this.orderService.updateProduct(orderId, productId, fieldName, value);
  }

  onDeleteProduct(id, productId) {
    if (confirm('Действительно удалить эту позицию?')) {
      this.orderService.deleteProduct(id, productId);
    }
  }


















  onGetAllOrders() {
    this.orderService.getAllOrders().subscribe(resp => console.log(resp.data));
  }

  onGetStore() {
    this.orderService.getStore();
  }

  consoleOrders() {
    console.log(this.orders$);
  }
  consoleMe(me) {
    console.log(me);
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

  onDocKeydown(e) {
    if (e.ctrlKey) {

      switch (e.code) {
        case 'KeyS':
          this.onSaveOrders();
          return false;
        case 'KeyB':
          this.onAddOrder();
          return false;
        case 'KeyF':
          this.searchControl.nativeElement.focus();
          return false;
      }

    }
  }


}





// @TODO
// change order of json keys in backend
