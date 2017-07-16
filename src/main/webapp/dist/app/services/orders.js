"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/delay");
require("rxjs/add/observable/of");
var api_1 = require("./api");
var store_helper_1 = require("./store-helper");
var search_1 = require("./search");
var models_1 = require("../models");
var OrderService = (function () {
    function OrderService(api, storeHelper, searchService) {
        this.api = api;
        this.storeHelper = storeHelper;
        this.searchService = searchService;
        this.ordersPath = 'order';
        this.productsPath = 'orderItemTos';
    }
    OrderService.prototype.getOrders = function (start, length) {
        var _this = this;
        return this.api.get("/" + this.ordersPath + "?pageNumber=" + start + "&pageCapacity=" + length)
            .do(function (resp) { return _this.storeHelper.update('order', resp.elements); });
    };
    // preloadOrders(start: number, length: number): Observable<any> {
    //   return this.api.get(`${this.ordersPath}?start=${start}&length=${length}`)
    //     .do(resp => this.storeHelper.addArrayLast(this.ordersPath, resp.data));
    // }
    OrderService.prototype.getAllOrders = function () {
        return this.api.get(this.ordersPath + "?start=0&length=10000");
    };
    OrderService.prototype.getCustomer = function (customerId) {
        return this.api.get("customer/" + customerId);
    };
    // saveCustomer(customerId, objCustomerInfo): Observable<any> {
    //   let customerInfo = Object.keys(objCustomerInfo).map(key => {
    //     return `${encodeURIComponent(key)}=${encodeURIComponent(objCustomerInfo[key])}`
    //   }).join('&');
    //   // @TODO get rid of this ^
    //
    //   // return this.api.postRest(`customers/${customerId}`, customerInfo);
    // }
    OrderService.prototype.addOrder = function () {
        var newOrder = new models_1.Order();
        var newOrderId = newOrder.id;
        this.storeHelper.add(this.ordersPath, newOrder);
    };
    OrderService.prototype.deleteOrder = function (orderId) {
        return this.storeHelper.findAndDelete(this.ordersPath, orderId);
        // return this.api.delete(`${this.ordersPath}/${orderId}`)
        //   .do(() => this.storeHelper.findAndDelete(this.ordersPath, orderId));
    };
    OrderService.prototype.addProduct = function (orderId) {
        return this.storeHelper.findDeepAndAdd(this.ordersPath, orderId, this.productsPath, new models_1.Product());
        // return this.api.post(`${this.ordersPath}/${orderId}/add-order-item`)
        // .do(() => this.getOrders().subscribe());
    };
    OrderService.prototype.deleteProduct = function (orderId, productId) {
        return this.storeHelper.findDeepAndDelete(this.ordersPath, orderId, this.productsPath, productId);
        // return this.api.delete(`${this.ordersPath}/order-item/${productId}`)
        //   .do(() => this.storeHelper.findAndDelete(this.ordersPath, productId));
    };
    OrderService.prototype.getStore = function () {
        this.storeHelper.onGetState();
    };
    OrderService.prototype.updateOrderInfo = function (orderId, fieldName, value, flag) {
        if (flag) {
            // If we are changing order info INPUT (e.g., Status, Payment type)
            var updated = this.storeHelper.findAndUpdate(this.ordersPath, orderId, fieldName, value);
            if (updated) {
                // If input has been changed
                if (parseInt(orderId, 10)) {
                    // fieldName = this.camelCaseToDash(fieldName);
                    this.api.put(this.ordersPath + "/" + orderId + "/" + this.camelCaseToDash(fieldName), fieldName + "=" + value).subscribe();
                }
            }
        }
        else if (parseInt(orderId, 10)) {
            // fieldName = this.camelCaseToDash(fieldName);
            this.api.put(this.ordersPath + "/" + orderId + "/" + this.camelCaseToDash(fieldName), fieldName + "=" + value).subscribe();
        }
    };
    OrderService.prototype.updateOrderInfoInput = function (orderId, fieldName, value) {
        var updated = this.storeHelper.findAndUpdate(this.ordersPath, orderId, fieldName, value);
        if (updated) {
            if (parseInt(orderId, 10)) {
                fieldName = this.camelCaseToDash(fieldName);
                this.api.post(this.ordersPath + "/" + orderId + "/update-" + fieldName, fieldName + "=" + value).subscribe();
            }
        }
    };
    OrderService.prototype.updateOrderInfoWithObject = function (orderId, object) {
        var updated = this.storeHelper.findAndUpdateWithObject(this.ordersPath, orderId, object);
    };
    OrderService.prototype.updateProduct = function (orderId, productId, fieldName, value) {
        var _this = this;
        var updated = this.storeHelper.findDeepAndUpdate(this.ordersPath, orderId, this.productsPath, productId, fieldName, value);
        if (updated) {
            if (parseInt(orderId, 10)) {
                // fieldName = this.camelCaseToDash(fieldName);
                this.api.post(this.ordersPath + "/" + productId + "/" + this.camelCaseToDash(fieldName), fieldName + "=" + value).subscribe(function (data) {
                    if (data) {
                        _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, 'totalSum', data);
                    }
                });
            }
        }
    };
    OrderService.prototype.updateProductWithObject = function (orderId, productId, object) {
        var updated = this.storeHelper.findDeepAndUpdateWithObject(this.ordersPath, orderId, this.productsPath, productId, object);
    };
    OrderService.prototype.list = function (searchQuery, page, length) {
        if (searchQuery === void 0) { searchQuery = ''; }
        if (page === void 0) { page = 1; }
        if (length === void 0) { length = 10; }
        var orderResult = this.searchService.search(this.storeHelper.get(this.ordersPath), searchQuery);
        var orderResultPage = orderResult.slice((page - 1) * length, page * length);
        return Observable_1.Observable.of({
            orders: orderResultPage,
            filtered: orderResult.length
        });
    };
    OrderService.prototype.autocomplete = function (type, term) {
        if (type === 'info') {
            return this.api.get("customer/autocomplete-by-last-name-mask/" + term);
        }
        else if (type === 'product') {
            return this.api.post(this.ordersPath + "/autocomplete-order-item-name", "term=" + term);
        }
    };
    OrderService.prototype.statuses = function () {
        return this.api.get('/order/autocomplete-status');
    };
    OrderService.prototype.camelCaseToDash = function (str) {
        return str.replace(/([A-Z])/g, function (g) { return "-" + g[0].toLowerCase(); });
    };
    return OrderService;
}());
OrderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_1.ApiService,
        store_helper_1.StoreHelper,
        search_1.SearchService])
], OrderService);
exports.OrderService = OrderService;
