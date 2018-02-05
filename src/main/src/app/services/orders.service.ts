import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { ApiService } from './api.service';
import { StoreHelper } from './store-helper.service';
import { SearchService } from './search.service';
import { Order, Product, STATIC_DATA } from '../models/index';

declare const dbOrders;

@Injectable()
export class OrderService {
  ordersPath   : string = STATIC_DATA.ordersPath;
  productsPath : string = STATIC_DATA.orderItemsPath;
  totalSumField: string = 'totalValue';

  constructor(
    private api: ApiService,
    private storeHelper: StoreHelper,
    private searchService: SearchService
  ) {}

  purgeStore() {
    this.storeHelper.update(this.ordersPath, []);
  }


  // Manage orders
  getOrders(start: number, length: number): Observable<any> {
    if (dbOrders.content.length) {
      this.storeHelper.update('order', dbOrders.content);
      dbOrders.content = [];
      return Observable.of(dbOrders);

    } else {
      return this.api.get(`/${this.ordersPath}?pageNumber=${start}&pageCapacity=${length}`)
        .do(resp => {
          this.storeHelper.update('order', resp.content);
        });
    }
  }

  addOrder(): Observable<any> {
    let newOrder = new Order();
    let newOrderId = newOrder.orderId;
    let newOrderItemId = newOrder[this.productsPath][0].orderLineId;
    this.storeHelper.add(this.ordersPath, newOrder);

    return this.api.post(this.ordersPath)
      .do(response => {
        this.storeHelper.findAndUpdate(this.ordersPath, newOrderId, 'orderId', response.orderId);
        this.storeHelper.findDeepAndUpdate(
          this.ordersPath, response.orderId, this.productsPath,
          newOrderItemId, 'orderLineId', response.orderLines[0].orderLineId
        );
      });
  }

  deleteOrder(orderId): Observable<any> {
    this.storeHelper.findAndDelete(this.ordersPath, orderId);
    return this.api.apiDelete(`${this.ordersPath}/${orderId}`);
  }

  printOrder(orderId: any) {
    return this.api.get(`print-order/${orderId}`);
  }

  filterOrders(page, pageLength, filters): Observable<any> {
    let payload = {} as any;

    Object.keys(filters)
      .filter(key => filters[key])
      .forEach(key => {
        if (key.toLowerCase().includes('fromdate')) {
          payload[key] = `${filters[key]}T00:00:00`;
        } else if (key.toLowerCase().includes('todate')) {
          payload[key] = `${filters[key]}T23:59:00`;
        } else {
          payload[key] = filters[key];
        }
      });

    if (payload.productVariationId || payload.productId) {
      delete payload.productNameMask;
    }

    payload.paging = {
      page: page - 1,
      size: pageLength
    };

    return this.api.put(`/${this.ordersPath}/filter`, payload)
      .do(response => {
        this.storeHelper.update('order', response.content);
      });
  }






  // Manage order info

  // Changing order info common field (e.g., firstName, phoneNumber)
  updateInfoField(orderId, fieldName, value) {
    return this.api.put(`${this.ordersPath}/${orderId}`, {
        [fieldName]: value.replace(/^\s+|\s+$/g, '')
      });
  }

  // Changing order info INPUT (e.g., Status, Payment type)
  updateInfoInput(orderId, fieldName, value) {
    this.storeHelper.findAndUpdate(this.ordersPath, orderId, fieldName, value);

    return this.api.put(`${this.ordersPath}/${orderId}`, {
      [fieldName]: value
    });
  }

  autocompleteInfo(orderId, data): Observable<any> {
    const info = {
      customerId: data.customerId,
      customerFirstName: data.customerFirstName,
      customerLastName: data.customerLastName,
      customerPhoneNumber: data.customerPhoneNumber,
      destinationCity: data.customerCityName,
      destinationPostOffice: data.customerPostOffice
    };

    this.storeHelper.findAndUpdateWithObject(this.ordersPath, orderId, info);
    return this.api.put(`${this.ordersPath}/${orderId}`, {
      customerId: data.customerId
    });
  }



