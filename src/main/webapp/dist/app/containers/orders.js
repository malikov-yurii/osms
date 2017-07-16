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
var forms_1 = require("@angular/forms");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/merge");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/share");
require("rxjs/add/operator/pluck");
require("rxjs/add/operator/filter");
var index_1 = require("../services/index");
var store_1 = require("../store");
var models_1 = require("../models");
var Orders = (function () {
    function Orders(orderService, store, popupService, viewRef) {
        this.orderService = orderService;
        this.store = store;
        this.popupService = popupService;
        this.viewRef = viewRef;
        this.searchStream = new forms_1.FormControl();
        this.searchQuery = '';
        this.totalOrders = 0;
        this.preloadedOrders = 0;
        this.page = 1;
        this.pageLength = 10;
        this.pageStream = new Subject_1.Subject();
        this.subs = [];
        this.infoBlocks = models_1.StaticDATA.infoBlocks;
    }
    Orders.prototype.ngOnInit = function () {
        var _this = this;
        this.subs[this.subs.length] = this.orderService.getOrders(0, this.pageLength).subscribe(function (resp) {
            console.log(resp);
            _this.totalOrders = resp.totalElements;
            // this.subs[this.subs.length] = this.orderService.preloadOrders(this.pageLength, this.pageLength * 9).subscribe(
            //   () => this.subs[this.subs.length] = this.orderService.preloadOrders(this.pageLength + this.pageLength * 9, this.pageLength * 500).subscribe()
            // );
        });
        var storeSource = this.store.changes
            .map(function (store) {
            _this.preloadedOrders = store.order.length;
            return { search: _this.searchQuery, page: _this.page, length: _this.pageLength };
        });
        var searchSource = this.searchStream
            .valueChanges
            .debounceTime(100)
            .distinctUntilChanged()
            .map(function (searchQuery) {
            _this.page = 1;
            return { search: searchQuery, page: _this.page, length: _this.pageLength };
        });
        var pageSource = this.pageStream
            .map(function (params) {
            _this.page = params.page;
            _this.pageLength = params.length;
            return { search: _this.searchQuery, page: params.page, length: params.length };
        });
        var source = storeSource
            .merge(searchSource, pageSource)
            .startWith({ search: this.searchQuery, page: this.page, length: this.pageLength })
            .switchMap(function (params) {
            return _this.orderService.list(params.search, params.page, params.length);
        })
            .share();
        this.orders$ = source.pluck('orders');
        this.filteredOrders$ = source.pluck('filtered');
        this.popupService.viewContainerRef = this.viewRef;
    };
    Orders.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /* Pagination */
    Orders.prototype.paginationChanged = function (_a) {
        var page = _a.page, length = _a.length;
        this.pageStream.next({ page: page, length: length });
        this.page = page;
        this.pageLength = length;
    };
    // Add and Delete orders
    Orders.prototype.onAddOrder = function () {
        this.orderService.addOrder();
        this.paginationChanged({ page: 1, length: this.pageLength });
    };
    Orders.prototype.onDeleteOrder = function (orderId) {
        if (confirm('Действительно удалить этот заказ?')) {
            this.orderService.deleteOrder(orderId);
        }
    };
    // Manage order info
    Orders.prototype.onUpdateOrderInfoField = function (orderId, fieldName, value, flag) {
        this.orderService.updateOrderInfo(orderId, fieldName, value, flag);
    };
    Orders.prototype.onAutocompleteInfo = function (orderId, data) {
        this.orderService.updateOrderInfoWithObject(orderId, data);
    };
    // Manage order products
    Orders.prototype.onAddProduct = function (orderId) {
        this.orderService.addProduct(orderId);
    };
    Orders.prototype.onUpdateProductField = function (orderId, productId, fieldName, value) {
        this.orderService.updateProduct(orderId, productId, fieldName, value);
    };
    Orders.prototype.onAutocompleteProduct = function (orderId, productId, data) {
        this.orderService.updateProductWithObject(orderId, productId, data);
    };
    Orders.prototype.onDeleteProduct = function (id, productId) {
        if (confirm('Действительно удалить эту позицию?')) {
            this.orderService.deleteProduct(id, productId);
        }
    };
    // Manage customers
    Orders.prototype.onEditCustomer = function (customerId) {
        var _this = this;
        this.popupService.renderPopup().subscribe(function (customer) {
            // this.orderService.saveCustomer(customerId, customer).subscribe();
        });
        this.orderService.getCustomer(customerId).subscribe(function (customer) {
            _this.popupService.onProvideWithData(customer);
        });
    };
    Orders.prototype.onGetAllOrders = function () {
        this.orderService.getAllOrders().subscribe(function (resp) { return console.log(resp.data); });
    };
    Orders.prototype.onGetStore = function () {
        this.orderService.getStore();
    };
    Orders.prototype.consoleOrders = function () {
        console.log(this.orders$);
    };
    Orders.prototype.consoleMe = function (me) {
        console.log(me);
    };
    Orders.prototype.hasInput = function (key) {
        return key === 'status' || key === 'paymentType' || key === 'quantity' ? true : false;
    };
    Orders.prototype.trackById = function (index, value) {
        return value.id;
    };
    Orders.prototype.onMoveFocus = function (el, fromInfoBlock) {
        var parentNextSibling = el.parentNode.nextElementSibling;
        if (parentNextSibling) {
            if (fromInfoBlock) {
                el.parentNode.nextElementSibling.children[0].children[0].focus();
            }
            else {
                var index = Array.from(el.parentNode.children).indexOf(el);
                parentNextSibling.children[index].focus();
            }
        }
    };
    Orders.prototype.statuses = function () {
        this.orderService.statuses().subscribe(function (resp) { return console.log(resp); });
    };
    return Orders;
}());
__decorate([
    core_1.ViewChild('searchControl'),
    __metadata("design:type", core_1.ElementRef)
], Orders.prototype, "searchControl", void 0);
Orders = __decorate([
    core_1.Component({
        template: "\n    <div class=\"wrapper\">\n    <div (click)=\"statuses()\">statuses</div>\n      <div class=\"service-block\">\n        <div\n          class=\"btn btn-orders-add\"\n          (click)=\"onAddOrder()\"\n        >Add New Order</div>\n        \n        <div class=\"orders-info\">\n          <div class=\"orders-info__block orders-info__block--total\">Total orders: {{ totalOrders }}</div>\n          <div class=\"orders-info__block orders-info__block--preloaded\">Preloaded orders: {{ preloadedOrders }}</div>\n        </div>\n  \n        <input type=\"text\" name=\"searchStream\" id=\"\"\n          class=\"input orders-search\"\n          placeholder=\"Search in orders...\"\n          #searchControl\n          [formControl]=\"searchStream\"\n          [(ngModel)]=\"searchQuery\"\n        >\n         \n      </div>\n      \n      \n      <div style=\"display: none;\">\n        <div class=\"get-orders\" style=\"display: inline-block;\" (click)=\"onGetAllOrders()\">Get All Orders</div>\n      \n        <div class=\"consoleorders\"  style=\"display: inline-block;\" (click)=\"consoleOrders()\">Console all orders</div>\n        \n        <div class=\"consolestore\" style=\"display: inline-block;\" (click)=\"onGetStore()\">Console current state</div>\n      </div>\n      \n      \n      <pagination\n        [total]=\"filteredOrders$ | async\"\n        [length]=\"pageLength\"\n        [current]=\"page\"\n        (dataChanged)=\"paginationChanged($event)\"\n      >\n      </pagination>\n    \n      <div\n        *ngFor=\"let order of orders$ | async; trackBy: trackById\"\n        class=\"order order--{{ order.status }}\"\n       >\n      \n        <div class=\"order-info\">\n        \n          <div class=\"order-info__block order-info__block--id\">\n            {{ order.id }}\n          </div>\n          \n          <ng-container \n            *ngFor=\"let key of order | keys:['id', 'customerId', 'orderItemDtos', 'date']\"\n          >\n          \n            <ng-template [ngIf]=\"!hasInput(key)\">\n              <div \n                class=\"order-info__block order-info__block--{{ key }}\"\n                contenteditable                \n                #infoBlock\n                hotkeys\n                [autocomplete]=\"['info', key]\"\n                [(contenteditableModel)]=\"order[key]\"\n                (selectedAutocomplete)=\"onAutocompleteInfo(order.id, $event)\"\n                (addProduct)=\"onAddProduct(order.id)\"\n                (moveFocus)=\"onMoveFocus(infoBlock, true)\"\n                (contentChanged)=\"onUpdateOrderInfoField(order.id, key, $event, false)\"\n              ></div>\n            </ng-template>\n          \n            <ng-template [ngIf]=\"hasInput(key)\">\n              <div class=\"order-info__block order-info__block--{{ key }}\">\n                <select\n                  name=\"{{ key }}\"\n                  (change)=\"onUpdateOrderInfoField(order.id, key, $event.target.value, true)\"\n                >\n                  <option\n                   *ngFor=\"let value of infoBlocks[key]\"\n                   [value]=\"value\"\n                   [attr.selected]=\"value === order[key] ? '' : null\"\n                  >\n                    {{ value }}\n                  </option>\n                </select>\n              </div>  \n            </ng-template>\n          \n          </ng-container>\n        </div>\n       \n       \n       \n        <div class=\"order-manage\">\n          <div title=\"Add product\" class=\"order-manage__block order-manage__block--add\" (click)=\"onAddProduct(order.id)\">\n            <i class=\"material-icons\">add_box</i>\n            <div class=\"order-manage__text\">Add product</div>\n          </div>\n          <div title=\"Edit customer\" class=\"order-manage__block order-manage__block--edit\" (click)=\"onEditCustomer(order.customerId)\">\n            <i class=\"material-icons\">mode_edit</i>\n            <div class=\"order-manage__text\">Edit customer</div>\n          </div>\n          <div title=\"Delete order\" class=\"order-manage__block order-manage__block--delete\" (click)=\"onDeleteOrder(order.id)\">\n            <i class=\"material-icons\">delete_forever</i>\n            <div class=\"order-manage__text\">Delete order</div>\n          </div>\n        </div>\n        \n        \n        <div class=\"order-products\">\n          <div\n            *ngFor=\"let product of order.orderItemDtos; let odd = odd, let even = even;\"\n            [ngClass]=\"{'order-product': true, odd: odd, even: even}\"\n          >\n          \n            <ng-container\n              *ngFor=\"let key of product | keys:['orderItemId', 'orderProductId', 'supplier'];\"\n            >\n            \n              <ng-template [ngIf]=\"!hasInput(key)\">\n                <div\n                  class=\"order-product__block order-product__block--{{ key }}\"\n                  contenteditable\n                  #productBlock\n                  hotkeys\n                  [autocomplete]=\"['product', key]\"\n                  [(contenteditableModel)]=\"product[key]\"\n                  (selectedAutocomplete)=\"onAutocompleteProduct(order.id, product.id, $event)\"\n                  (moveFocus)=\"onMoveFocus(productBlock)\"                  \n                  (addProduct)=\"onAddProduct(order.id)\"\n                  (contentChanged)=\"onUpdateProductField(order.id, product.id, key, $event, false)\"\n                ></div>  \n              </ng-template>\n          \n              <ng-template [ngIf]=\"hasInput(key)\">\n                <div class=\"order-product__block order-product__block--{{ key }}\">\n                  <input\n                    type=\"number\"\n                    value=\"{{ product[key] }}\"\n                    (blur)=\"onUpdateProductField(order.id, product.id, key, $event.target.value, true)\"\n                  >\n                </div>  \n              </ng-template>\n                \n            </ng-container>\n\n            <div class=\"order-product__block order-product__block--delete\" (click)=\"onDeleteProduct(order.id, product.id)\">\n              <i class=\"material-icons\">delete</i>            \n            </div>\n            \n          </div>\n        </div>\n        \n      </div>\n      \n      \n      <pagination\n        [total]=\"filteredOrders$ | async\"\n        [length]=\"pageLength\"\n        [current]=\"page\"\n        (dataChanged)=\"paginationChanged($event)\"\n      >\n      </pagination>\n      \n    </div>\n  "
    }),
    __metadata("design:paramtypes", [index_1.OrderService,
        store_1.Store,
        index_1.PopupService,
        core_1.ViewContainerRef])
], Orders);
exports.Orders = Orders;
