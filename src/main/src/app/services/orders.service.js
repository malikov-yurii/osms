var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { ApiService } from './api.service';
import { StoreHelper } from './store-helper.service';
import { SearchService } from './search.service';
import { Order, Product, STATIC_DATA } from '../models/index';
var OrderService = /** @class */ (function () {
    function OrderService(api, storeHelper, searchService) {
        this.api = api;
        this.storeHelper = storeHelper;
        this.searchService = searchService;
        this.ordersPath = STATIC_DATA.ordersPath;
        this.productsPath = STATIC_DATA.orderItemsPath;
        this.totalSumField = 'totalSum';
    }
    OrderService.prototype.purgeStore = function () {
        this.storeHelper.update(this.ordersPath, []);
    };
    // Manage orders
    OrderService.prototype.getOrders = function (start, length) {
        var _this = this;
        return this.api.get("/" + this.ordersPath + "?pageNumber=" + start + "&pageCapacity=" + length)
            .do(function (resp) {
            _this.storeHelper.update('order', resp.elements);
        });
    };
    OrderService.prototype.addOrder = function () {
        var _this = this;
        var newOrder = new Order();
        var newOrderId = newOrder.id;
        var newOrderItemId = newOrder[this.productsPath][0].id;
        this.storeHelper.add(this.ordersPath, newOrder);
        return this.api.post(this.ordersPath)
            .do(function (response) {
            _this.storeHelper.findAndUpdate(_this.ordersPath, newOrderId, 'id', response.orderId);
            _this.storeHelper.findDeepAndUpdate(_this.ordersPath, response.orderId, _this.productsPath, newOrderItemId, 'id', response.orderItemId);
        });
    };
    OrderService.prototype.deleteOrder = function (orderId) {
        this.storeHelper.findAndDelete(this.ordersPath, orderId);
        return this.api.apiDelete(this.ordersPath + "/" + orderId);
    };
    OrderService.prototype.filterOrders = function (page, pageLength, filters) {
        var _this = this;
        var payload = {};
        for (var key in filters) {
            if (filters[key] && filters.hasOwnProperty(key)) {
                if (key.toLowerCase().indexOf('date') !== -1) {
                    payload[key] = filters[key] + "T00:00:00";
                }
                else {
                    payload[key] = filters[key];
                }
            }
        }
        payload['paging'] = {
            page: page - 1,
            size: pageLength
        };
        return this.api.put("/" + this.ordersPath + "/filter", payload)
            .do(function (response) {
            _this.storeHelper.update('order', response.elements);
        });
    };
    // Manage order info
    // Changing order info common field (e.g., firstName, phoneNumber)
    OrderService.prototype.updateInfoField = function (orderId, fieldName, value) {
        return this.api.put(this.ordersPath + "/" + orderId, (_a = {},
            _a[fieldName] = value.replace(/^\s+|\s+$/g, ''),
            _a));
        var _a;
    };
    // Changing order info INPUT (e.g., Status, Payment type)
    OrderService.prototype.updateInfoInput = function (orderId, fieldName, value) {
        this.storeHelper.findAndUpdate(this.ordersPath, orderId, fieldName, value);
        return this.api.put(this.ordersPath + "/" + orderId, (_a = {},
            _a[fieldName] = value,
            _a));
        var _a;
    };
    OrderService.prototype.autocompleteInfo = function (orderId, object) {
        this.storeHelper.findAndUpdateWithObject(this.ordersPath, orderId, object);
        return this.api.put(this.ordersPath + "/" + orderId, {
            customerId: object.customerId
        });
    };
    // Manage products
    OrderService.prototype.addProduct = function (orderId) {
        var _this = this;
        var newProduct = new Product();
        var newProductId = newProduct.id;
        this.storeHelper.findDeepAndAdd(this.ordersPath, orderId, this.productsPath, newProduct);
        return this.api.post("order-item/create-empty-for/" + orderId)
            .do(function (productId) { return _this.storeHelper.findDeepAndUpdate(_this.ordersPath, orderId, _this.productsPath, newProductId, 'id', productId); });
    };
    // Changing order item editable field (e.g., name, price)
    OrderService.prototype.updateProductField = function (orderId, productId, fieldName, value) {
        var _this = this;
        return this.api.put("order-item/" + productId, (_a = {},
            _a[fieldName] = value.replace(/^\s+|\s+$/g, ''),
            _a)).do(function (data) {
            if (data && typeof data === 'number') {
                _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, _this.totalSumField, data);
            }
        });
        var _a;
    };
    // Changing order item INPUT (quantity)
    OrderService.prototype.updateProductInput = function (orderId, productId, fieldName, value) {
        var _this = this;
        this.storeHelper.findDeepAndUpdate(this.ordersPath, orderId, this.productsPath, productId, fieldName, value);
        return this.api.put("order-item/" + productId, (_a = {},
            _a[fieldName] = value,
            _a))
            .do(function (data) {
            if (data && typeof data === 'number') {
                _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, _this.totalSumField, data);
            }
        });
        var _a;
    };
    OrderService.prototype.autocompleteProduct = function (orderId, productId, data) {
        var _this = this;
        data['quantity'] = 1;
        this.storeHelper.findDeepAndUpdateWithObject(this.ordersPath, orderId, this.productsPath, productId, data);
        var productIdName = data.productVariationId ? 'productVariationId' : 'productId';
        return this.api.put("order-item/" + productId, (_a = {},
            _a[productIdName] = data[productIdName],
            _a)).do(function (data) {
            if (data && typeof data === 'number') {
                _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, _this.totalSumField, data);
            }
        });
        var _a;
    };
    OrderService.prototype.deleteProduct = function (orderId, productId) {
        this.storeHelper.findDeepAndDelete(this.ordersPath, orderId, this.productsPath, productId);
        return this.api.apiDelete("order-item/" + productId);
    };
    // Manage CustomersComponent
    OrderService.prototype.getCustomer = function (customerId) {
        return this.api.get("customer/" + customerId);
    };
    OrderService.prototype.saveCustomer = function (customerId, customerInfo) {
        return this.api.put("customer/" + customerId, customerInfo);
    };
    OrderService.prototype.persistCustomer = function (orderId) {
        var _this = this;
        return this.api.post("customer/persist-customer-from-order/" + orderId)
            .do(function (customerId) {
            _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, 'customerId', customerId);
        });
    };
    OrderService.prototype.list = function (searchQuery, page, length) {
        if (searchQuery === void 0) { searchQuery = ''; }
        if (page === void 0) { page = 1; }
        if (length === void 0) { length = 10; }
        var orderResult = this.searchService.search(this.storeHelper.get(this.ordersPath), searchQuery);
        var orderResultPage = orderResult.slice(0, length);
        return Observable.of({
            orders: orderResultPage,
            filtered: orderResult.length
        });
    };
    OrderService.prototype.requestAutocomplete = function (types, term) {
        if (types[1] === 'customerLastName' || types[1] === 'customerFirstName') {
            return this.api.get("customer/autocomplete-by-last-name-mask/" + term);
        }
        else if (types[1] === 'customerPhoneNumber') {
            return this.api.get("customer/autocomplete-by-phone-number-mask/" + term);
        }
        else if (types[1] === 'destinationCity') {
            return this.api.get("customer/autocomplete-by-city-mask/" + term);
        }
        else if (types[0] === 'product') {
            return this.api.get("order-item/autocomplete-by-product-name/" + term);
        }
    };
    OrderService.prototype.camelCaseToDash = function (str) {
        return str.replace(/([A-Z])/g, function (g) { return "-" + g[0].toLowerCase(); });
    };
    // @TODO remove this
    OrderService.prototype.getStore = function () {
        this.storeHelper.onGetState();
    };
    OrderService.prototype.getAllOrders = function () {
        return this.api.get(this.ordersPath + "?start=0&length=10000");
    };
    OrderService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ApiService,
            StoreHelper,
            SearchService])
    ], OrderService);
    return OrderService;
}());
export { OrderService };
