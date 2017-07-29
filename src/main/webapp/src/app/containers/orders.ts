import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';

import { OrderService, PopupService } from '../services/index';
import { Store } from '../store';
import { Order, StaticDATA } from '../models';
import { slideToLeft, appear, changeWidth, fadeInOut } from '../ui/animations';


@Component({
  template: `           
    <div style="display: none;">
      <div class="get-orders" style="display: inline-block;" (click)="onGetAllOrders()">Get All Orders</div>
    
      <div class="consolestore" style="display: inline-block;" (click)="onGetStore()">Console current state</div>
      
      <div class="consoleorders"  style="display: inline-block;" (click)="console()">Console</div>
    </div>
      
    <div class="wrapper order-page">
    
      <div class="service-block">
        <div
          class="btn btn-orders-add"
          [@fadeInOut]="searchInputState"
          (click)="onAddOrder()"
        >Add New Order</div>
        
        <div class="search-input-container">  
          <input type="text" name="searchStream" id=""
            class="input search-input"
            placeholder="Search in orders..."
            [@changeWidth]="searchInputState"
            #searchControl
            [formControl]="searchStream"
            [(ngModel)]="searchQuery"
            (focusin)="toggleAnimState()"
            (focusout)="toggleAnimState()"
          >
        </div>
         
      </div>
      
      
      <pagination
        [total]="totalOrders"
        [length]="pageLength"
        [current]="page"
        (dataChanged)="paginationChanged($event)"
      >
      </pagination>
    
      <div
        class="order order--{{ order.status }}"
        [@appear]
        *ngFor="let order of orders$ | async; trackBy: trackById"
       >
      
        <div class="order-info">
        
          <div class="order-info__block order-info__block--id">
            {{ order.id }}
          </div>
          
          <ng-container 
            *ngFor="let key of order | keys:['id', 'customerId', 'orderItemDtos']"
          >
          
            <ng-template [ngIf]="!hasInput(key)">
              <div 
                class="order-info__block order-info__block--{{ key }}"
                contenteditable                
                [autocomplete]="['info', key]"
                [(contenteditableModel)]="order[key]"
                (selectedAutocomplete)="onAutocompleteInfo(order.id, $event)"
                (contentChanged)="onUpdateInfoField(order.id, key, $event)"
              ></div>
            </ng-template>
          
            <ng-template [ngIf]="hasInput(key)">
              <div class="order-info__block order-info__block--{{ key }}">
                <select
                  name="{{ key }}"
                  (change)="onUpdateInfoInput(order.id, key, $event.target.value)"
                >
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
       
       
       
        <div class="order-manage">
          <div title="Add product" class="order-manage__block order-manage__block--add" (click)="onAddProduct(order.id)">
            <i class="material-icons">add_box</i>
            <div class="order-manage__text">Add product</div>
          </div>
          <div title="Save customer" class="order-manage__block order-manage__block--save"
            *ngIf="order.customerId === 0"
            (click)="onPersistCustomer(order.id)"
          >
            <i class="material-icons">save</i>
            <div class="order-manage__text">Save customer</div>
          </div>
          <div title="Edit customer" class="order-manage__block order-manage__block--edit"
            *ngIf="order.customerId !== 0"
            (click)="onEditCustomer(order.customerId)"
          >
            <i class="material-icons">mode_edit</i>
            <div class="order-manage__text">Edit customer</div>
          </div>
          <div title="Delete order" class="order-manage__block order-manage__block--delete" (click)="onDeleteOrder(order.id)">
            <i class="material-icons">delete_forever</i>
            <div class="order-manage__text">Delete order</div>
          </div>
        </div>
        
        
        <div class="order-products">
          <div
            *ngFor="let product of order.orderItemDtos; let odd = odd, let even = even;"
            [ngClass]="{'order-product': true, odd: odd, even: even}"
          >
          
            <ng-container
              *ngFor="let key of product | keys:[
                'id', 'productId', 'productVariationId', 'categories', 'supplier'
              ];"
            >
            
              <ng-template [ngIf]="!hasInput(key)">
                <div
                  class="order-product__block order-product__block--{{ key }}"
                  contenteditable
                  #productBlock
                  [autocomplete]="['product', key]"
                  [(contenteditableModel)]="product[key]"
                  (selectedAutocomplete)="onAutocompleteProduct(order.id, product.id, $event)"
                  (contentChanged)="onUpdateProductField(order.id, product.id, key, $event)"
                ></div>  
              </ng-template>
          
              <ng-template [ngIf]="hasInput(key)">
                <div class="order-product__block order-product__block--{{ key }}">
                  <input
                    type="number"
                    value="{{ product[key] }}"
                    (blur)="onUpdateProductInput(order.id, product.id, key, $event.target.value)"
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
  animations: [slideToLeft(), appear(), changeWidth(), fadeInOut()]
})

export class Orders implements OnInit, OnDestroy {
  orders$: Observable<Order[]>;

  private searchStream: FormControl = new FormControl();
  searchQuery: string = '';
  searchInputState = 'collapsed';
  filteredOrders$: Observable<number>;

  totalOrders: number = 0;
  preloadedOrders: number = 0;
  page: number = 1;
  pageLength: number = 10;
  private pageStream = new Subject<{page: number, length: number, apiGet?: boolean}>();

  private subs: Subscription[] = [];

  infoBlocks = StaticDATA.infoBlocks;

  constructor(
    private orderService: OrderService,
    private store: Store,
    private popupService: PopupService,
    private viewRef: ViewContainerRef
  ) {}

  ngOnInit() {

    this.onGetOrders();

    let storeSource = this.store.changes
      .map(store => {
        this.preloadedOrders = store.order.length;
        return {search: this.searchQuery, page: this.page, length: this.pageLength}
      });

    let searchSource = this.searchStream
      .valueChanges
      .debounceTime(100)
      .distinctUntilChanged()
      .map(searchQuery => {
        return {search: searchQuery, page: this.page, length: this.pageLength}
      });

    let pageSource = this.pageStream
      .map(params => {
        this.page = params.page;
        this.pageLength = params.length;
        if (params.apiGet !== false) {
          this.onGetOrders();
        }

        return {search: this.searchQuery, page: params.page, length: params.length}
      });

    let source = storeSource
      .merge(searchSource, pageSource)
      .startWith({search: this.searchQuery, page: this.page, length: this.pageLength})
      .switchMap((params: {search: string, page: number, length: number}) => {
        return this.orderService.list(params.search, params.page, params.length)
      })
      .share();

    this.orders$ = source.pluck('orders');
    this.filteredOrders$ = source.pluck('filtered');

    this.popupService.viewContainerRef = this.viewRef;

  }



  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.orderService.purgeStore();
  }

  // Manage orders
  onGetOrders() {
    this.subs[this.subs.length] = this.orderService.getOrders(this.page - 1, this.pageLength).subscribe(resp => {
      this.totalOrders = resp.totalElements;
    });
  }

  onAddOrder() {
    this.orderService.addOrder();
    let apiGet = this.page === 1 ? false : true; // Tracing if it's needed to send http GET request for orders
    this.paginationChanged({page: 1, length: this.pageLength, apiGet});
  }

  onDeleteOrder(orderId) {
    if (confirm('Действительно удалить этот заказ?')) {
      this.orderService.deleteOrder(orderId);
    }
  }


  // Pagination
  paginationChanged({page, length, apiGet}) {
    this.pageStream.next({page, length, apiGet});
  }









  // Manage order info
  onUpdateInfoField(orderId, fieldName, value) {
    this.orderService.updateInfoField(orderId, fieldName, value);
  }

  onUpdateInfoInput(orderId, fieldName, value) {
    this.orderService.updateInfoInput(orderId, fieldName, value);
  }

  onAutocompleteInfo(orderId, data) {
    this.orderService.autocompleteInfo(orderId, data);
  }





  // Manage order products
  onAddProduct(orderId) {
    this.orderService.addProduct(orderId);
  }

  onUpdateProductField(orderId, productId, fieldName, value) {
    this.orderService.updateProductField(orderId, productId, fieldName, value);
  }

  onUpdateProductInput(orderId, productId, fieldName, value) {
    this.orderService.updateProductInput(orderId, productId, fieldName, value);
  }

  onAutocompleteProduct(orderId, productId, data) {
    this.orderService.autocompleteProduct(orderId, productId, data);
  }

  onDeleteProduct(id, productId) {
    if (confirm('Действительно удалить эту позицию?')) {
      this.orderService.deleteProduct(id, productId).subscribe();
    }
  }



  // Manage customers
  onEditCustomer(customerId) {
    this.popupService.renderPopup().subscribe(customer => {
      this.orderService.saveCustomer(customerId, customer).subscribe();
    });
    this.orderService.getCustomer(customerId).subscribe(customer => {
      this.popupService.onProvideWithData(customer);
    })
  }

  onPersistCustomer(orderId) {
    this.orderService.persistCustomer(orderId);
  }














// @TODO remove this
  onGetAllOrders() {
    this.orderService.getAllOrders().subscribe(resp => console.log(resp.data));
  }

  onGetStore() {
    this.orderService.getStore();
  }

  console() {
    console.log(this.searchStream);
  }




  hasInput(key) {
    return key === 'status' || key === 'paymentType' || key === 'quantity' ? true : false;
  }

  trackById(index: number, value) {
    return value.id;
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

  toggleAnimState() {
    this.searchInputState = this.searchInputState === 'collapsed' ? 'expanded' : 'collapsed';
  }


}
