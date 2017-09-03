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
var index_1 = require("./index");
var CustomerService = (function () {
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
            var totalElements = _a.totalElements, elements = _a.elements;
            elements.sort(function (a, b) { return a.id - b.id; });
            _this.storeHelper.update(_this.customersPath, elements);
        });
    };
    CustomerService.prototype.list = function (searchQuery, page, length) {
        if (searchQuery === void 0) { searchQuery = ''; }
        if (page === void 0) { page = 1; }
        if (length === void 0) { length = 10; }
        var customerResult = this.searchService.search(this.storeHelper.get(this.customersPath), searchQuery);
        var customerResultPage = customerResult.slice((page - 1) * length, page * length);
        return Observable_1.Observable.of({
            customers: customerResultPage,
            filtered: customerResult.length
        });
    };
    CustomerService.prototype.purgeStore = function () {
        this.storeHelper.update(this.customersPath, []);
    };
    return CustomerService;
}());
CustomerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [index_1.ApiService,
        index_1.StoreHelper,
        index_1.SearchService])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customers.js.map