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
require("rxjs/add/operator/do");
require("rxjs/add/observable/of");
var api_service_1 = require("./api.service");
var store_helper_service_1 = require("./store-helper.service");
var search_service_1 = require("./search.service");
var index_1 = require("../models/index");
var OrderService = /** @class */ (function () {
    function OrderService(api, storeHelper, searchService) {
        this.api = api;
        this.storeHelper = storeHelper;
        this.searchService = searchService;
        this.ordersPath = index_1.STATIC_DATA.ordersPath;
        this.productsPath = index_1.STATIC_DATA.orderItemsPath;
        this.totalSumField = 'totalSum';
    }
    OrderService.prototype.purgeStore = function () {
        this.storeHelper.update(this.ordersPath, []);
    };
    // Manage orders
    OrderService.prototype.getOrders = function (start, length) {
        var _this = this;
        return this.api.get("/" + this.ordersPath + "?pageNumber=" + start + "&pageCapacity=" + length)
            .do(function (resp) {
            _this.storeHelper.update('order', resp.elements);
        });
    };
    OrderService.prototype.addOrder = function () {
        var _this = this;
        var newOrder = new index_1.Order();
        var newOrderId = newOrder.id;
        var newOrderItemId = newOrder[this.productsPath][0].id;
        this.storeHelper.add(this.ordersPath, newOrder);
        return this.api.post(this.ordersPath)
            .do(function (response) {
            _this.storeHelper.findAndUpdate(_this.ordersPath, newOrderId, 'id', response.orderId);
            _this.storeHelper.findDeepAndUpdate(_this.ordersPath, response.orderId, _this.productsPath, newOrderItemId, 'id', response.orderItemId);
        });
    };
    OrderService.prototype.deleteOrder = function (orderId) {
        this.storeHelper.findAndDelete(this.ordersPath, orderId);
        return this.api.apiDelete(this.ordersPath + "/" + orderId);
    };
    OrderService.prototype.filterOrders = function (page, pageLength, filters) {
        var _this = this;
        var payload = {};
        for (var key in filters) {
            if (filters[key] && filters.hasOwnProperty(key)) {
                if (key.toLowerCase().indexOf('date') !== -1) {
                    payload[key] = filters[key] + "T00:00:00";
                }
                else {
                    payload[key] = filters[key];
                }
            }
        }
        payload['paging'] = {
            page: page - 1,
            size: pageLength
        };
        return this.api.put("/" + this.ordersPath + "/filter", payload)
            .do(function (response) {
            _this.storeHelper.update('order', response.elements);
        });
    };
    // Manage order info
    // Changing order info common field (e.g., firstName, phoneNumber)
    OrderService.prototype.updateInfoField = function (orderId, fieldName, value) {
        return this.api.put(this.ordersPath + "/" + orderId, (_a = {},
            _a[fieldName] = value.replace(/^\s+|\s+$/g, ''),
            _a));
        var _a;
    };
    // Changing order info INPUT (e.g., Status, Payment type)
    OrderService.prototype.updateInfoInput = function (orderId, fieldName, value) {
        this.storeHelper.findAndUpdate(this.ordersPath, orderId, fieldName, value);
        return this.api.put(this.ordersPath + "/" + orderId, (_a = {},
            _a[fieldName] = value,
            _a));
        var _a;
    };
    OrderService.prototype.autocompleteInfo = function (orderId, object) {
        this.storeHelper.findAndUpdateWithObject(this.ordersPath, orderId, object);
        return this.api.put(this.ordersPath + "/" + orderId, {
            customerId: object.customerId
        });
    };
    // Manage products
    OrderService.prototype.addProduct = function (orderId) {
        var _this = this;
        var newProduct = new index_1.Product();
        var newProductId = newProduct.id;
        this.storeHelper.findDeepAndAdd(this.ordersPath, orderId, this.productsPath, newProduct);
        return this.api.post("order-item/create-empty-for/" + orderId)
            .do(function (productId) { return _this.storeHelper.findDeepAndUpdate(_this.ordersPath, orderId, _this.productsPath, newProductId, 'id', productId); });
    };
    // Changing order item editable field (e.g., name, price)
    OrderService.prototype.updateProductField = function (orderId, productId, fieldName, value) {
        var _this = this;
        return this.api.put("order-item/" + productId, (_a = {},
            _a[fieldName] = value.replace(/^\s+|\s+$/g, ''),
            _a)).do(function (data) {
            if (data && typeof data === 'number') {
                _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, _this.totalSumField, data);
            }
        });
        var _a;
    };
    // Changing order item INPUT (quantity)
    OrderService.prototype.updateProductInput = function (orderId, productId, fieldName, value) {
        var _this = this;
        this.storeHelper.findDeepAndUpdate(this.ordersPath, orderId, this.productsPath, productId, fieldName, value);
        return this.api.put("order-item/" + productId, (_a = {},
            _a[fieldName] = value,
            _a))
            .do(function (data) {
            if (data && typeof data === 'number') {
                _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, _this.totalSumField, data);
            }
        });
        var _a;
    };
    OrderService.prototype.autocompleteProduct = function (orderId, productId, data) {
        var _this = this;
        data['quantity'] = 1;
        this.storeHelper.findDeepAndUpdateWithObject(this.ordersPath, orderId, this.productsPath, productId, data);
        var productIdName = data.productVariationId ? 'productVariationId' : 'productId';
        return this.api.put("order-item/" + productId, (_a = {},
            _a[productIdName] = data[productIdName],
            _a)).do(function (data) {
            if (data && typeof data === 'number') {
                _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, _this.totalSumField, data);
            }
        });
        var _a;
    };
    OrderService.prototype.deleteProduct = function (orderId, productId) {
        this.storeHelper.findDeepAndDelete(this.ordersPath, orderId, this.productsPath, productId);
        return this.api.apiDelete("order-item/" + productId);
    };
    // Manage CustomersComponent
    OrderService.prototype.getCustomer = function (customerId) {
        return this.api.get("customer/" + customerId);
    };
    OrderService.prototype.saveCustomer = function (customerId, customerInfo) {
        return this.api.put("customer/" + customerId, customerInfo);
    };
    OrderService.prototype.persistCustomer = function (orderId) {
        var _this = this;
        return this.api.post("customer/persist-customer-from-order/" + orderId)
            .do(function (customerId) {
            _this.storeHelper.findAndUpdate(_this.ordersPath, orderId, 'customerId', customerId);
        });
    };
    OrderService.prototype.list = function (searchQuery, page, length) {
        if (searchQuery === void 0) { searchQuery = ''; }
        if (page === void 0) { page = 1; }
        if (length === void 0) { length = 10; }
        var orderResult = this.searchService.search(this.storeHelper.get(this.ordersPath), searchQuery);
        var orderResultPage = orderResult.slice(0, length);
        return Observable_1.Observable.of({
            orders: orderResultPage,
            filtered: orderResult.length
        });
    };
    OrderService.prototype.requestAutocomplete = function (types, term) {
        if (types[1] === 'customerLastName' || types[1] === 'customerFirstName') {
            return this.api.get("customer/autocomplete-by-last-name-mask/" + term);
        }
        else if (types[1] === 'customerPhoneNumber') {
            return this.api.get("customer/autocomplete-by-phone-number-mask/" + term);
        }
        else if (types[1] === 'destinationCity') {
            return this.api.get("customer/autocomplete-by-city-mask/" + term);
        }
        else if (types[0] === 'product') {
            return this.api.get("order-item/autocomplete-by-product-name/" + term);
        }
    };
    OrderService.prototype.camelCaseToDash = function (str) {
        return str.replace(/([A-Z])/g, function (g) { return "-" + g[0].toLowerCase(); });
    };
    // @TODO remove this
    OrderService.prototype.getStore = function () {
        this.storeHelper.onGetState();
    };
    OrderService.prototype.getAllOrders = function () {
        return this.api.get(this.ordersPath + "?start=0&length=10000");
    };
    OrderService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService,
            store_helper_service_1.StoreHelper,
            search_service_1.SearchService])
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL29yZGVycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDhDQUE2QztBQUM3QyxnQ0FBOEI7QUFDOUIsa0NBQWdDO0FBRWhDLDZDQUEyQztBQUMzQywrREFBcUQ7QUFDckQsbURBQWlEO0FBQ2pELHlDQUE4RDtBQUk5RDtJQUtFLHNCQUNVLEdBQWUsRUFDZixXQUF3QixFQUN4QixhQUE0QjtRQUY1QixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFQdEMsZUFBVSxHQUFjLG1CQUFXLENBQUMsVUFBVSxDQUFDO1FBQy9DLGlCQUFZLEdBQVksbUJBQVcsQ0FBQyxjQUFjLENBQUM7UUFDbkQsa0JBQWEsR0FBVyxVQUFVLENBQUM7SUFNaEMsQ0FBQztJQUVKLGlDQUFVLEdBQVY7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFHRCxnQkFBZ0I7SUFDaEIsZ0NBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxNQUFjO1FBQXZDLGlCQUtDO1FBSkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQUksSUFBSSxDQUFDLFVBQVUsb0JBQWUsS0FBSyxzQkFBaUIsTUFBUSxDQUFDO2FBQ2xGLEVBQUUsQ0FBQyxVQUFBLElBQUk7WUFDTixLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJDLElBQUksUUFBUSxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7UUFDM0IsSUFBSSxVQUFVLEdBQUcsUUFBUSxD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Q0FBQyxDQUFDLENBQUMsV0FBVyxFQUFJLEVBQXhCLENBQXdCLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBSUQsb0JBQW9CO0lBQ3BCLCtCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxtQ0FBWSxHQUFaO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxVQUFVLDBCQUF1QixDQUFDLENBQUM7SUFDakUsQ0FBQztJQW5PVSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7eUNBT0ksd0JBQVU7WUFDRixrQ0FBVztZQUNULDhCQUFhO09BUjNCLFlBQVksQ0FvT3hCO0lBQUQsbUJBQUM7Q0FwT0QsQUFvT0MsSUFBQTtBQXBPWSxvQ0FBWSIsImZpbGUiOiJzZXJ2aWNlcy9vcmRlcnMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7XHJcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9vZic7XHJcblxyXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi9hcGkuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0b3JlSGVscGVyIH0gZnJvbSAnLi9zdG9yZS1oZWxwZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3JkZXIsIFByb2R1Y3QsIFNUQVRJQ19EQVRBIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBPcmRlclNlcnZpY2Uge1xyXG4gIG9yZGVyc1BhdGggICA6IHN0cmluZyA9IFNUQVRJQ19EQVRBLm9yZGVyc1BhdGg7XHJcbiAgcHJvZHVjdHNQYXRoIDogc3RyaW5nID0gU1RBVElDX0RBVEEub3JkZXJJdGVtc1BhdGg7XHJcbiAgdG90YWxTdW1GaWVsZDogc3RyaW5nID0gJ3RvdGFsU3VtJztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFwaTogQXBpU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmVIZWxwZXI6IFN0b3JlSGVscGVyLFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBwdXJnZVN0b3JlKCkge1xyXG4gICAgdGhpcy5zdG9yZUhlbHBlci51cGRhdGUodGhpcy5vcmRlcnNQYXRoLCBbXSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gTWFuYWdlIG9yZGVyc1xyXG4gIGdldE9yZGVycyhzdGFydDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KGAvJHt0aGlzLm9yZGVyc1BhdGh9P3BhZ2VOdW1iZXI9JHtzdGFydH0mcGFnZUNhcGFjaXR5PSR7bGVuZ3RofWApXHJcbiAgICAgIC5kbyhyZXNwID0+IHtcclxuICAgICAgICB0aGlzLnN0b3JlSGVscGVyLnVwZGF0ZSgnb3JkZXInLCByZXNwLmVsZW1lbnRzKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRPcmRlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IG5ld09yZGVyID0gbmV3IE9yZGVyKCk7XHJcbiAgICBsZXQgbmV3T3JkZXJJZCA9IG5ld09yZGVyLmlkO1xyXG4gICAgbGV0IG5ld09yZGVySXRlbUlkID0gbmV3T3JkZXJbdGhpcy5wcm9kdWN0c1BhdGhdWzBdLmlkO1xyXG4gICAgdGhpcy5zdG9yZUhlbHBlci5hZGQodGhpcy5vcmRlcnNQYXRoLCBuZXdPcmRlcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3QodGhpcy5vcmRlcnNQYXRoKVxyXG4gICAgICAuZG8ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIHRoaXMuc3RvcmVIZWxwZXIuZmluZEFuZFVwZGF0ZSh0aGlzLm9yZGVyc1BhdGgsIG5ld09yZGVySWQsICdpZCcsIHJlc3BvbnNlLm9yZGVySWQpO1xyXG4gICAgICAgIHRoaXMuc3RvcmVIZWxwZXIuZmluZERlZXBBbmRVcGRhdGUoXHJcbiAgICAgICAgICB0aGlzLm9yZGVyc1BhdGgsIHJlc3BvbnNlLm9yZGVySWQsIHRoaXMucHJvZHVjdHNQYXRoLFxyXG4gICAgICAgICAgbmV3T3JkZXJJdGVtSWQsICdpZCcsIHJlc3BvbnNlLm9yZGVySXRlbUlkXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVPcmRlcihvcmRlcklkKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHRoaXMuc3RvcmVIZWxwZXIuZmluZEFuZERlbGV0ZSh0aGlzLm9yZGVyc1BhdGgsIG9yZGVySWQpO1xyXG4gICAgcmV0dXJuIHRoaXMuYXBpLmFwaURlbGV0ZShgJHt0aGlzLm9yZGVyc1BhdGh9LyR7b3JkZXJJZH1gKTtcclxuICB9XHJcblxyXG4gIGZpbHRlck9yZGVycyhwYWdlLCBwYWdlTGVuZ3RoLCBmaWx0ZXJzKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBwYXlsb2FkID0ge307XHJcblxyXG4gICAgZm9yIChsZXQga2V5IGluIGZpbHRlcnMpIHtcclxuICAgICAgaWYgKGZpbHRlcnNba2V5XSAmJiBmaWx0ZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZGF0ZScpICE9PSAtMSkge1xyXG4gICAgICAgICAgcGF5bG9hZFtrZXldID0gYCR7ZmlsdGVyc1trZXldfVQwMDowMDowMGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHBheWxvYWRba2V5XSA9IGZpbHRlcnNba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwYXlsb2FkWydwYWdpbmcnXSA9IHtcclxuICAgICAgcGFnZTogcGFnZSAtIDEsXHJcbiAgICAgIHNpemU6IHBhZ2VMZW5ndGhcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXBpLnB1dChgLyR7dGhpcy5vcmRlcnNQYXRofS9maWx0ZXJgLCBwYXlsb2FkKVxyXG4gICAgICAuZG8ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIHRoaXMuc3RvcmVIZWxwZXIudXBkYXRlKCdvcmRlcicsIHJlc3BvbnNlLmVsZW1lbnRzKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gIC8vIE1hbmFnZSBvcmRlciBpbmZvXHJcblxyXG4gIC8vIENoYW5naW5nIG9yZGVyIGluZm8gY29tbW9uIGZpZWxkIChlLmcuLCBmaXJzdE5hbWUsIHBob25lTnVtYmVyKVxyXG4gIHVwZGF0ZUluZm9GaWVsZChvcmRlcklkLCBmaWVsZE5hbWUsIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcGkucHV0KGAke3RoaXMub3JkZXJzUGF0aH0vJHtvcmRlcklkfWAsIHtcclxuICAgICAgICBbZmllbGROYW1lXTogdmFsdWUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hhbmdpbmcgb3JkZXIgaW5mbyBJTlBVVCAoZS5nLiwgU3RhdHVzLCBQYXltZW50IHR5cGUpXHJcbiAgdXBkYXRlSW5mb0lucHV0KG9yZGVySWQsIGZpZWxkTmFtZSwgdmFsdWUpIHtcclxuICAgIHRoaXMuc3RvcmVIZWxwZXIuZmluZEFuZFVwZGF0ZSh0aGlzLm9yZGVyc1BhdGgsIG9yZGVySWQsIGZpZWxkTmFtZSwgdmFsdWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmFwaS5wdXQoYCR7dGhpcy5vcmRlcnNQYXRofS8ke29yZGVySWR9YCwge1xyXG4gICAgICBbZmllbGROYW1lXTogdmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXV0b2NvbXBsZXRlSW5mbyhvcmRlcklkLCBvYmplY3QpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgdGhpcy5zdG9yZUhlbHBlci5maW5kQW5kVXBkYXRlV2l0aE9iamVjdCh0aGlzLm9yZGVyc1BhdGgsIG9yZGVySWQsIG9iamVjdCk7XHJcbiAgICByZXR1cm4gdGhpcy5hcGkucHV0KGAke3RoaXMub3JkZXJzUGF0aH0vJHtvcmRlcklkfWAsIHtcclxuICAgICAgY3VzdG9tZXJJZDogb2JqZWN0LmN1c3RvbWVySWRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICAvLyBNYW5hZ2UgcHJvZHVjdHNcclxuICBhZGRQcm9kdWN0KG9yZGVySWQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgbGV0IG5ld1Byb2R1Y3QgPSBuZXcgUHJvZHVjdCgpO1xyXG4gICAgbGV0IG5ld1Byb2R1Y3RJZCA9IG5ld1Byb2R1Y3QuaWQ7XHJcblxyXG4gICAgdGhpcy5zdG9yZUhlbHBlci5maW5kRGVlcEFuZEFkZCh0aGlzLm9yZGVyc1BhdGgsIG9yZGVySWQsIHRoaXMucHJvZHVjdHNQYXRoLCBuZXdQcm9kdWN0KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdChgb3JkZXItaXRlbS9jcmVhdGUtZW1wdHktZm9yLyR7b3JkZXJJZH1gKVxyXG4gICAgICAuZG8ocHJvZHVjdElkID0+IHRoaXMuc3RvcmVIZWxwZXIuZmluZERlZXBBbmRVcGRhdGUoXHJcbiAgICAgICAgICB0aGlzLm9yZGVyc1BhdGgsIG9yZGVySWQsIHRoaXMucHJvZHVjdHNQYXRoLFxyXG4gICAgICAgICAgbmV3UHJvZHVjdElkLCAnaWQnLCBwcm9kdWN0SWQpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBDaGFuZ2luZyBvcmRlciBpdGVtIGVkaXRhYmxlIGZpZWxkIChlLmcuLCBuYW1lLCBwcmljZSlcclxuICB1cGRhdGVQcm9kdWN0RmllbGQob3JkZXJJZCwgcHJvZHVjdElkLCBmaWVsZE5hbWUsIHZhbHVlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5hcGkucHV0KGBvcmRlci1pdGVtLyR7cHJvZHVjdElkfWAsIHtcclxuICAgICAgW2ZpZWxkTmFtZV06IHZhbHVlLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxyXG4gICAgfSkuZG8oXHJcbiAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZUhlbHBlci5maW5kQW5kVXBkYXRlKHRoaXMub3JkZXJzUGF0aCwgb3JkZXJJZCwgdGhpcy50b3RhbFN1bUZpZWxkLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8gQ2hhbmdpbmcgb3JkZXIgaXRlbSBJTlBVVCAocXVhbnRpdHkpXHJcbiAgdXBkYXRlUHJvZHVjdElucHV0KG9yZGVySWQsIHByb2R1Y3RJZCwgZmllbGROYW1lLCB2YWx1ZSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICB0aGlzLnN0b3JlSGVscGVyLmZpbmREZWVwQW5kVXBkYXRlKFxyXG4gICAgICB0aGlzLm9yZGVyc1BhdGgsIG9yZGVySWQsIHRoaXMucHJvZHVjdHNQYXRoLFxyXG4gICAgICBwcm9kdWN0SWQsIGZpZWxkTmFtZSwgdmFsdWVcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXBpLnB1dChgb3JkZXItaXRlbS8ke3Byb2R1Y3RJZH1gLCB7XHJcbiAgICAgIFtmaWVsZE5hbWVdOiB2YWx1ZVxyXG4gICAgfSlcclxuICAgICAgLmRvKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZUhlbHBlci5maW5kQW5kVXBkYXRlKHRoaXMub3JkZXJzUGF0aCwgb3JkZXJJZCwgdGhpcy50b3RhbFN1bUZpZWxkLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXV0b2NvbXBsZXRlUHJvZHVjdChvcmRlcklkLCBwcm9kdWN0SWQsIGRhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgZGF0YVsncXVhbnRpdHknXSA9IDE7XHJcbiAgICB0aGlzLnN0b3JlSGVscGVyLmZpbmREZWVwQW5kVXBkYXRlV2l0aE9iamVjdCh0aGlzLm9yZGVyc1BhdGgsIG9yZGVySWQsIHRoaXMucHJvZHVjdHNQYXRoLCBwcm9kdWN0SWQsIGRhdGEpO1xyXG5cclxuICAgIGxldCBwcm9kdWN0SWROYW1lID0gZGF0YS5wcm9kdWN0VmFyaWF0aW9uSWQgPyAncHJvZHVjdFZhcmlhdGlvbklkJyA6ICdwcm9kdWN0SWQnO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmFwaS5wdXQoYG9yZGVyLWl0ZW0vJHtwcm9kdWN0SWR9YCwge1xyXG4gICAgICBbcHJvZHVjdElkTmFtZV06IGRhdGFbcHJvZHVjdElkTmFtZV1cclxuICAgIH0pLmRvKGRhdGEgPT4ge1xyXG4gICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICB0aGlzLnN0b3JlSGVscGVyLmZpbmRBbmRVcGRhdGUodGhpcy5vcmRlcnNQYXRoLCBvcmRlcklkLCB0aGlzLnRvdGFsU3VtRmllbGQsIGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZVByb2R1Y3Qob3JkZXJJZCwgcHJvZHVjdElkKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHRoaXMuc3RvcmVIZWxwZXIuZmluZERlZXBBbmREZWxldGUodGhpcy5vcmRlcnNQYXRoLCBvcmRlcklkLCB0aGlzLnByb2R1Y3RzUGF0aCwgcHJvZHVjdElkKTtcclxuICAgIHJldHVybiB0aGlzLmFwaS5hcGlEZWxldGUoYG9yZGVyLWl0ZW0vJHtwcm9kdWN0SWR9YCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICAvLyBNYW5hZ2UgQ3VzdG9tZXJzQ29tcG9uZW50XHJcbiAgZ2V0Q3VzdG9tZXIoY3VzdG9tZXJJZCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KGBjdXN0b21lci8ke2N1c3RvbWVySWR9YCk7XHJcbiAgfVxyXG4gIHNhdmVDdXN0b21lcihjdXN0b21lcklkLCBjdXN0b21lckluZm8pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXBpLnB1dChgY3VzdG9tZXIvJHtjdXN0b21lcklkfWAsIGN1c3RvbWVySW5mbyk7XHJcbiAgfVxyXG4gIHBlcnNpc3RDdXN0b21lcihvcmRlcklkKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0KGBjdXN0b21lci9wZXJzaXN0LWN1c3RvbWVyLWZyb20tb3JkZXIvJHtvcmRlcklkfWApXHJcbiAgICAgIC5kbyhjdXN0b21lcklkID0+IHtcclxuICAgICAgICB0aGlzLnN0b3JlSGVscGVyLmZpbmRBbmRVcGRhdGUodGhpcy5vcmRlcnNQYXRoLCBvcmRlcklkLCAnY3VzdG9tZXJJZCcsIGN1c3RvbWVySWQpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG4gIGxpc3Qoc2VhcmNoUXVlcnk6IHN0cmluZyA9ICcnLCBwYWdlOiBudW1iZXIgPSAxLCBsZW5ndGg6IG51bWJlciA9IDEwKSB7XHJcbiAgICBsZXQgb3JkZXJSZXN1bHQgPSB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHRoaXMuc3RvcmVIZWxwZXIuZ2V0KHRoaXMub3JkZXJzUGF0aCksIHNlYXJjaFF1ZXJ5KTtcclxuXHJcbiAgICBsZXQgb3JkZXJSZXN1bHRQYWdlID0gb3JkZXJSZXN1bHQuc2xpY2UoMCwgbGVuZ3RoKTtcclxuXHJcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih7XHJcbiAgICAgIG9yZGVyczogb3JkZXJSZXN1bHRQYWdlLFxyXG4gICAgICBmaWx0ZXJlZDogb3JkZXJSZXN1bHQubGVuZ3RoXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RBdXRvY29tcGxldGUodHlwZXM6IHN0cmluZ1tdLCB0ZXJtOiBzdHJpbmcpIHtcclxuICAgIGlmICh0eXBlc1sxXSA9PT0gJ2N1c3RvbWVyTGFzdE5hbWUnIHx8IHR5cGVzWzFdID09PSAnY3VzdG9tZXJGaXJzdE5hbWUnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFwaS5nZXQoYGN1c3RvbWVyL2F1dG9jb21wbGV0ZS1ieS1sYXN0LW5hbWUtbWFzay8ke3Rlcm19YCk7XHJcblxyXG4gICAgfSBlbHNlIGlmICh0eXBlc1sxXSA9PT0gJ2N1c3RvbWVyUGhvbmVOdW1iZXInKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFwaS5nZXQoYGN1c3RvbWVyL2F1dG9jb21wbGV0ZS1ieS1waG9uZS1udW1iZXItbWFzay8ke3Rlcm19YCk7XHJcblxyXG4gICAgfSBlbHNlIGlmICh0eXBlc1sxXSA9PT0gJ2Rlc3RpbmF0aW9uQ2l0eScpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYXBpLmdldChgY3VzdG9tZXIvYXV0b2NvbXBsZXRlLWJ5LWNpdHktbWFzay8ke3Rlcm19YCk7XHJcblxyXG4gICAgfSBlbHNlIGlmICh0eXBlc1swXSA9PT0gJ3Byb2R1Y3QnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFwaS5nZXQoYG9yZGVyLWl0ZW0vYXV0b2NvbXBsZXRlLWJ5LXByb2R1Y3QtbmFtZS8ke3Rlcm19YCk7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjYW1lbENhc2VUb0Rhc2goc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbQS1aXSkvZywgKGcpID0+IGAtJHtnWzBdLnRvTG93ZXJDYXNlKCl9YCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIC8vIEBUT0RPIHJlbW92ZSB0aGlzXHJcbiAgZ2V0U3RvcmUoKSB7XHJcbiAgICB0aGlzLnN0b3JlSGVscGVyLm9uR2V0U3RhdGUoKTtcclxuICB9XHJcblxyXG4gIGdldEFsbE9yZGVycygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChgJHt0aGlzLm9yZGVyc1BhdGh9P3N0YXJ0PTAmbGVuZ3RoPTEwMDAwYCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
