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
var animations_1 = require("@angular/animations");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/merge");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/share");
require("rxjs/add/operator/pluck");
var store_1 = require("../store");
var index_1 = require("../services/index");
var Products = (function () {
    function Products(productService, store) {
        this.productService = productService;
        this.store = store;
        this.searchStream = new forms_1.FormControl();
        this.searchQuery = '';
        this.pageStream = new Subject_1.Subject();
        this.page = 1;
        this.pageLength = 10;
        this.filterStream = new Subject_1.Subject();
        this.filterData = { supplier: '', categories: '' };
        this.subs = [];
        this.categories = [''];
        this.suppliers = [''];
        this.searchExpanded = 'collapsed';
    }
    Products.prototype.ngOnInit = function () {
        var _this = this;
        this.subs[this.subs.length] = this.productService.getAllProducts().subscribe(function (_a) {
            var totalElements = _a.totalElements, elements = _a.elements;
            _this.totalProducts = totalElements;
            _this.getFiltersList(elements);
        });
        var storeSource = this.store.changes
            .map(function (store) {
            return { search: _this.searchQuery, page: _this.page, length: _this.pageLength, filterData: _this.filterData };
        });
        var searchSource = this.searchStream
            .valueChanges
            .debounceTime(100)
            .distinctUntilChanged()
            .map(function (searchQuery) {
            _this.page = 1;
            return { search: searchQuery, page: _this.page, length: _this.pageLength, filterData: _this.filterData };
        });
        var pageSource = this.pageStream
            .map(function (params) {
            _this.page = params.page;
            _this.pageLength = params.length;
            return { search: _this.searchQuery, page: params.page, length: params.length, filterData: _this.filterData };
        });
        var filterSource = this.filterStream
            .map(function (filterData) {
            _this.filterData = filterData;
            return { search: _this.searchQuery, page: _this.page, length: _this.pageLength, filterData: filterData };
        });
        var source = storeSource
            .merge(searchSource, pageSource, filterSource)
            .startWith({ search: this.searchQuery, page: this.page, length: this.pageLength, filterData: this.filterData })
            .switchMap(function (params) {
            return _this.productService.list(params.search, params.page, params.length, params.filterData);
        })
            .share();
        this.products$ = source.pluck('products');
        this.filteredProducts$ = source.pluck('filtered');
    };
    Products.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
        // this.productService.purgeStore();
    };
    /* Pagination */
    Products.prototype.paginationChanged = function (_a) {
        var page = _a.page, length = _a.length;
        this.pageStream.next({ page: page, length: length });
        this.page = page;
        this.pageLength = length;
    };
    Products.prototype.getFiltersList = function (products) {
        var _categories = [];
        var _suppliers = [];
        products.forEach(function (product) {
            if (product.categories) {
                _categories = _categories.concat(product.categories);
            }
            if (product.supplier) {
                _suppliers.push(product.supplier);
            }
        });
        this.categories = Array.from(new Set(_categories));
        this.suppliers = Array.from(new Set(_suppliers));
    };
    Products.prototype.onFilterChange = function (e) {
        this.filterStream.next(e);
    };
    Products.prototype.onUpdateProductField = function (productId, productVarId, fieldName, value) {
        this.productService.updateProductField(productId, productVarId, (_a = {}, _a[fieldName] = value, _a));
        var _a;
    };
    Products.prototype.isEditable = function (key) {
        return key === 'price' || key === 'quantity' ? true : false;
    };
    Products.prototype.isCategory = function (key) {
        return key === 'categories' ? true : false;
    };
    Products.prototype.toggleAnimState = function () {
        this.searchExpanded = this.searchExpanded === 'collapsed' ? 'expanded' : 'collapsed';
    };
    return Products;
}());
Products = __decorate([
    core_1.Component({
        template: "\n\n    <div class=\"wrapper\">\n    \n      <div class=\"service-block\">\n      \n        <filter\n          [filters]=\"{\n            categories: categories,\n            supplier: suppliers\n          }\"\n          (filtered)=\"onFilterChange($event)\"\n        ></filter>\n      \n        <input type=\"text\" name=\"searchStream\" id=\"\"\n          class=\"input search-input\"\n          placeholder=\"Search in products...\"\n          [@changeWidth]=\"searchExpanded\"\n          #searchControl\n          [formControl]=\"searchStream\"\n          [(ngModel)]=\"searchQuery\"\n          (focusin)=\"toggleAnimState()\"\n          (focusout)=\"toggleAnimState()\"\n        >\n      \n      </div>\n      \n        \n      \n      <table class=\"table table-products\">\n        <thead>\n          <th class=\"headcell headcell--id\">ID</th>\n          <th class=\"headcell headcell--varId\">Variation ID</th>\n          <th class=\"headcell headcell--name\">Name</th>\n          <th class=\"headcell headcell--category\">Category</th>\n          <th class=\"headcell headcell--price\">Price</th>\n          <th class=\"headcell headcell--qty\">Quantity</th>\n          <th class=\"headcell headcell--unlim\">Unlimited</th>\n          <th class=\"headcell headcell--supplier\">Supplier</th>\n        </thead>\n        <tbody>\n          <tr\n            *ngFor=\"let product of products$ | async; let odd = odd; let even = even;\"\n            [ngClass]=\"{'product': true, 'odd': odd, 'even': even}\"\n          >\n            <ng-container\n              *ngFor=\"let key of product | keys\"\n            >\n              \n              <ng-template [ngIf]=\"isEditable(key)\">\n                <td\n                  class=\"product-cell--{{ key }} editable\"\n                  contenteditable\n                  [(contenteditableModel)]=\"product[key]\"\n                  (contentChanged)=\"onUpdateProductField(product.id, product.variationId, key, $event)\"\n                ></td>\n              </ng-template>\n              \n              \n              <ng-template [ngIf]=\"!isEditable(key)\">\n                <td class=\"product-cell--{{ key }}\">\n                  {{ product[key] }}\n                </td>\n              </ng-template>\n              \n            </ng-container>\n          </tr>\n        </tbody>\n      </table>\n      \n      <pagination\n        [total]=\"filteredProducts$ | async\"\n        [length]=\"pageLength\"\n        [current]=\"page\"\n        (dataChanged)=\"paginationChanged($event)\"\n      >\n      </pagination>\n    </div>\n  ",
        animations: [
            animations_1.trigger('changeWidth', [
                animations_1.state('collapsed', animations_1.style({ width: '190px' })),
                animations_1.state('expanded', animations_1.style({ width: '300px' })),
                animations_1.transition('collapsed <=> expanded', animations_1.animate('.3s ease')),
            ])
        ]
    }),
    __metadata("design:paramtypes", [index_1.ProductService,
        store_1.Store])
], Products);
exports.Products = Products;
//# sourceMappingURL=products.js.map