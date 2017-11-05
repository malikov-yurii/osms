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
var ProductService = /** @class */ (function () {
    function ProductService(api, storeHelper, searchService) {
        this.api = api;
        this.storeHelper = storeHelper;
        this.searchService = searchService;
        this.productsPath = 'product';
        this.aggregatorsPath = 'aggregators';
    }
    ProductService.prototype.getAllProducts = function () {
        var _this = this;
        return this.api.get(this.productsPath + "?pageNumber=0&pageCapacity=10000")
            .do(function (_a) {
            var totalElements = _a.totalElements, elements = _a.elements, productAggregators = _a.productAggregators;
            elements.sort(function (a, b) { return a.id - b.id; });
            elements = elements.map(function (el) {
                el.categories = el.categories.join('; ');
                return el;
            });
            _this.storeHelper.update(_this.productsPath, elements);
            _this.storeHelper.update(_this.aggregatorsPath, productAggregators);
        });
    };
    ProductService.prototype.list = function (searchQuery, page, length, filterData) {
        var searchResult = this.searchService.search(this.storeHelper.get(this.productsPath), searchQuery);
        var filterResult = searchResult.filter(function (product) {
            var flag = 0;
            for (var prop in filterData) {
                if (filterData.hasOwnProperty(prop)) {
                    if (product[prop]) {
                        if (product[prop].indexOf(filterData[prop]) > -1) {
                            flag++;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        flag++;
                    }
                }
            }
            return flag === Object.keys(filterData).length;
        });
        var productResultPage = filterResult.slice((page - 1) * length, page * length);
        return Observable.of({
            products: productResultPage,
            filtered: filterResult.length
        });
    };
    ProductService.prototype.updateField = function (id, variationId, body, isAggregator) {
        var path = isAggregator ? 'product-aggregator' : this.productsPath;
        if (variationId !== 0) {
            body['variationId'] = variationId;
        }
        return this.api.put(path + "/" + id, body);
    };
    ProductService.prototype.purgeStore = function () {
        this.storeHelper.update(this.productsPath, []);
    };
    ProductService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ApiService,
            StoreHelper,
            SearchService])
    ], ProductService);
    return ProductService;
}());
export { ProductService };