  // Manage products
  addProduct(orderId): Observable<any> {
    let newProduct = new Product();
    let newProductId = newProduct.orderLineId;

    this.storeHelper.findDeepAndAdd(this.ordersPath, orderId, this.productsPath, newProduct);

    return this.api.post(`order-line/create-empty-for-order/${orderId}`)
      .do(({ orderLineId }) => this.storeHelper.findDeepAndUpdate(
          this.ordersPath, orderId, this.productsPath,
          newProductId, 'orderLineId', orderLineId)
      );
  }

  // Changing order item editable field (e.g., name, price)
  updateProductField(orderId, productId, fieldName, value): Observable<any> {

    return this.api.put(`order-line/${productId}`, { [fieldName]: value.replace(/^\s+|\s+$/g, '') })
      .do(() => {
        this.api.get(`order/${orderId}`).subscribe((order: Order) => {
          if (order) {
            this.storeHelper.findAndUpdate(this.ordersPath, orderId, this.totalSumField, order.totalValue);
          }
        });
      });

  }

  // Changing order item INPUT (quantity)
  updateProductInput(orderId, productId, fieldName, value): Observable<any> {
    this.storeHelper.findDeepAndUpdate(
      this.ordersPath, orderId, this.productsPath,
      productId, fieldName, value
    );

    return this.api.put(`order-line/${productId}`, {
      [fieldName]: value
    })
      .do(() => {
        this.api.get(`order/${orderId}`).subscribe((order: Order) => {
          if (order) {
            this.storeHelper.findAndUpdate(this.ordersPath, orderId, this.totalSumField, order.totalValue);
          }
        });
      });
  }

  autocompleteProduct(orderId, orderLineId, data): Observable<any> {
    const product = {
      productId: data.productId,
      productVariationId: data.productVariationId,
      orderLineProductName: data.productName,
      orderLineProductPrice: data.productPrice,
      orderLineProductQuantity: 1
    };

    this.storeHelper.findDeepAndUpdateWithObject(this.ordersPath, orderId, this.productsPath, orderLineId, product);

    let productIdName = data.productVariationId ? 'productVariationId' : 'productId';

    return this.api.put(`order-line/${orderLineId}`, {
      [productIdName]: data[productIdName]
    }).do(() => {
      this.api.get(`order/${orderId}`).subscribe((order: Order) => {
        if (order) {
          this.storeHelper.findAndUpdate(this.ordersPath, orderId, this.totalSumField, order.totalValue);
        }
      });
    });
  }

  deleteProduct(orderId, productId): Observable<any> {
    this.storeHelper.findDeepAndDelete(this.ordersPath, orderId, this.productsPath, productId);
    return this.api.apiDelete(`order-line/${productId}`);
  }




  // Manage CustomersComponent
  getCustomer(customerId): Observable<any> {
    return this.api.get(`customer/${customerId}`);
  }
  saveCustomer(customerId, customerInfo): Observable<any> {
    return this.api.put(`customer/${customerId}`, customerInfo);
  }
  persistCustomer(orderId): Observable<any> {
    return this.api.post(`customer/from-order-data/${orderId}`)
      .do(customer => {
        this.storeHelper.findAndUpdate(this.ordersPath, orderId, 'customerId', customer.customerId);
      });
  }

  list(page: number = 1, length: number = 10) {
    let orderResult = this.storeHelper.get(this.ordersPath);

    let orderResultPage = orderResult.slice(0, length);

    return Observable.of({
      orders: orderResultPage,
      filtered: orderResult.length
    });
  }

  requestAutocomplete(types: string[], query: string) {
    let url = '';
    if (types[1] === 'customerLastName' || types[1] === 'customerFirstName') {
      url = `customer/autocomplete-by-last-name-mask`;

    } else if (types[1] === 'customerPhoneNumber') {
      url = `customer/autocomplete-by-phone-number-mask`;

    } else if (types[1] === 'destinationCity') {
      url = `customer/autocomplete-by-city-mask`;

    } else if (types[0] === 'product') {
      url = `order-line/autocomplete-by-product-name-mask`;

    }

    return this.api.get(`${url}/${query}`);
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
