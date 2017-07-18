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
require("rxjs/add/operator/map");
var store_1 = require("../store");
var index_1 = require("../services/index");
var Customers = (function () {
    function Customers(customerService, store) {
        this.customerService = customerService;
        this.store = store;
        this.searchStream = new forms_1.FormControl();
        this.searchQuery = '';
        this.pageStream = new Subject_1.Subject();
        this.page = 1;
        this.pageLength = 10;
        this.subs = [];
    }
    Customers.prototype.ngOnInit = function () {
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
    Customers.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /* Pagination */
    Customers.prototype.paginationChanged = function (_a) {
        var page = _a.page, length = _a.length;
        this.pageStream.next({ page: page, length: length });
        this.page = page;
        this.pageLength = length;
    };
    return Customers;
}());
__decorate([
    core_1.ViewChild('searchControl'),
    __metadata("design:type", core_1.ElementRef)
], Customers.prototype, "searchControl", void 0);
Customers = __decorate([
    core_1.Component({
        template: "\n\n    <div class=\"wrapper\">\n      <input type=\"text\" name=\"searchStream\" id=\"\"\n        class=\"input orders-search\"\n        placeholder=\"Search in customers...\"\n        #searchControl\n        [formControl]=\"searchStream\"\n        [(ngModel)]=\"searchQuery\"\n      >\n        \n      \n      <table class=\"table table-customers\">\n        <thead>\n          <th>ID</th>\n          <th>Name</th>\n          <th>Last name</th>\n          <th>Phone</th>\n          <th>City</th>\n          <th>Post</th>\n          <th>Email</th>\n          <th>Comment</th>\n        </thead>\n        <tbody>\n          <tr\n            *ngFor=\"let customer of customers$ | async\"\n          >\n            <td\n              *ngFor=\"let key of customer | keys\"\n            >\n              {{ customer[key] }}\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      \n      <pagination\n        [total]=\"filteredCustomers$ | async\"\n        [length]=\"pageLength\"\n        [current]=\"page\"\n        (dataChanged)=\"paginationChanged($event)\"\n      >\n      </pagination>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [index_1.CustomerService,
        store_1.Store])
], Customers);
exports.Customers = Customers;
//# sourceMappingURL=customers.js.map