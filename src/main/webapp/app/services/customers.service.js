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
    CustomerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [index_1.ApiService,
            index_1.StoreHelper,
            index_1.SearchService])
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2N1c3RvbWVycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDhDQUE2QztBQUU3QyxpQ0FBaUU7QUFHakU7SUFJRSx5QkFDVSxHQUFlLEVBQ2YsV0FBd0IsRUFDeEIsYUFBNEI7UUFGNUIsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTDlCLGtCQUFhLEdBQVcsVUFBVSxDQUFDO0lBTXhDLENBQUM7SUFFSix5Q0FBZSxHQUFmO1FBQUEsaUJBTUM7UUFMQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLGFBQWEscUNBQWtDLENBQUM7YUFDekUsRUFBRSxDQUFDLFVBQUMsRUFBeUI7Z0JBQXhCLGdDQUFhLEVBQUUsc0JBQVE7WUFDM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUM7WUFDckMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCw4QkFBSSxHQUFKLFVBQUssV0FBd0IsRUFBRSxJQUFnQixFQUFFLE1BQW1CO1FBQS9ELDRCQUFBLEVBQUEsZ0JBQXdCO1FBQUUscUJBQUEsRUFBQSxRQUFnQjtRQUFFLHVCQUFBLEVBQUEsV0FBbUI7UUFDbEUsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXRHLElBQUksa0JBQWtCLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBRWxGLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQztZQUNuQixTQUFTLEVBQUUsa0JBQWtCO1lBQzdCLFFBQVEsRUFBRSxjQUFjLENBQUMsTUFBTTtTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQWhDVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBTUksa0JBQVU7WUFDRixtQkFBVztZQUNULHFCQUFhO09BUDNCLGVBQWUsQ0FrQzNCO0lBQUQsc0JBQUM7Q0FsQ0QsQUFrQ0MsSUFBQTtBQWxDWSwwQ0FBZSIsImZpbGUiOiJzZXJ2aWNlcy9jdXN0b21lcnMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlLCBTdG9yZUhlbHBlciwgU2VhcmNoU2VydmljZSB9IGZyb20gJy4vaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJTZXJ2aWNlIHtcblxuICBwcml2YXRlIGN1c3RvbWVyc1BhdGg6IHN0cmluZyA9ICdjdXN0b21lcic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9yZUhlbHBlcjogU3RvcmVIZWxwZXIsXG4gICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlXG4gICkge31cblxuICBnZXRBbGxDdXN0b21lcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChgJHt0aGlzLmN1c3RvbWVyc1BhdGh9P3BhZ2VOdW1iZXI9MCZwYWdlQ2FwYWNpdHk9MTAwMDBgKVxuICAgICAgLmRvKCh7dG90YWxFbGVtZW50cywgZWxlbWVudHN9KSA9PiB7XG4gICAgICAgIGVsZW1lbnRzLnNvcnQoKGEsIGIpID0+IGEuaWQgLSBiLmlkKTtcbiAgICAgICAgdGhpcy5zdG9yZUhlbHBlci51cGRhdGUodGhpcy5jdXN0b21lcnNQYXRoLCBlbGVtZW50cyk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgbGlzdChzZWFyY2hRdWVyeTogc3RyaW5nID0gJycsIHBhZ2U6IG51bWJlciA9IDEsIGxlbmd0aDogbnVtYmVyID0gMTApIHtcbiAgICBsZXQgY3VzdG9tZXJSZXN1bHQgPSB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHRoaXMuc3RvcmVIZWxwZXIuZ2V0KHRoaXMuY3VzdG9tZXJzUGF0aCksIHNlYXJjaFF1ZXJ5KTtcblxuICAgIGxldCBjdXN0b21lclJlc3VsdFBhZ2UgPSBjdXN0b21lclJlc3VsdC5zbGljZSgocGFnZSAtIDEpICogbGVuZ3RoLCBwYWdlICogbGVuZ3RoKTtcblxuICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHtcbiAgICAgIGN1c3RvbWVyczogY3VzdG9tZXJSZXN1bHRQYWdlLFxuICAgICAgZmlsdGVyZWQ6IGN1c3RvbWVyUmVzdWx0Lmxlbmd0aFxuICAgIH0pO1xuICB9XG5cbiAgcHVyZ2VTdG9yZSgpIHtcbiAgICB0aGlzLnN0b3JlSGVscGVyLnVwZGF0ZSh0aGlzLmN1c3RvbWVyc1BhdGgsIFtdKTtcbiAgfVxuXG59XG4iXX0=
