import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';

import { OrderService } from '../services/orders';
import { PopupService } from '../services/popup';
import { NotyService } from '../services/noty';
import { Store } from '../store';
import { Order, STATIC_DATA, IOrderFilter, IPageStream } from '../models';
import { slideToLeft, appear, changeWidth } from '../ui/animations';


@Component({
  templateUrl : '../../../assets/templates/containers/orders.html',
  animations  : [slideToLeft(), appear(), changeWidth()],
  host        : {'[@slideToLeft]': ''},
  providers   : [PopupService]
})

export class Orders implements OnInit, OnDestroy {
  private orders$          : Observable<Order[]>;

  private searchStream     : FormControl = new FormControl();
  private searchQuery      : string = '';
  private searchInputState : string = 'collapsed';
  private filteredOrders$  : Observable<number>;

  private totalOrders      : number = 0;
  private preloadedOrders  : number = 0;
  private page             : number = 1;
  private pageLength       : number = 10;
  private pageStream       : Subject<IPageStream> = new Subject();

  private subs: Subscription[] = [];

  private infoBlocks = STATIC_DATA.infoBlocks;

  private showFilters: boolean = false;
  private filterLoads: boolean = false;


  constructor(
    private store: Store,
    private orderService: OrderService,
    private popupService: PopupService,
    private notyService: NotyService,
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
      .switchMap(({search, page, length}) => {
        return this.orderService.list(search, page, length)
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
    this.subs[this.subs.length] = this.orderService
      .getOrders(this.page - 1, this.pageLength)
      .subscribe(resp => this.totalOrders = resp.totalElements);
  }

  onAddOrder() {
    this.orderService.addOrder().subscribe(
      ({orderId, orderItemId}) => this.notyService.renderNoty(`Order № ${orderId} has been added`),
      error => this.notyService.renderNoty(error, true)
    );

    let apiGet = this.page !== 1; // Tracing if it's needed to send http GET request for orders
    this.paginationChanged({page: 1, length: this.pageLength, apiGet});
  }

  onDeleteOrder(orderId) {
    if (confirm('Действительно удалить этот заказ?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => this.notyService.renderNoty(`Order № ${orderId} has been deleted`),
        error => this.notyService.renderNoty(error, true)
      );
    }
  }


  // Pagination
  paginationChanged({page, length, apiGet}) {
    this.pageStream.next({page, length, apiGet});
  }


  // Manage filter
  private onFilterSubmit(filters: IOrderFilter) {
    this.filterLoads = true;
    this.orderService.filterOrders(this.page, this.pageLength, filters)
      .subscribe(
        response => this.totalOrders = response.totalElements,
        null,
        () => this.filterLoads = false
      );
  }




  // Manage order info
  onUpdateInfoField(orderId, fieldName, {newValue, oldValue}) {
    this.orderService.updateInfoField(orderId, fieldName, newValue)
      .subscribe(
        () => this.notyService.renderNoty(`${oldValue} has been changed to ${newValue}`),
        error => this.notyService.renderNoty(error, true)
      );
  }

  onUpdateInfoInput(orderId, fieldName, value) {
    this.orderService.updateInfoInput(orderId, fieldName, value)
      .subscribe(
        () => this.notyService.renderNoty(`${fieldName} has been changed to ${value}`),
        error => this.notyService.renderNoty(error, true)
      );
  }

  onAutocompleteInfo(orderId, data) {
    this.orderService.autocompleteInfo(orderId, data).subscribe(
      () => this.notyService.renderNoty(`${data.label} has been added`),
      error => this.notyService.renderNoty(error, true)
    );
  }





  // Manage order products
  onAddProduct(orderId) {
    this.orderService.addProduct(orderId).subscribe(
      () => this.notyService.renderNoty(`Product for order ${orderId} has been added`),
      error => this.notyService.renderNoty(error, true)
    );
  }

  onUpdateProductField(orderId, productId, fieldName, {newValue, oldValue}) {
    this.orderService.updateProductField(orderId, productId, fieldName, newValue)
      .subscribe(
        () => this.notyService.renderNoty(`${oldValue} has been changed to ${newValue}`),
        error => this.notyService.renderNoty(error, true)
      );
  }

  onUpdateProductInput(orderId, productId, fieldName, value) {
    this.orderService.updateProductInput(orderId, productId, fieldName, value)
      .subscribe(
        () => this.notyService.renderNoty(`${fieldName} has been changed to ${value}`),
        error => this.notyService.renderNoty(error, true)
      );
  }

  onAutocompleteProduct(orderId, productId, data) {
    this.orderService.autocompleteProduct(orderId, productId, data).subscribe(
      () => this.notyService.renderNoty(`${data.label} has been added`),
      error => this.notyService.renderNoty(error, true)
    );
  }

  onDeleteProduct(id, productId) {
    if (confirm('Действительно удалить эту позицию?')) {
      this.orderService.deleteProduct(id, productId).subscribe(
        () => this.notyService.renderNoty(`Product ${productId} has been deleted`),
        error => this.notyService.renderNoty(error, true)
      );
    }
  }



  // Manage customers
  onEditCustomer(customerId) {
    this.popupService.renderPopup('Update customer').subscribe(customer => {
      this.orderService.saveCustomer(customerId, customer).subscribe(
        () => this.notyService.renderNoty(`Customer ${customerId} has been edited`),
        error => this.notyService.renderNoty(error, true)
      );
    });
    this.orderService.getCustomer(customerId).subscribe(customer => {
      this.popupService.onProvideWithFormData(customer);
    })
  }

  onPersistCustomer(orderId) {
    this.orderService.persistCustomer(orderId).subscribe(
      () => this.notyService.renderNoty(`Customer for order ${orderId} has been saved`),
      error => this.notyService.renderNoty(error, true)
    );
  }



  // General functions
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


}
