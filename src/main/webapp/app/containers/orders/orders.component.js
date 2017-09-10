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
var orders_service_1 = require("../../services/orders.service");
var popup_service_1 = require("../../services/popup.service");
var noty_service_1 = require("../../services/noty.service");
var store_1 = require("../../store");
var index_1 = require("../../models/index");
var animations_1 = require("../../ui/animations");
var OrdersComponent = /** @class */ (function () {
    function OrdersComponent(store, orderService, popupService, notyService, viewRef) {
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
        this.infoBlocks = index_1.STATIC_DATA.infoBlocks;
        this.showFilters = false;
        this.filterLoads = false;
    }
    OrdersComponent.prototype.ngOnInit = function () {
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
        var apiGet = this.page !== 1; // Tracing if it's needed to send http GET request for orders
        this.paginationChanged({ page: 1, length: this.pageLength, apiGet: apiGet });
    };
    OrdersComponent.prototype.onDeleteOrder = function (orderId) {
        var _this = this;
        if (confirm('Действительно удалить этот заказ?')) {
            this.orderService.deleteOrder(orderId).subscribe(function () { return _this.notyService.renderNoty("Order \u2116 " + orderId + " has been deleted"); }, function (error) { return _this.notyService.renderNoty(error, true); });
        }
    };
    // Pagination
    OrdersComponent.prototype.paginationChanged = function (_a) {
        var page = _a.page, length = _a.length, apiGet = _a.apiGet;
        this.pageStream.next({ page: page, length: length, apiGet: apiGet });
    };
    // Manage filter
    OrdersComponent.prototype.onFilterSubmit = function (filters) {
        var _this = this;
        this.filterLoads = true;
        this.orderService.filterOrders(this.page, this.pageLength, filters)
            .subscribe(function (response) { return _this.totalOrders = response.totalElements; }, null, function () { return _this.filterLoads = false; });
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
        this.popupService.renderPopup('Update customer').subscribe(function (customer) {
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
    OrdersComponent.prototype.hasInput = function (key) {
        return key === 'status' || key === 'paymentType' || key === 'quantity' ? true : false;
    };
    OrdersComponent.prototype.trackById = function (index, value) {
        return value.id;
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
    OrdersComponent.prototype.toggleAnimState = function () {
        this.searchInputState = this.searchInputState === 'collapsed' ? 'expanded' : 'collapsed';
    };
    // @TODO remove this
    OrdersComponent.prototype.onGetAllOrders = function () {
        this.orderService.getAllOrders().subscribe(function (resp) { return console.log(resp.data); });
    };
    OrdersComponent.prototype.onGetStore = function () {
        this.orderService.getStore();
    };
    OrdersComponent.prototype.console = function () {
        console.log(this.searchStream);
    };
    OrdersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'orders.component.html',
            animations: [animations_1.slideToLeft(), animations_1.appear(), animations_1.changeWidth()],
            host: { '[@slideToLeft]': '' },
            providers: [popup_service_1.PopupService]
        }),
        __metadata("design:paramtypes", [store_1.Store,
            orders_service_1.OrderService,
            popup_service_1.PopupService,
            noty_service_1.NotyService,
            core_1.ViewContainerRef])
    ], OrdersComponent);
    return OrdersComponent;
}());
exports.OrdersComponent = OrdersComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvb3JkZXJzL29yZGVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBK0U7QUFDL0Usd0NBQTZDO0FBRTdDLHdDQUF1QztBQUV2QywwQ0FBd0M7QUFDeEMsbUNBQWlDO0FBQ2pDLHVDQUFxQztBQUNyQyx1Q0FBcUM7QUFDckMsbUNBQWlDO0FBQ2pDLG1DQUFpQztBQUNqQyxvQ0FBa0M7QUFFbEMsZ0VBQTZEO0FBQzdELDhEQUE0RDtBQUM1RCw0REFBMEQ7QUFDMUQscUNBQW9DO0FBQ3BDLDRDQUFtRjtBQUNuRixrREFBdUU7QUFXdkU7SUFzQkUseUJBQ1UsS0FBWSxFQUNaLFlBQTBCLEVBQzFCLFlBQTBCLEVBQzFCLFdBQXdCLEVBQ3hCLE9BQXlCO1FBSnpCLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQXhCM0IsaUJBQVksR0FBcUIsSUFBSSxtQkFBVyxFQUFFLENBQUM7UUFDbkQsZ0JBQVcsR0FBaUIsRUFBRSxDQUFDO1FBQy9CLHFCQUFnQixHQUFZLFdBQVcsQ0FBQztRQUd4QyxnQkFBVyxHQUFpQixDQUFDLENBQUM7UUFDOUIsb0JBQWUsR0FBYSxDQUFDLENBQUM7UUFDOUIsU0FBSSxHQUF3QixDQUFDLENBQUM7UUFDOUIsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFDL0IsZUFBVSxHQUFnQyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUV4RCxTQUFJLEdBQW1CLEVBQUUsQ0FBQztRQUUxQixlQUFVLEdBQUcsbUJBQVcsQ0FBQyxVQUFVLENBQUM7UUFFcEMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsZ0JBQVcsR0FBWSxLQUFLLENBQUM7SUFTbEMsQ0FBQztJQUVKLGtDQUFRLEdBQVI7UUFB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RUFBRSx3QkFBVyxFQUFFLENBQUM7WUFDdEQsSUFBSSxFQUFVLEVBQUMsZ0JBQWdCLEVBQUUsRUFBRSxFQUFDO1lBQ3BDLFNBQVMsRUFBSyxDQUFDLDRCQUFZLENBQUM7U0FDN0IsQ0FBQzt5Q0F5QmlCLGFBQUs7WUFDRSw2QkFBWTtZQUNaLDRCQUFZO1lBQ2IsMEJBQVc7WUFDZix1QkFBZ0I7T0EzQnhCLGVBQWUsQ0FvUTNCO0lBQUQsc0JBQUM7Q0FwUUQsQUFvUUMsSUFBQTtBQXBRWSwwQ0FBZSIsImZpbGUiOiJjb250YWluZXJzL29yZGVycy9vcmRlcnMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZGVib3VuY2VUaW1lJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tZXJnZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc3RhcnRXaXRoJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9zd2l0Y2hNYXAnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3NoYXJlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9wbHVjayc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyJztcclxuXHJcbmltcG9ydCB7IE9yZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29yZGVycy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcG9wdXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE5vdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm90eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuLi8uLi9zdG9yZSc7XHJcbmltcG9ydCB7IE9yZGVyLCBTVEFUSUNfREFUQSwgSU9yZGVyRmlsdGVyLCBJUGFnZVN0cmVhbSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IHNsaWRlVG9MZWZ0LCBhcHBlYXIsIGNoYW5nZVdpZHRoIH0gZnJvbSAnLi4vLi4vdWkvYW5pbWF0aW9ucyc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgbW9kdWxlSWQgICAgOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGVVcmwgOiAnb3JkZXJzLmNvbXBvbmVudC5odG1sJyxcclxuICBhbmltYXRpb25zICA6IFtzbGlkZVRvTGVmdCgpLCBhcHBlYXIoKSwgY2hhbmdlV2lkdGgoKV0sXHJcbiAgaG9zdCAgICAgICAgOiB7J1tAc2xpZGVUb0xlZnRdJzogJyd9LFxyXG4gIHByb3ZpZGVycyAgIDogW1BvcHVwU2VydmljZV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBPcmRlcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBvcmRlcnMkICAgICAgICAgIDogT2JzZXJ2YWJsZTxPcmRlcltdPjtcclxuXHJcbiAgcHJpdmF0ZSBzZWFyY2hTdHJlYW0gICAgIDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcclxuICBwcml2YXRlIHNlYXJjaFF1ZXJ5ICAgICAgOiBzdHJpbmcgPSAnJztcclxuICBwcml2YXRlIHNlYXJjaElucHV0U3RhdGUgOiBzdHJpbmcgPSAnY29sbGFwc2VkJztcclxuICBwcml2YXRlIGZpbHRlcmVkT3JkZXJzJCAgOiBPYnNlcnZhYmxlPG51bWJlcj47XHJcblxyXG4gIHByaXZhdGUgdG90YWxPcmRlcnMgICAgICA6IG51bWJlciA9IDA7XHJcbiAgcHJpdmF0ZSBwcmVsb2FkZWRPcmRlcnMgIDogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIHBhZ2UgICAgICAgICAgICAgOiBudW1iZXIgPSAxO1xyXG4gIHByaXZhdGUgcGFnZUxlbmd0aCAgICAgICA6IG51bWJlciA9IDEwO1xyXG4gIHByaXZhdGUgcGFnZVN0cmVhbSAgICAgICA6IFN1YmplY3Q8SVBhZ2VTdHJlYW0+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgcHJpdmF0ZSBzdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIGluZm9CbG9ja3MgPSBTVEFUSUNfREFUQS5pbmZvQmxvY2tzO1xyXG5cclxuICBwcml2YXRlIHNob3dGaWx0ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBmaWx0ZXJMb2FkczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZSxcclxuICAgIHByaXZhdGUgb3JkZXJTZXJ2aWNlOiBPcmRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHBvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBub3R5U2VydmljZTogTm90eVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWZcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICAgIHRoaXMub25HZXRPcmRlcnMoKTtcclxuXHJcbiAgICBsZXQgc3RvcmVTb3VyY2UgPSB0aGlzLnN0b3JlLmNoYW5nZXNcclxuICAgICAgLm1hcChzdG9yZSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcmVsb2FkZWRPcmRlcnMgPSBzdG9yZS5vcmRlci5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHtzZWFyY2g6IHRoaXMuc2VhcmNoUXVlcnksIHBhZ2U6IHRoaXMucGFnZSwgbGVuZ3RoOiB0aGlzLnBhZ2VMZW5ndGh9O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2VhcmNoU291cmNlID0gdGhpcy5zZWFyY2hTdHJlYW1cclxuICAgICAgLnZhbHVlQ2hhbmdlc1xyXG4gICAgICAuZGVib3VuY2VUaW1lKDEwMClcclxuICAgICAgLmRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgICAgLm1hcChzZWFyY2hRdWVyeSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtzZWFyY2g6IHNlYXJjaFF1ZXJ5LCBwYWdlOiB0aGlzLnBhZ2UsIGxlbmd0aDogdGhpcy5wYWdlTGVuZ3RofTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHBhZ2VTb3VyY2UgPSB0aGlzLnBhZ2VTdHJlYW1cclxuICAgICAgLm1hcChwYXJhbXMgPT4ge1xyXG4gICAgICAgIHRoaXMucGFnZSA9IHBhcmFtcy5wYWdlO1xyXG4gICAgICAgIHRoaXMucGFnZUxlbmd0aCA9IHBhcmFtcy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcGlHZXQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICB0aGlzLm9uR2V0T3JkZXJzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge3NlYXJjaDogdGhpcy5zZWFyY2hRdWVyeSwgcGFnZTogcGFyYW1zLnBhZ2UsIGxlbmd0aDogcGFyYW1zLmxlbmd0aH07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGxldCBzb3VyY2UgPSBzdG9yZVNvdXJjZVxyXG4gICAgICAubWVyZ2Uoc2VhcmNoU291cmNlLCBwYWdlU291cmNlKVxyXG4gICAgICAuc3RhcnRXaXRoKHtzZWFyY2g6IHRoaXMuc2VhcmNoUXVlcnksIHBhZ2U6IHRoaXMucGFnZSwgbGVuZ3RoOiB0aGlzLnBhZ2VMZW5ndGh9KVxyXG4gICAgICAuc3dpdGNoTWFwKCh7c2VhcmNoLCBwYWdlLCBsZW5ndGh9KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3JkZXJTZXJ2aWNlLmxpc3Qoc2VhcmNoLCBwYWdlLCBsZW5ndGgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuc2hhcmUoKTtcclxuXHJcbiAgICB0aGlzLm9yZGVycyQgPSBzb3VyY2UucGx1Y2soJ29yZGVycycpO1xyXG4gICAgdGhpcy5maWx0ZXJlZE9yZGVycyQgPSBzb3VyY2UucGx1Y2soJ2ZpbHRlcmVkJyk7XHJcblxyXG4gICAgdGhpcy5wb3B1cFNlcnZpY2Uudmlld0NvbnRhaW5lclJlZiA9IHRoaXMudmlld1JlZjtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN1YnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgdGhpcy5vcmRlclNlcnZpY2UucHVyZ2VTdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gTWFuYWdlIG9yZGVyc1xyXG4gIG9uR2V0T3JkZXJzKCkge1xyXG4gICAgdGhpcy5zdWJzW3RoaXMuc3Vicy5sZW5ndGhdID0gdGhpcy5vcmRlclNlcnZpY2VcclxuICAgICAgLmdldE9yZGVycyh0aGlzLnBhZ2UgLSAxLCB0aGlzLnBhZ2VMZW5ndGgpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzcCA9PiB0aGlzLnRvdGFsT3JkZXJzID0gcmVzcC50b3RhbEVsZW1lbnRzKTtcclxuICB9XHJcblxyXG4gIG9uQWRkT3JkZXIoKSB7XHJcbiAgICB0aGlzLm9yZGVyU2VydmljZS5hZGRPcmRlcigpLnN1YnNjcmliZShcclxuICAgICAgKHtvcmRlcklkLCBvcmRlckl0ZW1JZH0pID0+IHRoaXMubm90eVNlcnZpY2UucmVuZGVyTm90eShgT3JkZXIg4oSWICR7b3JkZXJJZH0gaGFzIGJlZW4gYWRkZWRgKSxcclxuICAgICAgZXJyb3IgPT4gdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGVycm9yLCB0cnVlKVxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgYXBpR2V0ID0gdGhpcy5wYWdlICE9PSAxOyAvLyBUcmFjaW5nIGlmIGl0J3MgbmVlZGVkIHRvIHNlbmQgaHR0cCBHRVQgcmVxdWVzdCBmb3Igb3JkZXJzXHJcbiAgICB0aGlzLnBhZ2luYXRpb25DaGFuZ2VkKHtwYWdlOiAxLCBsZW5ndGg6IHRoaXMucGFnZUxlbmd0aCwgYXBpR2V0fSk7XHJcbiAgfVxyXG5cclxuICBvbkRlbGV0ZU9yZGVyKG9yZGVySWQpIHtcclxuICAgIGlmIChjb25maXJtKCfQlNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDQt9Cw0LrQsNC3PycpKSB7XHJcbiAgICAgIHRoaXMub3JkZXJTZXJ2aWNlLmRlbGV0ZU9yZGVyKG9yZGVySWQpLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB0aGlzLm5vdHlTZXJ2aWNlLnJlbmRlck5vdHkoYE9yZGVyIOKEliAke29yZGVySWR9IGhhcyBiZWVuIGRlbGV0ZWRgKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLm5vdHlTZXJ2aWNlLnJlbmRlck5vdHkoZXJyb3IsIHRydWUpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gUGFnaW5hdGlvblxyXG4gIHBhZ2luYXRpb25DaGFuZ2VkKHtwYWdlLCBsZW5ndGgsIGFwaUdldH0pIHtcclxuICAgIHRoaXMucGFnZVN0cmVhbS5uZXh0KHtwYWdlLCBsZW5ndGgsIGFwaUdldH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIE1hbmFnZSBmaWx0ZXJcclxuICBwcml2YXRlIG9uRmlsdGVyU3VibWl0KGZpbHRlcnM6IElPcmRlckZpbHRlcikge1xyXG4gICAgdGhpcy5maWx0ZXJMb2FkcyA9IHRydWU7XHJcbiAgICB0aGlzLm9yZGVyU2VydmljZS5maWx0ZXJPcmRlcnModGhpcy5wYWdlLCB0aGlzLnBhZ2VMZW5ndGgsIGZpbHRlcnMpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgcmVzcG9uc2UgPT4gdGhpcy50b3RhbE9yZGVycyA9IHJlc3BvbnNlLnRvdGFsRWxlbWVudHMsXHJcbiAgICAgICAgbnVsbCxcclxuICAgICAgICAoKSA9PiB0aGlzLmZpbHRlckxvYWRzID0gZmFsc2VcclxuICAgICAgKTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG4gIC8vIE1hbmFnZSBvcmRlciBpbmZvXHJcbiAgb25VcGRhdGVJbmZvRmllbGQob3JkZXJJZCwgZmllbGROYW1lLCB7bmV3VmFsdWUsIG9sZFZhbHVlfSkge1xyXG4gICAgdGhpcy5vcmRlclNlcnZpY2UudXBkYXRlSW5mb0ZpZWxkKG9yZGVySWQsIGZpZWxkTmFtZSwgbmV3VmFsdWUpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGAke29sZFZhbHVlfSBoYXMgYmVlbiBjaGFuZ2VkIHRvICR7bmV3VmFsdWV9YCksXHJcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGVycm9yLCB0cnVlKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgb25VcGRhdGVJbmZvSW5wdXQob3JkZXJJZCwgZmllbGROYW1lLCB2YWx1ZSkge1xyXG4gICAgdGhpcy5vcmRlclNlcnZpY2UudXBkYXRlSW5mb0lucHV0KG9yZGVySWQsIGZpZWxkTmFtZSwgdmFsdWUpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGAke2ZpZWxkTmFtZX0gaGFzIGJlZW4gY2hhbmdlZCB0byAke3ZhbHVlfWApLFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMubm90eVNlcnZpY2UucmVuZGVyTm90eShlcnJvciwgdHJ1ZSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIG9uQXV0b2NvbXBsZXRlSW5mbyhvcmRlcklkLCBkYXRhKSB7XHJcbiAgICB0aGlzLm9yZGVyU2VydmljZS5hdXRvY29tcGxldGVJbmZvKG9yZGVySWQsIGRhdGEpLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4gdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGAke2RhdGEubGFiZWx9IGhhcyBiZWVuIGFkZGVkYCksXHJcbiAgICAgIGVycm9yID0+IHRoaXMubm90eVNlcnZpY2UucmVuZGVyTm90eShlcnJvciwgdHJ1ZSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgLy8gTWFuYWdlIG9yZGVyIHByb2R1Y3RzXHJcbiAgb25BZGRQcm9kdWN0KG9yZGVySWQpIHtcclxuICAgIHRoaXMub3JkZXJTZXJ2aWNlLmFkZFByb2R1Y3Qob3JkZXJJZCkuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB0aGlzLm5vdHlTZXJ2aWNlLnJlbmRlck5vdHkoYFByb2R1Y3QgZm9yIG9yZGVyICR7b3JkZXJJZH0gaGFzIGJlZW4gYWRkZWRgKSxcclxuICAgICAgZXJyb3IgPT4gdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGVycm9yLCB0cnVlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG9uVXBkYXRlUHJvZHVjdEZpZWxkKG9yZGVySWQsIHByb2R1Y3RJZCwgZmllbGROYW1lLCB7bmV3VmFsdWUsIG9sZFZhbHVlfSkge1xyXG4gICAgdGhpcy5vcmRlclNlcnZpY2UudXBkYXRlUHJvZHVjdEZpZWxkKG9yZGVySWQsIHByb2R1Y3RJZCwgZmllbGROYW1lLCBuZXdWYWx1ZSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB0aGlzLm5vdHlTZXJ2aWNlLnJlbmRlck5vdHkoYCR7b2xkVmFsdWV9IGhhcyBiZWVuIGNoYW5nZWQgdG8gJHtuZXdWYWx1ZX1gKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLm5vdHlTZXJ2aWNlLnJlbmRlck5vdHkoZXJyb3IsIHRydWUpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBvblVwZGF0ZVByb2R1Y3RJbnB1dChvcmRlcklkLCBwcm9kdWN0SWQsIGZpZWxkTmFtZSwgdmFsdWUpIHtcclxuICAgIHRoaXMub3JkZXJTZXJ2aWNlLnVwZGF0ZVByb2R1Y3RJbnB1dChvcmRlcklkLCBwcm9kdWN0SWQsIGZpZWxkTmFtZSwgdmFsdWUpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGAke2ZpZWxkTmFtZX0gaGFzIGJlZW4gY2hhbmdlZCB0byAke3ZhbHVlfWApLFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMubm90eVNlcnZpY2UucmVuZGVyTm90eShlcnJvciwgdHJ1ZSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIG9uQXV0b2NvbXBsZXRlUHJvZHVjdChvcmRlcklkLCBwcm9kdWN0SWQsIGRhdGEpIHtcclxuICAgIHRoaXMub3JkZXJTZXJ2aWNlLmF1dG9jb21wbGV0ZVByb2R1Y3Qob3JkZXJJZCwgcHJvZHVjdElkLCBkYXRhKS5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHRoaXMubm90eVNlcnZpY2UucmVuZGVyTm90eShgJHtkYXRhLmxhYmVsfSBoYXMgYmVlbiBhZGRlZGApLFxyXG4gICAgICBlcnJvciA9PiB0aGlzLm5vdHlTZXJ2aWNlLnJlbmRlck5vdHkoZXJyb3IsIHRydWUpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb25EZWxldGVQcm9kdWN0KGlkLCBwcm9kdWN0SWQpIHtcclxuICAgIGlmIChjb25maXJtKCfQlNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRg9C00LDQu9C40YLRjCDRjdGC0YMg0L/QvtC30LjRhtC40Y4/JykpIHtcclxuICAgICAgdGhpcy5vcmRlclNlcnZpY2UuZGVsZXRlUHJvZHVjdChpZCwgcHJvZHVjdElkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGBQcm9kdWN0ICR7cHJvZHVjdElkfSBoYXMgYmVlbiBkZWxldGVkYCksXHJcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGVycm9yLCB0cnVlKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5cclxuICAvLyBNYW5hZ2UgY3VzdG9tZXJzXHJcbiAgb25FZGl0Q3VzdG9tZXIoY3VzdG9tZXJJZCkge1xyXG4gICAgdGhpcy5wb3B1cFNlcnZpY2UucmVuZGVyUG9wdXAoJ1VwZGF0ZSBjdXN0b21lcicpLnN1YnNjcmliZShjdXN0b21lciA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJTZXJ2aWNlLnNhdmVDdXN0b21lcihjdXN0b21lcklkLCBjdXN0b21lcikuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHRoaXMubm90eVNlcnZpY2UucmVuZGVyTm90eShgQ3VzdG9tZXIgJHtjdXN0b21lcklkfSBoYXMgYmVlbiBlZGl0ZWRgKSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLm5vdHlTZXJ2aWNlLnJlbmRlck5vdHkoZXJyb3IsIHRydWUpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMub3JkZXJTZXJ2aWNlLmdldEN1c3RvbWVyKGN1c3RvbWVySWQpLnN1YnNjcmliZShjdXN0b21lciA9PiB7XHJcbiAgICAgIHRoaXMucG9wdXBTZXJ2aWNlLm9uUHJvdmlkZVdpdGhGb3JtRGF0YShjdXN0b21lcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uUGVyc2lzdEN1c3RvbWVyKG9yZGVySWQpIHtcclxuICAgIHRoaXMub3JkZXJTZXJ2aWNlLnBlcnNpc3RDdXN0b21lcihvcmRlcklkKS5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHRoaXMubm90eVNlcnZpY2UucmVuZGVyTm90eShgQ3VzdG9tZXIgZm9yIG9yZGVyICR7b3JkZXJJZH0gaGFzIGJlZW4gc2F2ZWRgKSxcclxuICAgICAgZXJyb3IgPT4gdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGVycm9yLCB0cnVlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLy8gR2VuZXJhbCBmdW5jdGlvbnNcclxuICBoYXNJbnB1dChrZXkpIHtcclxuICAgIHJldHVybiBrZXkgPT09ICdzdGF0dXMnIHx8IGtleSA9PT0gJ3BheW1lbnRUeXBlJyB8fCBrZXkgPT09ICdxdWFudGl0eScgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5SWQoaW5kZXg6IG51bWJlciwgdmFsdWUpIHtcclxuICAgIHJldHVybiB2YWx1ZS5pZDtcclxuICB9XHJcblxyXG4gIG9uTW92ZUZvY3VzKGVsLCBmcm9tSW5mb0Jsb2NrKSB7XHJcbiAgICBsZXQgcGFyZW50TmV4dFNpYmxpbmcgPSBlbC5wYXJlbnROb2RlLm5leHRFbGVtZW50U2libGluZztcclxuICAgIGlmIChwYXJlbnROZXh0U2libGluZykge1xyXG4gICAgICBpZiAoZnJvbUluZm9CbG9jaykge1xyXG4gICAgICAgIGVsLnBhcmVudE5vZGUubmV4dEVsZW1lbnRTaWJsaW5nLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmZvY3VzKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gQXJyYXkuZnJvbShlbC5wYXJlbnROb2RlLmNoaWxkcmVuKS5pbmRleE9mKGVsKTtcclxuICAgICAgICBwYXJlbnROZXh0U2libGluZy5jaGlsZHJlbltpbmRleF0uZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQW5pbVN0YXRlKCkge1xyXG4gICAgdGhpcy5zZWFyY2hJbnB1dFN0YXRlID0gdGhpcy5zZWFyY2hJbnB1dFN0YXRlID09PSAnY29sbGFwc2VkJyA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJztcclxuICB9XHJcblxyXG5cclxuXHJcbi8vIEBUT0RPIHJlbW92ZSB0aGlzXHJcbiAgb25HZXRBbGxPcmRlcnMoKSB7XHJcbiAgICB0aGlzLm9yZGVyU2VydmljZS5nZXRBbGxPcmRlcnMoKS5zdWJzY3JpYmUocmVzcCA9PiBjb25zb2xlLmxvZyhyZXNwLmRhdGEpKTtcclxuICB9XHJcblxyXG4gIG9uR2V0U3RvcmUoKSB7XHJcbiAgICB0aGlzLm9yZGVyU2VydmljZS5nZXRTdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VhcmNoU3RyZWFtKTtcclxuICB9XHJcblxyXG5cclxufVxyXG4iXX0=
