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
var FilterStatic = /** @class */ (function () {
    function FilterStatic(fb) {
        this.fb = fb;
        this.filtered = new core_1.EventEmitter();
        this.form = this.fb.group({});
    }
    FilterStatic.prototype.ngOnInit = function () {
        var _this = this;
        this.form.valueChanges.subscribe(function (value) { return _this.filtered.emit(value); });
    };
    FilterStatic.prototype.ngOnChanges = function () {
        try {
            this.form = this.fb.group(this.filters);
        }
        catch (e) {
            console.warn(e);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FilterStatic.prototype, "filters", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FilterStatic.prototype, "filtered", void 0);
    FilterStatic = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'filter-static',
            template: "\n    <form class=\"filter-container\" [formGroup]=\"form\">\n      <div\n        class=\"filter\"\n        *ngFor=\"let filter of filters | keys\"\n      >\n        <div class=\"filter__label\">\n          {{ filter }} :\n        </div>\n\n        <select\n          class=\"filter__select input\"\n          formControlName=\"{{ filter }}\"\n        >\n          <option value=\"\" selected>- Show all -</option>\n          <option\n            *ngFor=\"let option of filters[filter]\"\n            value=\"{{ option }}\"\n          >\n            {{ option }}\n          </option>\n        </select>\n      </div>\n    </form>\n  ",
            styles: ["\n    .filter {\n        display: flex;\n        align-items: center;\n        margin: 5px 0;\n    }\n\n    .filter__label {\n        margin: 0 10px 0 0;\n        width: 100px;\n        text-transform: capitalize;\n        font-size: 15px;\n        word-break: break-word;\n    }\n    .filter__select {\n        width: 140px;\n        cursor: pointer;\n        font-size: 15px;\n    }\n    @media only screen and (max-width: 500px) {\n      .filter {\n          justify-content: space-between;\n      }\n      .filter__label {\n          width: 42%;\n      }\n\n      .filter__select {\n          width: 47%;\n      }\n    }\n  "]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], FilterStatic);
    return FilterStatic;
}());
exports.FilterStatic = FilterStatic;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpL2ZpbHRlci1zdGF0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEY7QUFDMUYsd0NBQXdEO0FBK0R4RDtJQU1FLHNCQUFvQixFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUp6QixhQUFRLEdBQUcsSUFBSSxtQkFBWSxFQUFTLENBQUM7UUFLN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUFBLGlCQUVDO1FBREMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQztZQUNILElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDO0lBQ0gsQ0FBQztJQW5CUTtRQUFSLFlBQUssRUFBRTs7aURBQWdCO0lBQ2Q7UUFBVCxhQUFNLEVBQUU7O2tEQUFzQztJQUZwQyxZQUFZO1FBN0R4QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSwybkJBd0JUO1lBQ0QsTUFBTSxFQUFFLENBQUMsc25CQStCUixDQUFDO1NBQ0gsQ0FBQzt5Q0FPd0IsbUJBQVc7T0FOeEIsWUFBWSxDQXFCeEI7SUFBRCxtQkFBQztDQXJCRCxBQXFCQyxJQUFBO0FBckJZLG9DQUFZIiwiZmlsZSI6InVpL2ZpbHRlci1zdGF0aWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdmaWx0ZXItc3RhdGljJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGZvcm0gY2xhc3M9XCJmaWx0ZXItY29udGFpbmVyXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzcz1cImZpbHRlclwiXHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBmaWx0ZXJzIHwga2V5c1wiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyX19sYWJlbFwiPlxyXG4gICAgICAgICAge3sgZmlsdGVyIH19IDpcclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPHNlbGVjdFxyXG4gICAgICAgICAgY2xhc3M9XCJmaWx0ZXJfX3NlbGVjdCBpbnB1dFwiXHJcbiAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ7eyBmaWx0ZXIgfX1cIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBzZWxlY3RlZD4tIFNob3cgYWxsIC08L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb25cclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJzW2ZpbHRlcl1cIlxyXG4gICAgICAgICAgICB2YWx1ZT1cInt7IG9wdGlvbiB9fVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt7IG9wdGlvbiB9fVxyXG4gICAgICAgICAgPC9vcHRpb24+XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9mb3JtPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmZpbHRlciB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIG1hcmdpbjogNXB4IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLmZpbHRlcl9fbGFiZWwge1xyXG4gICAgICAgIG1hcmdpbjogMCAxMHB4IDAgMDtcclxuICAgICAgICB3aWR0aDogMTAwcHg7XHJcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XHJcbiAgICB9XHJcbiAgICAuZmlsdGVyX19zZWxlY3Qge1xyXG4gICAgICAgIHdpZHRoOiAxNDBweDtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgfVxyXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MDBweCkge1xyXG4gICAgICAuZmlsdGVyIHtcclxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgfVxyXG4gICAgICAuZmlsdGVyX19sYWJlbCB7XHJcbiAgICAgICAgICB3aWR0aDogNDIlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuZmlsdGVyX19zZWxlY3Qge1xyXG4gICAgICAgICAgd2lkdGg6IDQ3JTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJTdGF0aWMgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGZpbHRlcnM6IHthbnl9O1xyXG4gIEBPdXRwdXQoKSBmaWx0ZXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e2FueX0+KCk7XHJcblxyXG4gIHByaXZhdGUgZm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xyXG4gICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7fSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMuZmlsdGVyZWQuZW1pdCh2YWx1ZSkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHRoaXMuZmlsdGVycyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
