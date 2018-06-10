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
import { Observable } from 'rxjs/Observable';
import { ApiService, StoreHelper, SearchService } from './index';
var CustomerService = /** @class */ (function () {
    function CustomerService(api, storeHelper, searchService) {
        this.api = api;
        this.storeHelper = storeHelper;
        this.searchService = searchService;
        this.customersPath = 'customer';
    }
    CustomerService.prototype.getAllCustomers = function () {
        var _this = this;
        return this.api.get(this.customersPath + "?pageNumber=0&pageCapacity=10000")
            .do(function (_a) {
            var totalElements = _a.totalElements, content = _a.content;
            content.sort(function (a, b) { return a.customerId - b.customerId; });
            _this.storeHelper.update(_this.customersPath, content);
        });
    };
    CustomerService.prototype.list = function (searchQuery, page, length) {
        if (searchQuery === void 0) { searchQuery = ''; }
        if (page === void 0) { page = 1; }
        if (length === void 0) { length = 10; }
        var customerResult = this.searchService.search(this.storeHelper.get(this.customersPath), searchQuery, ['customerFirstName', 'customerLastName', 'customerEmail', 'customerNote', 'customerPhoneNumber', 'customerCity']);
        var customerResultPage = customerResult.slice((page - 1) * length, page * length);
        return Observable.of({
            customers: customerResultPage,
            filtered: customerResult.length
        });
    };
    CustomerService.prototype.purgeStore = function () {
        this.storeHelper.update(this.customersPath, []);
    };
    CustomerService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ApiService,
            StoreHelper,
            SearchService])
    ], CustomerService);
    return CustomerService;
}());
export { CustomerService };
