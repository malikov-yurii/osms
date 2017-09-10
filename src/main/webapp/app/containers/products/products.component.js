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
var store_1 = require("../../store");
var index_1 = require("../../services/index");
var animations_1 = require("../../ui/animations");
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(productService, notyService, store) {
        this.productService = productService;
        this.notyService = notyService;
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
    ProductsComponent.prototype.ngOnInit = function () {
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
            return { search: _this.searchQuery, page: 1, length: _this.pageLength, filterData: filterData };
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
    ProductsComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
        this.productService.purgeStore();
    };
    /* Pagination */
    ProductsComponent.prototype.paginationChanged = function (_a) {
        var page = _a.page, length = _a.length;
        this.pageStream.next({ page: page, length: length });
        this.page = page;
        this.pageLength = length;
    };
    ProductsComponent.prototype.getFiltersList = function (products) {
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
    ProductsComponent.prototype.onFilterChange = function (e) {
        this.filterStream.next(e);
    };
    ProductsComponent.prototype.onUpdateProductField = function (productId, productVarId, fieldName, _a) {
        var _this = this;
        var newValue = _a.newValue, oldValue = _a.oldValue;
        this.productService.updateProductField(productId, productVarId, (_b = {}, _b[fieldName] = newValue, _b))
            .subscribe(function () {
            _this.notyService.renderNoty("\"" + oldValue + "\" has been changed to \"" + newValue + "\"");
        });
        var _b;
    };
    ProductsComponent.prototype.isEditable = function (key) {
        return key === 'price' || key === 'quantity' ? true : false;
    };
    ProductsComponent.prototype.isCategory = function (key) {
        return key === 'categories' ? true : false;
    };
    ProductsComponent.prototype.toggleAnimState = function () {
        this.searchExpanded = this.searchExpanded === 'collapsed' ? 'expanded' : 'collapsed';
    };
    ProductsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'products.component.html',
            animations: [animations_1.slideToLeft(), animations_1.changeWidth()],
            host: { '[@slideToLeft]': '' }
        }),
        __metadata("design:paramtypes", [index_1.ProductService,
            index_1.NotyService,
            store_1.Store])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvcHJvZHVjdHMvcHJvZHVjdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZEO0FBQzdELHdDQUErQztBQUUvQyx3Q0FBNkM7QUFFN0MsMENBQXdDO0FBQ3hDLG1DQUFpQztBQUNqQyx1Q0FBcUM7QUFDckMsdUNBQXFDO0FBQ3JDLG1DQUFpQztBQUNqQyxtQ0FBaUM7QUFFakMscUNBQW9DO0FBRXBDLDhDQUFtRTtBQUNuRSxrREFBK0Q7QUFTL0Q7SUFzQkUsMkJBQ1UsY0FBOEIsRUFDOUIsV0FBd0IsRUFDeEIsS0FBWTtRQUZaLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBbkJkLGlCQUFZLEdBQWdCLElBQUksbUJBQVcsRUFBRSxDQUFDO1FBQ3RELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBRWpCLGVBQVUsR0FBRyxJQUFJLGlCQUFPLEVBQWtDLENBQUM7UUFDbkUsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRWhCLGlCQUFZLEdBQUcsSUFBSSxpQkFBTyxFQUFPLENBQUM7UUFDbEMsZUFBVSxHQUFHLEVBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFFNUMsU0FBSSxHQUFtQixFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsY0FBUyxHQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFM0IsbUJBQWMsR0FBRyxXQUFXLENBQUM7SUFNbEMsQ0FBQztJQUVKLG9DQUFRLEdBQVI7UUFBQSxpQkE2Q0M7UUE1Q0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFF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LEVBQUUsRUFBRSxFQUFDO1NBQzdCLENBQUM7eUNBd0IwQixzQkFBYztZQUNqQixtQkFBVztZQUNqQixhQUFLO09BekJYLGlCQUFpQixDQXVJN0I7SUFBRCx3QkFBQztDQXZJRCxBQXVJQyxJQUFBO0FBdklZLDhDQUFpQiIsImZpbGUiOiJjb250YWluZXJzL3Byb2R1Y3RzL3Byb2R1Y3RzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgIGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gICAgZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9ICAgICAgIGZyb20gXCJyeGpzL1N1YmplY3RcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gIGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kZWJvdW5jZVRpbWUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21lcmdlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9zdGFydFdpdGgnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3N3aXRjaE1hcCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3BsdWNrJztcclxuXHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi4vLi4vc3RvcmUnO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UsIE5vdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvaW5kZXgnO1xyXG5pbXBvcnQgeyBzbGlkZVRvTGVmdCwgY2hhbmdlV2lkdGggfSBmcm9tICcuLi8uLi91aS9hbmltYXRpb25zJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiAncHJvZHVjdHMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGFuaW1hdGlvbnM6IFtzbGlkZVRvTGVmdCgpLCBjaGFuZ2VXaWR0aCgpXSxcclxuICBob3N0OiB7J1tAc2xpZGVUb0xlZnRdJzogJyd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHJpdmF0ZSBwcm9kdWN0cyQ6IE9ic2VydmFibGU8UHJvZHVjdFtdPjtcclxuICBwcml2YXRlIHRvdGFsUHJvZHVjdHM6IGFueTtcclxuICBwcml2YXRlIGZpbHRlcmVkUHJvZHVjdHMkOiBPYnNlcnZhYmxlPG51bWJlcj47XHJcblxyXG4gIHByaXZhdGUgc2VhcmNoU3RyZWFtOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xyXG4gIHNlYXJjaFF1ZXJ5OiBzdHJpbmcgPSAnJztcclxuXHJcbiAgcHJpdmF0ZSBwYWdlU3RyZWFtID0gbmV3IFN1YmplY3Q8e3BhZ2U6IG51bWJlciwgbGVuZ3RoOiBudW1iZXJ9PigpO1xyXG4gIHBhZ2U6IG51bWJlciA9IDE7XHJcbiAgcGFnZUxlbmd0aDogbnVtYmVyID0gMTA7XHJcblxyXG4gIHByaXZhdGUgZmlsdGVyU3RyZWFtID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gIHByaXZhdGUgZmlsdGVyRGF0YSA9IHtzdXBwbGllcjogJycsIGNhdGVnb3JpZXM6ICcnfTtcclxuXHJcbiAgcHJpdmF0ZSBzdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gIHByaXZhdGUgY2F0ZWdvcmllczogc3RyaW5nW10gPSBbJyddO1xyXG4gIHByaXZhdGUgc3VwcGxpZXJzOiBzdHJpbmdbXSA9IFsnJ107XHJcblxyXG4gIHByaXZhdGUgc2VhcmNoRXhwYW5kZWQgPSAnY29sbGFwc2VkJztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHByb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcclxuICAgIHByaXZhdGUgbm90eVNlcnZpY2U6IE5vdHlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmVcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdWJzW3RoaXMuc3Vicy5sZW5ndGhdID0gdGhpcy5wcm9kdWN0U2VydmljZS5nZXRBbGxQcm9kdWN0cygpLnN1YnNjcmliZShcclxuICAgICAgKHt0b3RhbEVsZW1lbnRzLCBlbGVtZW50c30pID0+IHtcclxuICAgICAgICB0aGlzLnRvdGFsUHJvZHVjdHMgPSB0b3RhbEVsZW1lbnRzO1xyXG4gICAgICAgIHRoaXMuZ2V0RmlsdGVyc0xpc3QoZWxlbWVudHMpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGxldCBzdG9yZVNvdXJjZSA9IHRoaXMuc3RvcmUuY2hhbmdlc1xyXG4gICAgICAubWFwKHN0b3JlID0+IHtcclxuICAgICAgICByZXR1cm4ge3NlYXJjaDogdGhpcy5zZWFyY2hRdWVyeSwgcGFnZTogdGhpcy5wYWdlLCBsZW5ndGg6IHRoaXMucGFnZUxlbmd0aCwgZmlsdGVyRGF0YTogdGhpcy5maWx0ZXJEYXRhfTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNlYXJjaFNvdXJjZSA9IHRoaXMuc2VhcmNoU3RyZWFtXHJcbiAgICAgIC52YWx1ZUNoYW5nZXNcclxuICAgICAgLmRlYm91bmNlVGltZSgxMDApXHJcbiAgICAgIC5kaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICAgIC5tYXAoc2VhcmNoUXVlcnkgPT4ge1xyXG4gICAgICAgIHRoaXMucGFnZSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIHtzZWFyY2g6IHNlYXJjaFF1ZXJ5LCBwYWdlOiB0aGlzLnBhZ2UsIGxlbmd0aDogdGhpcy5wYWdlTGVuZ3RoLCBmaWx0ZXJEYXRhOiB0aGlzLmZpbHRlckRhdGF9O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBsZXQgcGFnZVNvdXJjZSA9IHRoaXMucGFnZVN0cmVhbVxyXG4gICAgICAubWFwKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gcGFyYW1zLnBhZ2U7XHJcbiAgICAgICAgdGhpcy5wYWdlTGVuZ3RoID0gcGFyYW1zLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4ge3NlYXJjaDogdGhpcy5zZWFyY2hRdWVyeSwgcGFnZTogcGFyYW1zLnBhZ2UsIGxlbmd0aDogcGFyYW1zLmxlbmd0aCwgZmlsdGVyRGF0YTogdGhpcy5maWx0ZXJEYXRhfTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGZpbHRlclNvdXJjZSA9IHRoaXMuZmlsdGVyU3RyZWFtXHJcbiAgICAgIC5tYXAoZmlsdGVyRGF0YSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gZmlsdGVyRGF0YTtcclxuICAgICAgICByZXR1cm4ge3NlYXJjaDogdGhpcy5zZWFyY2hRdWVyeSwgcGFnZTogMSwgbGVuZ3RoOiB0aGlzLnBhZ2VMZW5ndGgsIGZpbHRlckRhdGE6IGZpbHRlckRhdGF9O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBsZXQgc291cmNlID0gc3RvcmVTb3VyY2VcclxuICAgICAgLm1lcmdlKHNlYXJjaFNvdXJjZSwgcGFnZVNvdXJjZSwgZmlsdGVyU291cmNlKVxyXG4gICAgICAuc3RhcnRXaXRoKHtzZWFyY2g6IHRoaXMuc2VhcmNoUXVlcnksIHBhZ2U6IHRoaXMucGFnZSwgbGVuZ3RoOiB0aGlzLnBhZ2VMZW5ndGgsIGZpbHRlckRhdGE6IHRoaXMuZmlsdGVyRGF0YX0pXHJcbiAgICAgIC5zd2l0Y2hNYXAoKHBhcmFtczoge3NlYXJjaDogc3RyaW5nLCBwYWdlOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBmaWx0ZXJEYXRhfSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RTZXJ2aWNlLmxpc3QocGFyYW1zLnNlYXJjaCwgcGFyYW1zLnBhZ2UsIHBhcmFtcy5sZW5ndGgsIHBhcmFtcy5maWx0ZXJEYXRhKTtcclxuICAgICAgfSlcclxuICAgICAgLnNoYXJlKCk7XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0cyQgPSBzb3VyY2UucGx1Y2soJ3Byb2R1Y3RzJyk7XHJcbiAgICB0aGlzLmZpbHRlcmVkUHJvZHVjdHMkID0gc291cmNlLnBsdWNrKCdmaWx0ZXJlZCcpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN1YnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgdGhpcy5wcm9kdWN0U2VydmljZS5wdXJnZVN0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKiBQYWdpbmF0aW9uICovXHJcbiAgcGFnaW5hdGlvbkNoYW5nZWQoe3BhZ2UsIGxlbmd0aH0pIHtcclxuICAgIHRoaXMucGFnZVN0cmVhbS5uZXh0KHtwYWdlLCBsZW5ndGh9KTtcclxuICAgIHRoaXMucGFnZSA9IHBhZ2U7XHJcbiAgICB0aGlzLnBhZ2VMZW5ndGggPSBsZW5ndGg7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGdldEZpbHRlcnNMaXN0KHByb2R1Y3RzOiBQcm9kdWN0W10pIHtcclxuICAgIGxldCBfY2F0ZWdvcmllcyA9IFtdO1xyXG4gICAgbGV0IF9zdXBwbGllcnMgPSBbXTtcclxuXHJcbiAgICBwcm9kdWN0cy5mb3JFYWNoKHByb2R1Y3QgPT4ge1xyXG4gICAgICBpZiAocHJvZHVjdC5jYXRlZ29yaWVzKSB7XHJcbiAgICAgICAgX2NhdGVnb3JpZXMgPSBfY2F0ZWdvcmllcy5jb25jYXQocHJvZHVjdC5jYXRlZ29yaWVzKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocHJvZHVjdC5zdXBwbGllcikge1xyXG4gICAgICAgIF9zdXBwbGllcnMucHVzaChwcm9kdWN0LnN1cHBsaWVyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jYXRlZ29yaWVzID0gQXJyYXkuZnJvbShuZXcgU2V0KF9jYXRlZ29yaWVzKSk7XHJcbiAgICB0aGlzLnN1cHBsaWVycyA9IEFycmF5LmZyb20obmV3IFNldChfc3VwcGxpZXJzKSk7XHJcbiAgfVxyXG5cclxuICBvbkZpbHRlckNoYW5nZShlKSB7XHJcbiAgICB0aGlzLmZpbHRlclN0cmVhbS5uZXh0KGUpO1xyXG4gIH1cclxuXHJcbiAgb25VcGRhdGVQcm9kdWN0RmllbGQocHJvZHVjdElkLCBwcm9kdWN0VmFySWQsIGZpZWxkTmFtZSwge25ld1ZhbHVlLCBvbGRWYWx1ZX0pIHtcclxuICAgIHRoaXMucHJvZHVjdFNlcnZpY2UudXBkYXRlUHJvZHVjdEZpZWxkKHByb2R1Y3RJZCwgcHJvZHVjdFZhcklkLCB7W2ZpZWxkTmFtZV06IG5ld1ZhbHVlfSlcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ub3R5U2VydmljZS5yZW5kZXJOb3R5KGBcIiR7b2xkVmFsdWV9XCIgaGFzIGJlZW4gY2hhbmdlZCB0byBcIiR7bmV3VmFsdWV9XCJgKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICBpc0VkaXRhYmxlKGtleSkge1xyXG4gICAgcmV0dXJuIGtleSA9PT0gJ3ByaWNlJyB8fCBrZXkgPT09ICdxdWFudGl0eScgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpc0NhdGVnb3J5KGtleSkge1xyXG4gICAgcmV0dXJuIGtleSA9PT0gJ2NhdGVnb3JpZXMnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQW5pbVN0YXRlKCkge1xyXG4gICAgdGhpcy5zZWFyY2hFeHBhbmRlZCA9IHRoaXMuc2VhcmNoRXhwYW5kZWQgPT09ICdjb2xsYXBzZWQnID8gJ2V4cGFuZGVkJyA6ICdjb2xsYXBzZWQnO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
