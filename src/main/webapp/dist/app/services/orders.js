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
        this.productsPath = 'orderItemDtos';
    }
    OrderService.prototype.getOrders = function (start, length) {
        var _this = this;
        return this.api.get("/" + this.ordersPath + "?pageNumber=" + start + "&pageCapacity=" + length)
            .do(function (resp) { return _this.storeHelper.update('order', resp.elements); });
    };
    OrderService.prototype.addOrder = function () {
        var _this = this;
        var newOrder = new models_1.Order();
        var newOrderId = newOrder.id;
        this.storeHelper.add(this.ordersPath, newOrder);
        this.api.post(this.ordersPath).subscribe(function (orderId) {
            console.log(orderId);
            _this.storeHelper.findAndUpdate(_this.ordersPath, newOrderId, 'id', orderId);
        });
    };
    OrderService.prototype.deleteOrder = function (orderId) {
        this.storeHelper.findAndDelete(this.ordersPath, orderId);
        return this.api.apiDelete(this.ordersPath + "/" + orderId).subscribe();
    };
    OrderService.prototype.updateOrderInfoField = function (orderId, fieldName, value) {
        // Changing order info common field (e.g., firstName, phoneNumber)
        this.api.put(this.ordersPath + "/" + orderId + "/" + this.camelCaseToDash(fieldName), fieldName + "=" + value).subscribe();
    };
    OrderService.prototype.updateOrderInfoInput = function (orderId, fieldName, value) {
        // Changing order info INPUT (e.g., Status, Payment type)
        this.storeHelper.findAndUpdate(this.ordersPath, orderId, fieldName, value);
        this.api.put(this.ordersPath + "/" + orderId + "/" + this.camelCaseToDash(fieldName), fieldName + "=" + value).subscribe();
    };
    OrderService.prototype.updateOrderInfoWithObject = function (orderId, object) {
        this.storeHelper.findAndUpdateWithObject(this.ordersPath, orderId, object);
    };
    OrderService.prototype.addProduct = function (orderId) {
        var _this = this;
        var newProduct = new models_1.Product();
        var newProductId = newProduct.id;
        this.storeHelper.findDeepAndAdd(this.ordersPath, orderId, this.productsPath, newProduct);
        return this.api.post("order-item/create-empty-for/" + orderId)
            .subscribe(function (productId) {
            _this.storeHelper.findDeepAndUpdate(_this.ordersPath, orderId, _this.productsPath, newProductId, 'id', productId);
        });
    };
    OrderService.prototype.updateProductField = function (orderId, productId, fieldName, value) {
        // Changing order item common field (e.g., name, price)
        var _this = this;
        this.api.post(this.ordersPath + "/" + productId + "/" + this.camelCaseToDash(fieldName), fieldName + "=" + value).subscribe(function (data) {
            if (data) {
                _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, 'totalSum', data);
            }
        });
    };
    OrderService.prototype.updateProductInput = function (orderId, productId, fieldName, value) {
        var _this = this;
        // Changing order item INPUT (quantity)
        this.storeHelper.findDeepAndUpdate(this.ordersPath, orderId, this.productsPath, productId, fieldName, value);
        this.api.post(this.ordersPath + "/" + productId + "/" + this.camelCaseToDash(fieldName), fieldName + "=" + value).subscribe(function (data) {
            if (data) {
                _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, 'totalSum', data);
            }
        });
    };
    OrderService.prototype.updateProductWithObject = function (orderId, productId, object) {
        this.storeHelper.findDeepAndUpdateWithObject(this.ordersPath, orderId, this.productsPath, productId, object);
    };
    OrderService.prototype.deleteProduct = function (orderId, productId) {
        return this.storeHelper.findDeepAndDelete(this.ordersPath, orderId, this.productsPath, productId);
        // return this.api.delete(`${this.ordersPath}/order-item/${productId}`)
        //   .do(() => this.storeHelper.findAndDelete(this.ordersPath, productId));
    };
    OrderService.prototype.getCustomer = function (customerId) {
        return this.api.get("customer/" + customerId);
    };
    OrderService.prototype.saveCustomer = function (customerId, customerInfo) {
        // customerInfo = Object.keys(customerInfo).map(key => {
        //   return `${encodeURIComponent(key)}=${encodeURIComponent(customerInfo[key])}`
        // }).join('&');
        // @TODO get rid of this ^
        return this.api.put("customer/" + customerId, customerInfo);
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
            return this.api.get("order-item/autocomplete-by-product-name/" + term);
        }
    };
    OrderService.prototype.statuses = function () {
        return this.api.get('/order/autocomplete-status');
    };
    OrderService.prototype.camelCaseToDash = function (str) {
        return str.replace(/([A-Z])/g, function (g) { return "-" + g[0].toLowerCase(); });
    };
    OrderService.prototype.getStore = function () {
        this.storeHelper.onGetState();
    };
    OrderService.prototype.getAllOrders = function () {
        return this.api.get(this.ordersPath + "?start=0&length=10000");
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
