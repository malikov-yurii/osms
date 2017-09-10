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
var store_1 = require("../../store");
var index_1 = require("../../services/index");
var animations_1 = require("../../ui/animations");
var CustomersComponent = /** @class */ (function () {
    function CustomersComponent(customerService, store) {
        this.customerService = customerService;
        this.store = store;
        this.searchStream = new forms_1.FormControl();
        this.searchQuery = '';
        this.pageStream = new Subject_1.Subject();
        this.page = 1;
        this.pageLength = 10;
        this.subs = [];
        this.searchExpanded = 'collapsed';
    }
    CustomersComponent.prototype.ngOnInit = function () {
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
    CustomersComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
        this.customerService.purgeStore();
    };
    /* Pagination */
    CustomersComponent.prototype.paginationChanged = function (_a) {
        var page = _a.page, length = _a.length;
        this.pageStream.next({ page: page, length: length });
        this.page = page;
        this.pageLength = length;
    };
    CustomersComponent.prototype.toggleAnimState = function () {
        this.searchExpanded = this.searchExpanded === 'collapsed' ? 'expanded' : 'collapsed';
    };
    CustomersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'customers.component.html',
            animations: [animations_1.slideToLeft(), animations_1.changeWidth()],
            host: { '[@slideToLeft]': '' }
        }),
        __metadata("design:paramtypes", [index_1.CustomerService,
            store_1.Store])
    ], CustomersComponent);
    return CustomersComponent;
}());
exports.CustomersComponent = CustomersComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvY3VzdG9tZXJzL2N1c3RvbWVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBNkQ7QUFDN0Qsd0NBQTZDO0FBRTdDLHdDQUF1QztBQUV2QywwQ0FBd0M7QUFDeEMsbUNBQWlDO0FBQ2pDLHVDQUFxQztBQUNyQyx1Q0FBcUM7QUFDckMsbUNBQWlDO0FBQ2pDLG1DQUFpQztBQUNqQyxpQ0FBK0I7QUFFL0IscUNBQW9DO0FBQ3BDLDhDQUF1RDtBQUN2RCxrREFBK0Q7QUFTL0Q7SUFnQkUsNEJBQ1UsZUFBZ0MsRUFDaEMsS0FBWTtRQURaLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBYmQsaUJBQVksR0FBZ0IsSUFBSSxtQkFBVyxFQUFFLENBQUM7UUFDdEQsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFFakIsZUFBVSxHQUFHLElBQUksaUJBQU8sRUFBa0MsQ0FBQztRQUNuRSxTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFaEIsU0FBSSxHQUFtQixFQUFFLENBQUM7UUFFMUIsbUJBQWMsR0FBRyxXQUFXLENBQUM7SUFLbEMsQ0FBQztJQUVKLHFDQUFRLEdBQVI7UUFBQSxpQkFvQ0M7UUFuQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakYsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO2FBQ2pDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7WUFDUixNQUFNLENBQUMsRUFBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSSxDQUFDLFVBQVUsRUFB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Q0E0RTlCO0lBQUQseUJBQUM7Q0E1RUQsQUE0RUMsSUFBQTtBQTVFWSxnREFBa0IiLCJmaWxlIjoiY29udGFpbmVycy9jdXN0b21lcnMvY3VzdG9tZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqcy9TdWJqZWN0XCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2RlYm91bmNlVGltZSc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21lcmdlJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc3RhcnRXaXRoJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9wbHVjayc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5cbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi4vLi4vc3RvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvaW5kZXgnO1xuaW1wb3J0IHsgc2xpZGVUb0xlZnQsIGNoYW5nZVdpZHRoIH0gZnJvbSAnLi4vLi4vdWkvYW5pbWF0aW9ucyc7XG5cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiAnY3VzdG9tZXJzLmNvbXBvbmVudC5odG1sJyxcbiAgYW5pbWF0aW9uczogW3NsaWRlVG9MZWZ0KCksIGNoYW5nZVdpZHRoKCldLFxuICBob3N0OiB7J1tAc2xpZGVUb0xlZnRdJzogJyd9XG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIGN1c3RvbWVycyQ6IE9ic2VydmFibGU8YW55W10+O1xuICBwcml2YXRlIGZpbHRlcmVkQ3VzdG9tZXJzJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHByaXZhdGUgc2VhcmNoU3RyZWFtOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBzZWFyY2hRdWVyeTogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSBwYWdlU3RyZWFtID0gbmV3IFN1YmplY3Q8e3BhZ2U6IG51bWJlciwgbGVuZ3RoOiBudW1iZXJ9PigpO1xuICBwYWdlOiBudW1iZXIgPSAxO1xuICBwYWdlTGVuZ3RoOiBudW1iZXIgPSAxMDtcblxuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgcHJpdmF0ZSBzZWFyY2hFeHBhbmRlZCA9ICdjb2xsYXBzZWQnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmVcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic1t0aGlzLnN1YnMubGVuZ3RoXSA9IHRoaXMuY3VzdG9tZXJTZXJ2aWNlLmdldEFsbEN1c3RvbWVycygpLnN1YnNjcmliZSgpO1xuXG4gICAgbGV0IHN0b3JlU291cmNlID0gdGhpcy5zdG9yZS5jaGFuZ2VzXG4gICAgICAubWFwKHN0b3JlID0+IHtcbiAgICAgICAgcmV0dXJuIHtzZWFyY2g6IHRoaXMuc2VhcmNoUXVlcnksIHBhZ2U6IHRoaXMucGFnZSwgbGVuZ3RoOiB0aGlzLnBhZ2VMZW5ndGh9O1xuICAgICAgfSk7XG5cbiAgICBsZXQgc2VhcmNoU291cmNlID0gdGhpcy5zZWFyY2hTdHJlYW1cbiAgICAgIC52YWx1ZUNoYW5nZXNcbiAgICAgIC5kZWJvdW5jZVRpbWUoMTAwKVxuICAgICAgLmRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgIC5tYXAoc2VhcmNoUXVlcnkgPT4ge1xuICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICByZXR1cm4ge3NlYXJjaDogc2VhcmNoUXVlcnksIHBhZ2U6IHRoaXMucGFnZSwgbGVuZ3RoOiB0aGlzLnBhZ2VMZW5ndGh9O1xuICAgICAgfSk7XG5cbiAgICBsZXQgcGFnZVNvdXJjZSA9IHRoaXMucGFnZVN0cmVhbVxuICAgICAgLm1hcChwYXJhbXMgPT4ge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYXJhbXMucGFnZTtcbiAgICAgICAgdGhpcy5wYWdlTGVuZ3RoID0gcGFyYW1zLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHtzZWFyY2g6IHRoaXMuc2VhcmNoUXVlcnksIHBhZ2U6IHBhcmFtcy5wYWdlLCBsZW5ndGg6IHBhcmFtcy5sZW5ndGh9O1xuICAgICAgfSk7XG5cbiAgICBsZXQgc291cmNlID0gc3RvcmVTb3VyY2VcbiAgICAgIC5tZXJnZShzZWFyY2hTb3VyY2UsIHBhZ2VTb3VyY2UpXG4gICAgICAuc3RhcnRXaXRoKHtzZWFyY2g6IHRoaXMuc2VhcmNoUXVlcnksIHBhZ2U6IHRoaXMucGFnZSwgbGVuZ3RoOiB0aGlzLnBhZ2VMZW5ndGh9KVxuICAgICAgLnN3aXRjaE1hcCgocGFyYW1zOiB7c2VhcmNoOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgbGVuZ3RoOiBudW1iZXJ9KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbWVyU2VydmljZS5saXN0KHBhcmFtcy5zZWFyY2gsIHBhcmFtcy5wYWdlLCBwYXJhbXMubGVuZ3RoKTtcbiAgICAgIH0pXG4gICAgICAuc2hhcmUoKTtcblxuICAgIHRoaXMuY3VzdG9tZXJzJCA9IHNvdXJjZS5wbHVjaygnY3VzdG9tZXJzJyk7XG4gICAgdGhpcy5maWx0ZXJlZEN1c3RvbWVycyQgPSBzb3VyY2UucGx1Y2soJ2ZpbHRlcmVkJyk7XG5cblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICB0aGlzLmN1c3RvbWVyU2VydmljZS5wdXJnZVN0b3JlKCk7XG4gIH1cblxuICAvKiBQYWdpbmF0aW9uICovXG4gIHBhZ2luYXRpb25DaGFuZ2VkKHtwYWdlLCBsZW5ndGh9KSB7XG4gICAgdGhpcy5wYWdlU3RyZWFtLm5leHQoe3BhZ2UsIGxlbmd0aH0pO1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgdGhpcy5wYWdlTGVuZ3RoID0gbGVuZ3RoO1xuICB9XG5cblxuICB0b2dnbGVBbmltU3RhdGUoKSB7XG4gICAgdGhpcy5zZWFyY2hFeHBhbmRlZCA9IHRoaXMuc2VhcmNoRXhwYW5kZWQgPT09ICdjb2xsYXBzZWQnID8gJ2V4cGFuZGVkJyA6ICdjb2xsYXBzZWQnO1xuICB9XG5cbn1cbiJdfQ==
