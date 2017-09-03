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
var Filter = (function () {
    function Filter(fb) {
        this.fb = fb;
        this.filtered = new core_1.EventEmitter();
        this.form = this.fb.group({});
    }
    Filter.prototype.ngOnChanges = function () {
        try {
            this.form = this.fb.group(this.filters);
        }
        catch (e) { }
    };
    Filter.prototype.onChange = function () {
        this.filtered.emit(this.form.value);
    };
    return Filter;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Filter.prototype, "filters", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], Filter.prototype, "filtered", void 0);
Filter = __decorate([
    core_1.Component({
        selector: 'filter',
        template: "\n    <form class=\"filter-container\" [formGroup]=\"form\">\n      <div\n        class=\"filter\"\n        *ngFor=\"let filter of filters | keys\"\n      >\n        <div class=\"filter__label\">\n          {{ filter }} :\n        </div>\n        \n        <select\n          class=\"filter__select input\"\n          formControlName=\"{{ filter }}\"\n          (change)=\"onChange(filter, $event.target.value)\"\n        >\n          <option value=\"\" selected>- Show all -</option>\n          <option\n            *ngFor=\"let option of filters[filter]\"\n            value=\"{{ option }}\"\n          >\n            {{ option }}\n          </option>\n        </select>\n      </div>\n    </form>\n  ",
        styles: ["\n    .filter {\n        display: flex;\n        align-items: center;\n        margin: 5px 0;\n    }\n    \n    .filter__label {\n        margin: 0 10px 0 0;\n        width: 100px;\n        text-transform: capitalize;\n        font-size: 15px;\n        word-break: break-word;\n    }\n    .filter__select {\n        width: 140px;\n        cursor: pointer;\n        font-size: 15px;\n    }\n    @media only screen and (max-width: 500px) {\n      .filter {\n          justify-content: space-between;\n      }\n      .filter__label {\n          width: 42%;\n      }\n      \n      .filter__select {\n          width: 47%;\n      }\n    }\n  "]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], Filter);
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map