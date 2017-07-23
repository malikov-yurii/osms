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
var ProductService = (function () {
    function ProductService(api, storeHelper, searchService) {
        this.api = api;
        this.storeHelper = storeHelper;
        this.searchService = searchService;
        this.productsPath = 'product';
    }
    ProductService.prototype.getAllProducts = function () {
        var _this = this;
        return this.api.get(this.productsPath + "?pageNumber=0&pageCapacity=10000")
            .do(function (_a) {
            var totalElements = _a.totalElements, elements = _a.elements;
            elements.sort(function (a, b) { return a.id - b.id; });
            _this.storeHelper.update(_this.productsPath, elements);
        });
    };
    ProductService.prototype.list = function (searchQuery, page, length, filterData) {
        var searchResult = this.searchService.search(this.storeHelper.get(this.productsPath), searchQuery);
        var filterResult = searchResult.filter(function (product) {
            if (product[filterData.label]) {
                if (product[filterData.label].indexOf(filterData.data) > -1) {
                    return true;
                }
            }
            else {
                return true;
            }
        });
        var productResultPage = filterResult.slice((page - 1) * length, page * length);
        return Observable_1.Observable.of({
            products: productResultPage,
            filtered: filterResult.length
        });
    };
    ProductService.prototype.updateProductField = function (productId, productVarId, body) {
        if (productVarId !== 0) {
            body['variationId'] = productVarId;
        }
        this.api.put(this.productsPath + "/" + productId, body, true).subscribe();
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [index_1.ApiService,
        index_1.StoreHelper,
        index_1.SearchService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=products.js.map