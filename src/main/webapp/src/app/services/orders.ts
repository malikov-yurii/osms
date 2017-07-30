import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
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

  purgeStore() {
    this.storeHelper.update(this.ordersPath, []);
  }

  getOrders(start: number, length: number): Observable<any> {
    return this.api.get(`/${this.ordersPath}?pageNumber=${start}&pageCapacity=${length}`)
      .do(resp => {
        this.storeHelper.update('order', resp.elements)
      });
  }

  addOrder() {
    let newOrder = new Order();
    let newOrderId = newOrder.id;
    let newOrderItemId = newOrder[this.productsPath][0].id;
    this.storeHelper.add(this.ordersPath, newOrder);
    return this.api.post(this.ordersPath)
      .do(resp => {
        this.storeHelper.findAndUpdate(this.ordersPath, newOrderId, 'id', resp.orderId);
        this.storeHelper.findDeepAndUpdate(
          this.ordersPath, resp.orderId, this.productsPath,
          newOrderItemId, 'id', resp.orderItemId
        );
      })
  }

  deleteOrder(orderId) {
    this.storeHelper.findAndDelete(this.ordersPath, orderId);
    return this.api.apiDelete(`${this.ordersPath}/${orderId}`);
  }







  updateInfoField(orderId, fieldName, value) {
    // Changing order info common field (e.g., firstName, phoneNumber)

    return this.api.put(
      `${this.ordersPath}/${orderId}/${this.camelCaseToDash(fieldName)}`,
      `${fieldName}=${value}`
    );
  }

  updateInfoInput(orderId, fieldName, value) {
    // Changing order info INPUT (e.g., Status, Payment type)

    this.storeHelper.findAndUpdate(this.ordersPath, orderId, fieldName, value);

    return this.api.put(
      `${this.ordersPath}/${orderId}/${this.camelCaseToDash(fieldName)}`,
      `${fieldName}=${value}`
    );
  }

  autocompleteInfo(orderId, object) {
    this.storeHelper.findAndUpdateWithObject(this.ordersPath, orderId, object);
    this.api.put(
      `${this.ordersPath}/${orderId}/set-customer`,
      `customerId=${object.customerId}`
    ).subscribe();
  }



  addProduct(orderId) {
    let newProduct = new Product();
    let newProductId = newProduct.id;

    this.storeHelper.findDeepAndAdd(this.ordersPath, orderId, this.productsPath, newProduct);

    this.api.post(`order-item/create-empty-for/${orderId}`)
      .subscribe(productId => {
        this.storeHelper.findDeepAndUpdate(
          this.ordersPath, orderId, this.productsPath,
          newProductId, 'id', productId
        );
      });
  }

  updateProductField(orderId, productId, fieldName, value) {
    // Changing order item editable field (e.g., name, price)

    return this.api.put(
      `order-item/${productId}/${this.camelCaseToDash(fieldName)}`,
      `${fieldName}=${value}`
    ).do(
      data => {
        if (data) { this.storeHelper.findAndUpdate(this.ordersPath, orderId, 'totalSum', data); }
      }
    );

  }

  updateProductInput(orderId, productId, fieldName, value) {
    // Changing order item INPUT (quantity)

    this.storeHelper.findDeepAndUpdate(
      this.ordersPath, orderId, this.productsPath,
      productId, fieldName, value
    );

    this.api.put(
      `order-item/${productId}/${this.camelCaseToDash(fieldName)}`,
      `${fieldName}=${value}`
    ).subscribe(
      data => {
        if (data) { this.storeHelper.findAndUpdate(this.ordersPath, orderId, 'totalSum', data); }
      }
    );
  }

  autocompleteProduct(orderId, productId, data) {
    data['quantity'] = 1;
    this.storeHelper.findDeepAndUpdateWithObject(this.ordersPath, orderId, this.productsPath, productId, data);

    if (data.productVariationId) {
      this.api.put(
        `order-item/${productId}`,
        `productVariationId=${data.productVariationId}`
      ).subscribe();
    } else {
      this.api.put(
        `order-item/${productId}`,
        `productId=${data.productId}`
      ).subscribe();
    }
  }

  deleteProduct(orderId, productId): Observable<any> {
    this.storeHelper.findDeepAndDelete(this.ordersPath, orderId, this.productsPath, productId);
    return this.api.apiDelete(`order-item/${productId}`);
  }



  getCustomer(customerId): Observable<any> {
    return this.api.get(`customer/${customerId}`);
  }
  saveCustomer(customerId, customerInfo): Observable<any> {
    return this.api.put(`customer/${customerId}`, customerInfo, true);
  }
  persistCustomer(orderId) {
    this.api.post(`customer/persist-customer-from-order/${orderId}`)
      .subscribe(customerId => {
        this.storeHelper.findAndUpdate(this.ordersPath, orderId, 'customerId', customerId);
      });
  }


  list(searchQuery: string = '', page: number = 1, length: number = 10) {
    let orderResult = this.searchService.search(this.storeHelper.get(this.ordersPath), searchQuery);

    let orderResultPage = orderResult.slice(0, length);

    return Observable.of({
      orders: orderResultPage,
      filtered: orderResult.length
    });
  }

  autocomplete(types: string[], term: string) {
    if (types[1] === 'lastName' || types[1] === 'firstName') {
      return this.api.get(`customer/autocomplete-by-last-name-mask/${term}`);

    } else if (types[1] === 'phoneNumber') {
      return this.api.get(`customer/autocomplete-by-phone-number-mask/${term}`);

    } else if (types[1] === 'city') {
      return this.api.get(`customer/autocomplete-by-city-mask/${term}`);

    } else if (types[0] === 'product') {
      return this.api.get(`order-item/autocomplete-by-product-name/${term}`);

    }
  }

  private camelCaseToDash(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  }



  // @TODO remove this
  getStore() {
    this.storeHelper.onGetState();
  }

  getAllOrders(): Observable<any> {
    return this.api.get(`${this.ordersPath}?start=0&length=10000`);
  }
}
