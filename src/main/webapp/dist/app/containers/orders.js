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
        this.infoBlocks = models_1.STATIC_DATA.infoBlocks;
        this.showFilters = false;
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
        var apiGet = this.page !== 1; // Tracing if it's needed to send http GET request for orders
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
    Orders.prototype.onUpdateInfoField = function (orderId, fieldName, _a) {
        var _this = this;
        var newValue = _a.newValue, oldValue = _a.oldValue;
        this.orderService.updateInfoField(orderId, fieldName, newValue)
            .subscribe(function () {
            _this.notyService.renderNoty(oldValue + " has been changed to " + newValue);
        });
    };
    Orders.prototype.onUpdateInfoInput = function (orderId, fieldName, e) {
        this.orderService.updateInfoInput(orderId, fieldName, e.target.value)
            .subscribe();
    };
    Orders.prototype.onAutocompleteInfo = function (orderId, data) {
        this.orderService.autocompleteInfo(orderId, data);
    };
    // Manage order products
    Orders.prototype.onAddProduct = function (orderId) {
        this.orderService.addProduct(orderId);
    };
    Orders.prototype.onUpdateProductField = function (orderId, productId, fieldName, _a) {
        var _this = this;
        var newValue = _a.newValue, oldValue = _a.oldValue;
        this.orderService.updateProductField(orderId, productId, fieldName, newValue)
            .subscribe(function () {
            _this.notyService.renderNoty(oldValue + " has been changed to " + newValue);
        });
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
    // Manage filter
    Orders.prototype.onFilterSubmit = function (filters) {
        var transformed = {};
        for (var key in filters) {
            if (filters.hasOwnProperty(key)) {
                if (filters[key]) {
                    if (key.toLowerCase().indexOf('date') !== -1) {
                        transformed[key] = filters[key] + "T00:00:00";
                    }
                    else {
                        transformed[key] = filters[key];
                    }
                }
            }
        }
        var body = {
            filter: transformed,
            pageNumber: this.page - 1,
            pageCapacity: this.pageLength
        };
        this.orderService.filterOrders(body)
            .subscribe(function (r) { return console.log(r); });
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
        templateUrl: '../../../assets/templates/containers/orders.html',
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