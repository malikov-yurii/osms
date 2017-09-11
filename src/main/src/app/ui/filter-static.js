var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
var FilterStatic = /** @class */ (function () {
    function FilterStatic(fb) {
        this.fb = fb;
        this.filtered = new EventEmitter();
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
        Input(),
        __metadata("design:type", Object)
    ], FilterStatic.prototype, "filters", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FilterStatic.prototype, "filtered", void 0);
    FilterStatic = __decorate([
        Component({
            moduleId: module.id,
            selector: 'filter-static',
            template: "\n    <form class=\"filter-container\" [formGroup]=\"form\">\n      <div\n        class=\"filter\"\n        *ngFor=\"let filter of filters | keys\"\n      >\n        <div class=\"filter__label\">\n          {{ filter }} :\n        </div>\n\n        <select\n          class=\"filter__select input\"\n          formControlName=\"{{ filter }}\"\n        >\n          <option value=\"\" selected>- Show all -</option>\n          <option\n            *ngFor=\"let option of filters[filter]\"\n            value=\"{{ option }}\"\n          >\n            {{ option }}\n          </option>\n        </select>\n      </div>\n    </form>\n  ",
            styles: ["\n    .filter {\n        display: flex;\n        align-items: center;\n        margin: 5px 0;\n    }\n\n    .filter__label {\n        margin: 0 10px 0 0;\n        width: 100px;\n        text-transform: capitalize;\n        font-size: 15px;\n        word-break: break-word;\n    }\n    .filter__select {\n        width: 140px;\n        cursor: pointer;\n        font-size: 15px;\n    }\n    @media only screen and (max-width: 500px) {\n      .filter {\n          justify-content: space-between;\n      }\n      .filter__label {\n          width: 42%;\n      }\n\n      .filter__select {\n          width: 47%;\n      }\n    }\n  "]
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], FilterStatic);
    return FilterStatic;
}());
export { FilterStatic };
