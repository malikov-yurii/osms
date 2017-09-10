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
var animations_1 = require("../animations");
var Filter = /** @class */ (function () {
    function Filter(fb) {
        this.fb = fb;
        this.filterSubmit = new core_1.EventEmitter();
        this.form = this.fb.group({});
    }
    Filter.prototype.ngOnChanges = function () {
        var filters = {};
        this.filters.forEach(function (filter) {
            filters[filter.code] = filter.value || '';
        });
        try {
            this.form = this.fb.group(filters);
        }
        catch (e) {
            console.warn(e);
        }
    };
    Filter.prototype.onSubmit = function (e) {
        this.filterSubmit.emit(this.form.value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Filter.prototype, "filters", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Filter.prototype, "loads", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Filter.prototype, "filterSubmit", void 0);
    Filter = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'filter',
            templateUrl: './filter.html',
            styleUrls: ['./filter.css'],
            animations: [animations_1.appear(), animations_1.fadeInOut()]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], Filter);
    return Filter;
}());
exports.Filter = Filter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpL2ZpbHRlci9maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Y7QUFDbEYsd0NBQXdEO0FBR3hELDRDQUFrRDtBQVNsRDtJQU9FLGdCQUFvQixFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUZ6QixpQkFBWSxHQUFvQyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUczRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0UsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtZQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztJQUVILENBQUM7SUFFRCx5QkFBUSxHQUFSLFVBQVMsQ0FBQztRQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQXhCUztRQUFULFlBQUssRUFBRTs7MkNBQTZFO0lBQzNFO1FBQVQsWUFBSyxFQUFFOzt5Q0FBMEI7SUFDeEI7UUFBVCxhQUFNLEVBQUU7a0NBQWlCLG1CQUFZO2dEQUF1QztJQUxsRSxNQUFNO1FBUGxCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLGVBQWU7WUFDNUIsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQzNCLFVBQVUsRUFBRSxDQUFDLG1CQUFNLEVBQUUsRUFBRSxzQkFBUyxFQUFFLENBQUM7U0FDcEMsQ0FBQzt5Q0FRd0IsbUJBQVc7T0FQeEIsTUFBTSxDQTRCbEI7SUFBRCxhQUFDO0NBNUJELEFBNEJDLElBQUE7QUE1Qlksd0JBQU0iLCJmaWxlIjoidWkvZmlsdGVyL2ZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuXHJcbmltcG9ydCB7IGFwcGVhciwgZmFkZUluT3V0IH0gZnJvbSAnLi4vYW5pbWF0aW9ucyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnZmlsdGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ZpbHRlci5jc3MnXSxcclxuICBhbmltYXRpb25zOiBbYXBwZWFyKCksIGZhZGVJbk91dCgpXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBwcml2YXRlIGZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgQElucHV0KCkgIGZpbHRlcnMgICAgICAgOiB7Y29kZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHZhbHVlPzogYW55fVtdO1xyXG4gIEBJbnB1dCgpICBsb2FkcyAgICAgICAgIDogYm9vbGVhbjtcclxuICBAT3V0cHV0KCkgZmlsdGVyU3VibWl0ICA6IEV2ZW50RW1pdHRlcjxPYnNlcnZhYmxlPGFueT4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xyXG4gICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7fSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIGxldCBmaWx0ZXJzID0ge307XHJcbiAgICB0aGlzLmZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xyXG4gICAgICBmaWx0ZXJzW2ZpbHRlci5jb2RlXSA9IGZpbHRlci52YWx1ZSB8fCAnJztcclxuICAgIH0pO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoZmlsdGVycyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihlKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBvblN1Ym1pdChlKSB7XHJcbiAgICB0aGlzLmZpbHRlclN1Ym1pdC5lbWl0KHRoaXMuZm9ybS52YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
