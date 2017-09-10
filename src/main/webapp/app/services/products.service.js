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
var ProductService = /** @class */ (function () {
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
            elements = elements.map(function (el) {
                el.categories = el.categories.join('; ');
                return el;
            });
            _this.storeHelper.update(_this.productsPath, elements);
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
            return flag === Object.keys(filterData).length ? true : false;
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
        return this.api.put(this.productsPath + "/" + productId, body);
    };
    ProductService.prototype.purgeStore = function () {
        this.storeHelper.update(this.productsPath, []);
    };
    ProductService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [index_1.ApiService,
            index_1.StoreHelper,
            index_1.SearchService])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3Byb2R1Y3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBRTdDLGlDQUFpRTtBQUdqRTtJQUlFLHdCQUNVLEdBQWUsRUFDZixXQUF3QixFQUN4QixhQUE0QjtRQUY1QixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFMOUIsaUJBQVksR0FBVyxTQUFTLENBQUM7SUFNdEMsQ0FBQztJQUVKLHVDQUFjLEdBQWQ7UUFBQSxpQkFVQztRQVRDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsWUFBWSxxQ0FBa0MsQ0FBQzthQUN4RSxFQUFFLENBQUMsVUFBQyxFQUF5QjtnQkFBeEIsZ0NBQWEsRUFBRSxzQkFBUTtZQUMzQixRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQztZQUNyQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsNkJBQUksR0FBSixVQUFLLFdBQW1CLEVBQUUsSUFBWSxFQUFFLE1BQWMsRUFBRSxVQUFpQjtRQUN2RSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkcsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU87WUFDNUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBRWIsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXBDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqRCxJQUFJLEVBQUUsQ0FBQzt3QkFDVCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUM7d0JBQ2YsQ0FBQztvQkFDSCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksRUFBRSxDQUFDO29CQUNULENBQUM7Z0JBRUgsQ0FBQztZQUNILENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQztRQUUvRSxNQUFNLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUM7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixRQUFRLEVBQUUsWUFBWSxDQUFDLE1BQU07U0FDOUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFrQixHQUFsQixVQUFtQixTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUk7UUFDOUMsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUNyQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxZQUFZLFNBQUksU0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxtQ0FBVSxHQUFWO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBaEVVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FNSSxrQkFBVTtZQUNGLG1CQUFXO1lBQ1QscUJBQWE7T0FQM0IsY0FBYyxDQWtFMUI7SUFBRCxxQkFBQztDQWxFRCxBQWtFQyxJQUFBO0FBbEVZLHdDQUFjIiwiZmlsZSI6InNlcnZpY2VzL3Byb2R1Y3RzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0IHsgQXBpU2VydmljZSwgU3RvcmVIZWxwZXIsIFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL2luZGV4JztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBwcm9kdWN0c1BhdGg6IHN0cmluZyA9ICdwcm9kdWN0JztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFwaTogQXBpU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmVIZWxwZXI6IFN0b3JlSGVscGVyLFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBnZXRBbGxQcm9kdWN0cygpIHtcclxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoYCR7dGhpcy5wcm9kdWN0c1BhdGh9P3BhZ2VOdW1iZXI9MCZwYWdlQ2FwYWNpdHk9MTAwMDBgKVxyXG4gICAgICAuZG8oKHt0b3RhbEVsZW1lbnRzLCBlbGVtZW50c30pID0+IHtcclxuICAgICAgICBlbGVtZW50cy5zb3J0KChhLCBiKSA9PiBhLmlkIC0gYi5pZCk7XHJcbiAgICAgICAgZWxlbWVudHMgPSBlbGVtZW50cy5tYXAoZWwgPT4ge1xyXG4gICAgICAgICAgZWwuY2F0ZWdvcmllcyA9IGVsLmNhdGVnb3JpZXMuam9pbignOyAnKTtcclxuICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0b3JlSGVscGVyLnVwZGF0ZSh0aGlzLnByb2R1Y3RzUGF0aCwgZWxlbWVudHMpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBsaXN0KHNlYXJjaFF1ZXJ5OiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIsIGZpbHRlckRhdGE6IHthbnl9KSB7XHJcbiAgICBsZXQgc2VhcmNoUmVzdWx0ID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCh0aGlzLnN0b3JlSGVscGVyLmdldCh0aGlzLnByb2R1Y3RzUGF0aCksIHNlYXJjaFF1ZXJ5KTtcclxuICAgIGxldCBmaWx0ZXJSZXN1bHQgPSBzZWFyY2hSZXN1bHQuZmlsdGVyKHByb2R1Y3QgPT4ge1xyXG4gICAgICBsZXQgZmxhZyA9IDA7XHJcblxyXG4gICAgICBmb3IgKGxldCBwcm9wIGluIGZpbHRlckRhdGEpIHtcclxuICAgICAgICBpZiAoZmlsdGVyRGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG5cclxuICAgICAgICAgIGlmIChwcm9kdWN0W3Byb3BdKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9kdWN0W3Byb3BdLmluZGV4T2YoZmlsdGVyRGF0YVtwcm9wXSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgIGZsYWcrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZsYWcrKztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmxhZyA9PT0gT2JqZWN0LmtleXMoZmlsdGVyRGF0YSkubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHByb2R1Y3RSZXN1bHRQYWdlID0gZmlsdGVyUmVzdWx0LnNsaWNlKChwYWdlIC0gMSkgKiBsZW5ndGgsIHBhZ2UgKiBsZW5ndGgpO1xyXG5cclxuICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHtcclxuICAgICAgcHJvZHVjdHM6IHByb2R1Y3RSZXN1bHRQYWdlLFxyXG4gICAgICBmaWx0ZXJlZDogZmlsdGVyUmVzdWx0Lmxlbmd0aFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQcm9kdWN0RmllbGQocHJvZHVjdElkLCBwcm9kdWN0VmFySWQsIGJvZHkpIHtcclxuICAgIGlmIChwcm9kdWN0VmFySWQgIT09IDApIHtcclxuICAgICAgYm9keVsndmFyaWF0aW9uSWQnXSA9IHByb2R1Y3RWYXJJZDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmFwaS5wdXQoYCR7dGhpcy5wcm9kdWN0c1BhdGh9LyR7cHJvZHVjdElkfWAsIGJvZHkpO1xyXG4gIH1cclxuXHJcbiAgcHVyZ2VTdG9yZSgpIHtcclxuICAgIHRoaXMuc3RvcmVIZWxwZXIudXBkYXRlKHRoaXMucHJvZHVjdHNQYXRoLCBbXSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
