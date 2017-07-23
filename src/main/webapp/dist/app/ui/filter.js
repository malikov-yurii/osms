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
var Filter = (function () {
    function Filter() {
        this.filtered = new core_1.EventEmitter();
    }
    Filter.prototype.onChange = function (label, data) {
        this.filtered.emit({ label: label, data: data });
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
        template: "\n    <div class=\"filter-wrapper\">\n      <div\n        class=\"filter\"\n        *ngFor=\"let filter of filters\"\n      >\n        <div class=\"filter-label\">\n          {{ filter.label }}\n        </div>\n        \n        <select \n          class=\"filter-select\"\n          (change)=\"onChange(filter.label, $event.target.value)\"\n        >\n          <option value=\"\">- Show all -</option>\n          <option\n            *ngFor=\"let option of filter.data\"\n            value=\"{{ option }}\"\n          >\n            {{ option }}\n          </option>\n        </select>\n      </div>\n    </div>\n  "
    })
], Filter);
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map