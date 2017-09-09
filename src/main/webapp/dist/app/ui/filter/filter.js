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
var Filter = (function () {
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
    return Filter;
}());
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
        selector: 'filter',
        template: "\n    <div [@appear] class=\"filter-container\">\n      <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit($event)\" class=\"filter__form\">\n        <div\n          class=\"filter filter__block\"\n          *ngFor=\"let filter of filters\"\n        >\n          <div class=\"filter__label\">\n            {{ filter.label }} :\n          </div>\n          \n          <ng-container [ngSwitch]=\"filter.type\">\n            <input *ngSwitchCase=\"'text'\" type=\"text\" class=\"input filter__input\" formControlName=\"{{filter.code}}\">\n            \n            <input *ngSwitchCase=\"'date'\" type=\"date\" class=\"input filter__input\" formControlName=\"{{filter.code}}\">\n          \n            <select\n              *ngSwitchCase=\"'select'\"\n              formControlName=\"{{ filter.code }}\"\n              class=\"filter__select input\"\n            >\n              <option value=\"\" selected>- Show all -</option>\n              <option\n                *ngFor=\"let option of filters[filter]\"\n                value=\"{{ option }}\"\n              >\n                {{ option }}\n              </option>\n            </select>\n            \n          </ng-container>\n  \n        </div>\n        \n        <button type=\"submit\" class=\"btn filter__block filter__submit\">Submit</button>\n      </form>\n      <div *ngIf=\"loads\" [@fadeInOut] class=\"filter-overlay\">\n        <img class=\"filter-overlay__image\" src=\"/assets/images/loading.svg\" alt=\"\">\n      </div>\n    </div>\n  ",
        styles: ["\n    .filter-container {\n        position: relative;\n        margin-bottom: 20px;\n    }\n    \n    .filter__form {\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-end;\n        flex-wrap: wrap;\n    }\n    \n    .filter__block {\n        width: 27%;\n        margin: 5px 0 0 0;\n    }\n    \n    .filter {\n        display: flex;\n        align-items: center;\n    }\n    \n    .filter__label {\n        margin: 0 10px 0 0;\n        width: 100px;\n        text-transform: capitalize;\n        font-size: 15px;\n        word-break: break-word;\n    }\n    .filter__select {\n        width: 140px;\n        cursor: pointer;\n        font-size: 15px;\n    }\n    .filter__submit {\n        height: 35px;\n        margin-top: 10px;\n        margin-left: auto;\n    }\n    \n    .filter-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        background: rgba(255, 255, 255, .7);\n    }\n    \n    .filter-overlay__image {\n        max-width: 300px;\n        max-height: 300px;\n    }\n    \n    @media only screen and (max-width: 900px) {\n        .filter {\n            justify-content: space-between;\n            width: 100%;\n            max-width: 450px;\n            margin-left: auto;\n            margin-right: auto;\n        }\n    }\n    \n    @media only screen and (max-width: 500px) {\n        .filter__label {\n            width: 42%;\n        }\n    \n        .filter__input,\n        .filter__select {\n            width: 47%;\n        }\n    }\n  "],
        animations: [animations_1.appear(), animations_1.fadeInOut()]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], Filter);
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map