import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import { ApiService} from './api';
import { StoreHelper } from './store-helper';
import { SearchService } from './search';
import { Order, Product } from '../models';


@Injectable()
export class OrderService {
  ordersPath: string = 'order';
  productsPath: string = 'orderItemDtos';

  constructor(
    private api: ApiService,
    private storeHelper: StoreHelper,
    private searchService: SearchService
  ) {}

  getOrders(start: number, length: number): Observable<any> {
    return this.api.get(`/${this.ordersPath}?pageNumber=${start}&pageCapacity=${length}`)
      .do(resp => this.storeHelper.update('order', resp.elements));
  }

  addOrder() {
    let newOrder = new Order();
    let newOrderId = newOrder.id;
    this.storeHelper.add(this.ordersPath, newOrder);
    this.api.post(this.ordersPath).subscribe(orderId => {
      console.log(orderId);
      this.storeHelper.findAndUpdate(this.ordersPath, newOrderId, 'id', orderId);
    })
  }

  deleteOrder(orderId) {
    this.storeHelper.findAndDelete(this.ordersPath, orderId);
    return this.api.apiDelete(`${this.ordersPath}/${orderId}`).subscribe();
  }

  updateOrderInfoField(orderId, fieldName, value) {
    // Changing order info common field (e.g., firstName, phoneNumber)

    this.api.put(
      `${this.ordersPath}/${orderId}/${this.camelCaseToDash(fieldName)}`,
      `${fieldName}=${value}`
    ).subscribe();
  }

  updateOrderInfoInput(orderId, fieldName, value) {
    // Changing order info INPUT (e.g., Status, Payment type)

    this.storeHelper.findAndUpdate(this.ordersPath, orderId, fieldName, value);

    this.api.put(
      `${this.ordersPath}/${orderId}/${this.camelCaseToDash(fieldName)}`,
      `${fieldName}=${value}`
    ).subscribe();
  }

  updateOrderInfoWithObject(orderId, object) {
    this.storeHelper.findAndUpdateWithObject(this.ordersPath, orderId, object);
  }



  addProduct(orderId) {
    let newProduct = new Product();
    let newProductId = newProduct.id;
    this.storeHelper.findDeepAndAdd(this.ordersPath, orderId, this.productsPath, newProduct);
    return this.api.post(`order-item/create-empty-for/${orderId}`)
      .subscribe(productId => {
        this.storeHelper.findDeepAndUpdate(this.ordersPath, orderId, this.productsPath, newProductId, 'id', productId);
      });
  }

  updateProductField(orderId, productId, fieldName, value) {
    // Changing order item common field (e.g., name, price)

    this.api.post(
      `${this.ordersPath}/${productId}/${this.camelCaseToDash(fieldName)}`,
      `${fieldName}=${value}`
    ).subscribe(
      data => {
        if (data) { this.storeHelper.findAndUpdate(this.ordersPath, orderId, 'totalSum', data); }
      }
    );

  }

  updateProductInput(orderId, productId, fieldName, value) {
    // Changing order item INPUT (quantity)
    this.storeHelper.findDeepAndUpdate(this.ordersPath, orderId, this.productsPath, productId, fieldName, value);

    this.api.post(
      `${this.ordersPath}/${productId}/${this.camelCaseToDash(fieldName)}`,
      `${fieldName}=${value}`
    ).subscribe(
      data => {
        if (data) { this.storeHelper.findAndUpdate(this.ordersPath, orderId, 'totalSum', data); }
      }
    );
  }

  updateProductWithObject(orderId, productId, object) {
    this.storeHelper.findDeepAndUpdateWithObject(this.ordersPath, orderId, this.productsPath, productId, object);
  }

  deleteProduct(orderId, productId) {
    return this.storeHelper.findDeepAndDelete(this.ordersPath, orderId, this.productsPath, productId);
    // return this.api.delete(`${this.ordersPath}/order-item/${productId}`)
    //   .do(() => this.storeHelper.findAndDelete(this.ordersPath, productId));
  }



  getCustomer(customerId): Observable<any> {
    return this.api.get(`customer/${customerId}`);
  }
  saveCustomer(customerId, customerInfo): Observable<any> {
    // customerInfo = Object.keys(customerInfo).map(key => {
    //   return `${encodeURIComponent(key)}=${encodeURIComponent(customerInfo[key])}`
    // }).join('&');
    // @TODO get rid of this ^

    return this.api.put(`customer/${customerId}`, customerInfo);
  }


  list(searchQuery: string = '', page: number = 1, length: number = 10) {
    let orderResult = this.searchService.search(this.storeHelper.get(this.ordersPath), searchQuery);

    let orderResultPage = orderResult.slice((page - 1) * length, page * length);

    return Observable.of({
      orders: orderResultPage,
      filtered: orderResult.length
    });
  }

  autocomplete(type: string, term: string) {
    if (type === 'info') {
      return this.api.get(
        `customer/autocomplete-by-last-name-mask/${term}`
      )
    } else if (type === 'product') {
      return this.api.get(
        `order-item/autocomplete-by-product-name/${term}`
      )
    }
  }

  statuses() {
    return this.api.get('/order/autocomplete-status');
  }


  private camelCaseToDash(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  }


  getStore() {
    this.storeHelper.onGetState();
  }

  getAllOrders(): Observable<any> {
    return this.api.get(`${this.ordersPath}?start=0&length=10000`);
  }
}
