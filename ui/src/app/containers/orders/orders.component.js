var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import { OrderService } from '../../services/orders.service';
import { PopupService } from '../../services/popup.service';
import { NotyService } from '../../services/noty.service';
import { Store } from '../../store';
import { STATIC_DATA } from '../../models/index';
import { slideToLeft, appear } from '../../ui/animations';
import { DataFilter } from '../../ui/index';
var OrdersComponent = /** @class */ (function () {
    function OrdersComponent(store, orderService, popupService, notyService, viewRef) {
        this.store = store;
        this.orderService = orderService;
        this.popupService = popupService;
        this.notyService = notyService;
        this.viewRef = viewRef;
        this.totalOrders = 0;
        this.preloadedOrders = 0;
        this.page = 1;
        this.pageLength = 20;
        this.pageStream = new Subject();
        this.subs = [];
        this.infoBlocks = STATIC_DATA.infoBlocks;
        this.showFilters = false;
        this.filterSubmitted = false;
        this.showSuppliers = false;
    }
    OrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onGetOrders();
        var storeSource = this.store.changes
            .map(function (store) {
            _this.preloadedOrders = store.order.length;
            return { page: _this.page, length: _this.pageLength };
        });
        var pageSource = this.pageStream
            .map(function (params) {
            _this.page = params.page;
            _this.pageLength = params.length;
            if (params.apiGet !== false) {
                if (_this.filterSubmitted) {
                    _this.onFilterSubmit();
                }
                else {
                    _this.onGetOrders();
                }
            }
            return { page: params.page, length: params.length };
        });
        var source = storeSource
            .merge(pageSource)
            .startWith({ page: this.page, length: this.pageLength })
            .switchMap(function (_a) {
            var page = _a.page, length = _a.length;
            return _this.orderService.list(page, length);
        })
            .share();
        this.orders$ = source.pluck('orders');
        this.popupService.viewContainerRef = this.viewRef;
    };
    OrdersComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
        this.orderService.purgeStore();
    };
    // Manage orders
    OrdersComponent.prototype.onGetOrders = function () {
        var _this = this;
        this.subs[this.subs.length] = this.orderService
            .getOrders(this.page - 1, this.pageLength)
            .subscribe(function (resp) { return _this.totalOrders = resp.totalElements; });
    };
    OrdersComponent.prototype.onAddOrder = function () {
        var _this = this;
        this.orderService.addOrder().subscribe(function (_a) {
            var orderId = _a.orderId, orderItemId = _a.orderItemId;
            return _this.notyService.renderNoty("Order \u2116 " + orderId + " has been added");
        }, function (error) { return _this.notyService.renderNoty(error, true); });
        var apiGet = this.page !== 1; // Trace if it's needed to send http GET request for orders
        this.paginationChanged({ page: 1, length: this.pageLength, apiGet: apiGet });
    };
    OrdersComponent.prototype.onDeleteOrder = function (orderId) {
        var _this = this;
        if (confirm('Действительно удалить этот заказ?')) {
            this.orderService.deleteOrder(orderId).subscribe(function () { return _this.notyService.renderNoty("Order \u2116 " + orderId + " has been deleted"); }, function (error) { return _this.notyService.renderNoty(error, true); });
        }
    };
    OrdersComponent.prototype.onPrintOrder = function (order, link) {
        var _this = this;
        this.orderService.printOrder(order.orderId).subscribe(function (resp) {
            var date = new Date(order.createdDateTime);
            var name = _this.transliterate(order.customerLastName);
            var fileName = name + "_" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ".pdf";
            setTimeout(function () {
                link.href = "data:application/octet-stream;base64," + resp;
                link.download = fileName;
                link.target = "_blank";
                link.click();
                // const myPrintWindow = window.open('url', 'window name');
                // myPrintWindow.document.write(`<embed width="100%" height="100%" name="plugin" id="plugin" src="data:application/pdf;base64,${resp}" type="application/pdf" internalinstanceid="10">`);
                // if (myPrintWindow.document.readyState !== 'complete') {
                //     myPrintWindow.document.addEventListener('load', () => {
                //         myPrintWindow.document.title = fileName;
                //     });
                // } else {
                //     myPrintWindow.document.title = fileName;
                // }
            }, 50);
        });
    };
    // Manage pagination
    OrdersComponent.prototype.paginationChanged = function (_a) {
        var page = _a.page, length = _a.length, apiGet = _a.apiGet;
        this.pageStream.next({ page: page, length: length, apiGet: apiGet });
    };
    // Manage filter
    OrdersComponent.prototype.onFilterSubmit = function () {
        var _this = this;
        if (!this.filterSubmitted) {
            this.page = 1;
            if (this.pageLength === 10) {
                this.pageLength = 20;
            }
        }
        var filters = this.dataFilter.form.value;
        this.filterSubmitted = true;
        this.orderService.filterOrders(this.page, this.pageLength, filters)
            .subscribe(function (response) { return _this.totalOrders = response.totalElements; });
    };
    OrdersComponent.prototype.resetFilter = function () {
        this.showFilters = false;
        this.filterSubmitted = false;
        this.page = 1;
        this.onGetOrders();
    };
    // Manage order info
    OrdersComponent.prototype.onUpdateInfoField = function (orderId, fieldName, _a) {
        var _this = this;
        var newValue = _a.newValue, oldValue = _a.oldValue;
        this.orderService.updateInfoField(orderId, fieldName, newValue)
            .subscribe(function () { return _this.notyService.renderNoty(oldValue + " has been changed to " + newValue); }, function (error) { return _this.notyService.renderNoty(error, true); });
    };
    OrdersComponent.prototype.onUpdateInfoInput = function (orderId, fieldName, value) {
        var _this = this;
        this.orderService.updateInfoInput(orderId, fieldName, value)
            .subscribe(function () { return _this.notyService.renderNoty(fieldName + " has been changed to " + value); }, function (error) { return _this.notyService.renderNoty(error, true); });
    };
    OrdersComponent.prototype.onAutocompleteInfo = function (orderId, data) {
        var _this = this;
        this.orderService.autocompleteInfo(orderId, data).subscribe(function () { return _this.notyService.renderNoty(data.label + " has been added"); }, function (error) { return _this.notyService.renderNoty(error, true); });
    };
    // Manage order products
    OrdersComponent.prototype.onAddProduct = function (orderId) {
        var _this = this;
        this.orderService.addProduct(orderId).subscribe(function () { return _this.notyService.renderNoty("Product for order " + orderId + " has been added"); }, function (error) { return _this.notyService.renderNoty(error, true); });
    };
    OrdersComponent.prototype.onUpdateProductField = function (orderId, productId, fieldName, _a) {
        var _this = this;
        var newValue = _a.newValue, oldValue = _a.oldValue;
        this.orderService.updateProductField(orderId, productId, fieldName, newValue)
            .subscribe(function () { return _this.notyService.renderNoty(oldValue + " has been changed to " + newValue); }, function (error) { return _this.notyService.renderNoty(error, true); });
    };
    OrdersComponent.prototype.onUpdateProductInput = function (orderId, productId, fieldName, value) {
        var _this = this;
        this.orderService.updateProductInput(orderId, productId, fieldName, value)
            .subscribe(function () { return _this.notyService.renderNoty(fieldName + " has been changed to " + value); }, function (error) { return _this.notyService.renderNoty(error, true); });
    };
    OrdersComponent.prototype.onAutocompleteProduct = function (orderId, productId, data) {
        var _this = this;
        this.orderService.autocompleteProduct(orderId, productId, data).subscribe(function () { return _this.notyService.renderNoty(data.label + " has been added"); }, function (error) { return _this.notyService.renderNoty(error, true); });
    };
    OrdersComponent.prototype.onDeleteProduct = function (id, productId) {
        var _this = this;
        if (confirm('Действительно удалить эту позицию?')) {
            this.orderService.deleteProduct(id, productId).subscribe(function () { return _this.notyService.renderNoty("Product " + productId + " has been deleted"); }, function (error) { return _this.notyService.renderNoty(error, true); });
        }
    };
    // Manage customers
    OrdersComponent.prototype.onEditCustomer = function (customerId) {
        var _this = this;
        this.popupService.renderPopup('form', 'Update customer').subscribe(function (customer) {
            _this.orderService.saveCustomer(customerId, customer).subscribe(function () { return _this.notyService.renderNoty("Customer " + customerId + " has been edited"); }, function (error) { return _this.notyService.renderNoty(error, true); });
        });
        this.orderService.getCustomer(customerId).subscribe(function (customer) {
            _this.popupService.onProvideWithFormData(customer);
        });
    };
    OrdersComponent.prototype.onPersistCustomer = function (orderId) {
        var _this = this;
        this.orderService.persistCustomer(orderId).subscribe(function () { return _this.notyService.renderNoty("Customer for order " + orderId + " has been saved"); }, function (error) { return _this.notyService.renderNoty(error, true); });
    };
    // General functions
    OrdersComponent.prototype.trackById = function (index, value) {
        return value.orderId;
    };
    OrdersComponent.prototype.onMoveFocus = function (el, fromInfoBlock) {
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
    OrdersComponent.prototype.transliterate = function (input) {
        var str = input.toLowerCase();
        var dash = '-';
        var mapping = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
            'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': dash, 'ы': 'y', 'ь': dash, 'э': 'e', 'ю': 'yu', 'я': 'ya',
            ' ': dash, '_': dash, '`': dash, '~': dash, '!': dash, '@': dash,
            '#': dash, '$': dash, '%': dash, '^': dash, '&': dash, '*': dash,
            '(': dash, ')': dash, '-': dash, '\=': dash, '+': dash, '[': dash,
            ']': dash, '\\': dash, '|': dash, '/': dash, '.': dash, ',': dash,
            '{': dash, '}': dash, '\'': dash, '"': dash, ';': dash, ':': dash,
            '?': dash, '<': dash, '>': dash, '№': dash
        };
        var result = '';
        var current_sim = '';
        for (var i = 0; i < str.length; i++) {
            if (mapping[str[i]] !== undefined) {
                if (current_sim !== mapping[str[i]] || current_sim !== dash) {
                    if (i === 0) {
                        result += mapping[str[i]].toUpperCase();
                    }
                    else {
                        result += mapping[str[i]];
                    }
                    current_sim = mapping[str[i]];
                }
            }
            else {
                if (i === 0) {
                    result += str[i].toUpperCase();
                }
                else {
                    result += str[i];
                }
                current_sim = str[i];
            }
        }
        return result;
    };
    // @TODO remove this
    OrdersComponent.prototype.onGetAllOrders = function () {
        this.orderService.getAllOrders().subscribe(function (resp) { return console.log(resp.data); });
    };
    OrdersComponent.prototype.onGetStore = function () {
        this.orderService.getStore();
    };
    OrdersComponent.prototype.console = function () {
        // this.orderService.hello();
    };
    __decorate([
        ViewChild('dataFilter'),
        __metadata("design:type", DataFilter)
    ], OrdersComponent.prototype, "dataFilter", void 0);
    OrdersComponent = __decorate([
        Component({
            moduleId: module.id,
            templateUrl: 'orders.component.html',
            animations: [slideToLeft(), appear()],
            host: { '[@slideToLeft]': '' },
            providers: [PopupService]
        }),
        __metadata("design:paramtypes", [Store,
            OrderService,
            PopupService,
            NotyService,
            ViewContainerRef])
    ], OrdersComponent);
    return OrdersComponent;
}());
export { OrdersComponent };
