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
var orders_1 = require("../services/orders");
var popup_1 = require("../services/popup");
var noty_1 = require("../services/noty");
var store_1 = require("../store");
var models_1 = require("../models");
var animations_1 = require("../ui/animations");
var Orders = (function () {
    function Orders(store, orderService, popupService, notyService, viewRef) {
        this.store = store;
        this.orderService = orderService;
        this.popupService = popupService;
        this.notyService = notyService;
        this.viewRef = viewRef;
        this.searchStream = new forms_1.FormControl();
        this.searchQuery = '';
        this.searchInputState = 'collapsed';
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
        this.onGetOrders();
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
            return { search: searchQuery, page: _this.page, length: _this.pageLength };
        });
        var pageSource = this.pageStream
            .map(function (params) {
            _this.page = params.page;
            _this.pageLength = params.length;
            if (params.apiGet !== false) {
                _this.onGetOrders();
            }
            return { search: _this.searchQuery, page: params.page, length: params.length };
        });
        var source = storeSource
            .merge(searchSource, pageSource)
            .startWith({ search: this.searchQuery, page: this.page, length: this.pageLength })
            .switchMap(function (_a) {
            var search = _a.search, page = _a.page, length = _a.length;
            return _this.orderService.list(search, page, length);
        })
            .share();
        this.orders$ = source.pluck('orders');
        this.filteredOrders$ = source.pluck('filtered');
        this.popupService.viewContainerRef = this.viewRef;
    };
    Orders.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
        this.orderService.purgeStore();
    };
    // Manage orders
    Orders.prototype.onGetOrders = function () {
        var _this = this;
        this.subs[this.subs.length] = this.orderService
            .getOrders(this.page - 1, this.pageLength)
            .subscribe(function (resp) {
            _this.totalOrders = resp.totalElements;
        });
    };
    Orders.prototype.onAddOrder = function () {
        var _this = this;
        this.orderService.addOrder().subscribe(function (_a) {
            var orderId = _a.orderId, orderItemId = _a.orderItemId;
            _this.notyService.renderNoty("Order \u2116 " + orderId + " has been added");
        });
        var apiGet = this.page === 1 ? false : true; // Tracing if it's needed to send http GET request for orders
        this.paginationChanged({ page: 1, length: this.pageLength, apiGet: apiGet });
    };
    Orders.prototype.onDeleteOrder = function (orderId) {
        var _this = this;
        if (confirm('Действительно удалить этот заказ?')) {
            this.orderService.deleteOrder(orderId).subscribe(function () {
                _this.notyService.renderNoty("Order \u2116 " + orderId + " has been deleted");
            });
        }
    };
    // Pagination
    Orders.prototype.paginationChanged = function (_a) {
        var page = _a.page, length = _a.length, apiGet = _a.apiGet;
        this.pageStream.next({ page: page, length: length, apiGet: apiGet });
    };
    // Manage order info
    Orders.prototype.onUpdateInfoField = function (orderId, fieldName, value) {
        this.orderService.updateInfoField(orderId, fieldName, value);
    };
    Orders.prototype.onUpdateInfoInput = function (orderId, fieldName, value) {
        this.orderService.updateInfoInput(orderId, fieldName, value);
    };
    Orders.prototype.onAutocompleteInfo = function (orderId, data) {
        this.orderService.autocompleteInfo(orderId, data);
    };
    // Manage order products
    Orders.prototype.onAddProduct = function (orderId) {
        this.orderService.addProduct(orderId);
    };
    Orders.prototype.onUpdateProductField = function (orderId, productId, fieldName, value) {
        this.orderService.updateProductField(orderId, productId, fieldName, value);
    };
    Orders.prototype.onUpdateProductInput = function (orderId, productId, fieldName, value) {
        this.orderService.updateProductInput(orderId, productId, fieldName, value);
    };
    Orders.prototype.onAutocompleteProduct = function (orderId, productId, data) {
        this.orderService.autocompleteProduct(orderId, productId, data);
    };
    Orders.prototype.onDeleteProduct = function (id, productId) {
        if (confirm('Действительно удалить эту позицию?')) {
            this.orderService.deleteProduct(id, productId).subscribe();
        }
    };
    // Manage customers
    Orders.prototype.onEditCustomer = function (customerId) {
        var _this = this;
        this.popupService.renderPopup('Update customer').subscribe(function (customer) {
            _this.orderService.saveCustomer(customerId, customer).subscribe();
        });
        this.orderService.getCustomer(customerId).subscribe(function (customer) {
            _this.popupService.onProvideWithFormData(customer);
        });
    };
    Orders.prototype.onPersistCustomer = function (orderId) {
        this.orderService.persistCustomer(orderId);
    };
    // @TODO remove this
    Orders.prototype.onGetAllOrders = function () {
        this.orderService.getAllOrders().subscribe(function (resp) { return console.log(resp.data); });
    };
    Orders.prototype.onGetStore = function () {
        this.orderService.getStore();
    };
    Orders.prototype.console = function () {
        console.log(this.searchStream);
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
    Orders.prototype.toggleAnimState = function () {
        this.searchInputState = this.searchInputState === 'collapsed' ? 'expanded' : 'collapsed';
    };
    return Orders;
}());
Orders = __decorate([
    core_1.Component({
        template: "           \n    <div style=\"display: none;\">\n      <div class=\"get-orders\" style=\"display: inline-block;\" (click)=\"onGetAllOrders()\">Get All Orders</div>\n    \n      <div class=\"consolestore\" style=\"display: inline-block;\" (click)=\"onGetStore()\">Console current state</div>\n      \n      <div class=\"consoleorders\"  style=\"display: inline-block;\" (click)=\"console()\">Console</div>\n    </div>\n      \n    <div class=\"wrapper order-page\">\n    \n      <div class=\"service-block\">\n        <div\n          class=\"btn btn-orders-add\"\n          (click)=\"onAddOrder()\"\n        >Add New Order</div>\n        \n        <div\n          class=\"search-input-container\"\n          [class.expanded]=\"searchInputState === 'expanded'\"\n        >  \n          <input type=\"text\" name=\"searchStream\" id=\"\"\n            placeholder=\"Search in orders...\"\n            class=\"input search-input\"\n            [@changeWidth]=\"searchInputState\"\n            #searchControl\n            [formControl]=\"searchStream\"\n            [(ngModel)]=\"searchQuery\"\n            (focusin)=\"toggleAnimState()\"\n            (focusout)=\"toggleAnimState()\"\n          >\n        </div>\n         \n      </div>\n      \n      \n      <pagination\n        [total]=\"totalOrders\"\n        [length]=\"pageLength\"\n        [current]=\"page\"\n        (dataChanged)=\"paginationChanged($event)\"\n      >\n      </pagination>\n    \n      <div\n        class=\"order order--{{ order.status }}\"\n        [@appear]\n        *ngFor=\"let order of orders$ | async\"\n       >\n      \n        <div class=\"order-info\">\n        \n          <div class=\"order-info__block order-info__block--id\">\n            {{ order.id }}\n          </div>\n          \n          <ng-container \n            *ngFor=\"let key of order | keys:['id', 'customerId', 'orderItemDtos']\"\n          >\n          \n            <ng-template [ngIf]=\"!hasInput(key)\">\n              <div \n                class=\"order-info__block order-info__block--{{ key }}\"\n                contenteditable                \n                [autocomplete]=\"['info', key]\"\n                [(contenteditableModel)]=\"order[key]\"\n                (selectedAutocomplete)=\"onAutocompleteInfo(order.id, $event)\"\n                (contentChanged)=\"onUpdateInfoField(order.id, key, $event)\"\n              ></div>\n            </ng-template>\n          \n            <ng-template [ngIf]=\"hasInput(key)\">\n              <div class=\"order-info__block order-info__block--{{ key }}\">\n                <select\n                  name=\"{{ key }}\"\n                  (change)=\"onUpdateInfoInput(order.id, key, $event.target.value)\"\n                >\n                  <option\n                   *ngFor=\"let value of infoBlocks[key]\"\n                   [value]=\"value\"\n                   [attr.selected]=\"value === order[key] ? '' : null\"\n                  >\n                    {{ value }}\n                  </option>\n                </select>\n              </div>  \n            </ng-template>\n          \n          </ng-container>\n        </div>\n       \n       \n       \n        <div class=\"order-manage\">\n          <div title=\"Add product\" class=\"order-manage__block order-manage__block--add\" (click)=\"onAddProduct(order.id)\">\n            <i class=\"material-icons\">add_box</i>\n            <div class=\"order-manage__text\">Add product</div>\n          </div>\n          <div title=\"Save customer\" class=\"order-manage__block order-manage__block--save\"\n            *ngIf=\"order.customerId === 0\"\n            (click)=\"onPersistCustomer(order.id)\"\n          >\n            <i class=\"material-icons\">save</i>\n            <div class=\"order-manage__text\">Save customer</div>\n          </div>\n          <div title=\"Edit customer\" class=\"order-manage__block order-manage__block--edit\"\n            *ngIf=\"order.customerId !== 0\"\n            (click)=\"onEditCustomer(order.customerId)\"\n          >\n            <i class=\"material-icons\">mode_edit</i>\n            <div class=\"order-manage__text\">Edit customer</div>\n          </div>\n          <div title=\"Delete order\" class=\"order-manage__block order-manage__block--delete\" (click)=\"onDeleteOrder(order.id)\">\n            <i class=\"material-icons\">delete_forever</i>\n            <div class=\"order-manage__text\">Delete order</div>\n          </div>\n        </div>\n        \n        \n        <div class=\"order-products\">\n          <div\n            *ngFor=\"let product of order.orderItemDtos; let odd = odd, let even = even;\"\n            [ngClass]=\"{'order-product': true, odd: odd, even: even}\"\n          >\n          \n            <ng-container\n              *ngFor=\"let key of product | keys:[\n                'id', 'productId', 'productVariationId', 'categories', 'supplier'\n              ];\"\n            >\n            \n              <ng-template [ngIf]=\"!hasInput(key)\">\n                <div\n                  class=\"order-product__block order-product__block--{{ key }}\"\n                  contenteditable\n                  #productBlock\n                  [autocomplete]=\"['product', key]\"\n                  [(contenteditableModel)]=\"product[key]\"\n                  (selectedAutocomplete)=\"onAutocompleteProduct(order.id, product.id, $event)\"\n                  (contentChanged)=\"onUpdateProductField(order.id, product.id, key, $event)\"\n                ></div>  \n              </ng-template>\n          \n              <ng-template [ngIf]=\"hasInput(key)\">\n                <div class=\"order-product__block order-product__block--{{ key }}\">\n                  <input\n                    type=\"number\"\n                    value=\"{{ product[key] }}\"\n                    (blur)=\"onUpdateProductInput(order.id, product.id, key, $event.target.value)\"\n                  >\n                </div>  \n              </ng-template>\n                \n            </ng-container>\n\n            <div class=\"order-product__block order-product__block--delete\" (click)=\"onDeleteProduct(order.id, product.id)\">\n              <i class=\"material-icons\">delete</i>            \n            </div>\n            \n          </div>\n        </div>\n        \n      </div>\n      \n    </div>\n  ",
        animations: [animations_1.slideToLeft(), animations_1.appear(), animations_1.changeWidth()],
        host: { '[@slideToLeft]': '' },
        providers: [popup_1.PopupService]
    }),
    __metadata("design:paramtypes", [store_1.Store,
        orders_1.OrderService,
        popup_1.PopupService,
        noty_1.NotyService,
        core_1.ViewContainerRef])
], Orders);
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map