var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/map';
import { Store } from '../../store';
import { CustomerService } from '../../services/index';
import { slideToLeft, changeWidth } from '../../ui/animations';
var CustomersComponent = /** @class */ (function () {
    function CustomersComponent(customerService, store) {
        this.customerService = customerService;
        this.store = store;
        this.searchStream = new FormControl();
        this.searchQuery = '';
        this.pageStream = new Subject();
        this.page = 1;
        this.pageLength = 10;
        this.subs = [];
        this.searchExpanded = 'collapsed';
    }
    CustomersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs[this.subs.length] = this.customerService.getAllCustomers().subscribe();
        var storeSource = this.store.changes
            .map(function (store) {
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
            return _this.customerService.list(params.search, params.page, params.length);
        })
            .share();
        this.customers$ = source.pluck('customers');
        this.filteredCustomers$ = source.pluck('filtered');
    };
    CustomersComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
        this.customerService.purgeStore();
    };
    /* Pagination */
    CustomersComponent.prototype.paginationChanged = function (_a) {
        var page = _a.page, length = _a.length;
        this.pageStream.next({ page: page, length: length });
        this.page = page;
        this.pageLength = length;
    };
    CustomersComponent.prototype.toggleAnimState = function () {
        this.searchExpanded = this.searchExpanded === 'collapsed' ? 'expanded' : 'collapsed';
    };
    CustomersComponent = __decorate([
        Component({
            moduleId: module.id,
            templateUrl: 'customers.component.html',
            animations: [slideToLeft(), changeWidth()],
            host: { '[@slideToLeft]': '' }
        }),
        __metadata("design:paramtypes", [CustomerService,
            Store])
    ], CustomersComponent);
    return CustomersComponent;
}());
export { CustomersComponent };
