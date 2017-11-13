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
import { appear, fadeInOut } from '../animations';
var Filter = /** @class */ (function () {
    function Filter(fb) {
        this.fb = fb;
        this.filterSubmit = new EventEmitter();
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
        Input(),
        __metadata("design:type", Array)
    ], Filter.prototype, "filters", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Filter.prototype, "loads", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Filter.prototype, "filterSubmit", void 0);
    Filter = __decorate([
        Component({
            moduleId: module.id,
            selector: 'filter',
            templateUrl: './filter.html',
            styleUrls: ['./filter.css'],
            animations: [appear(), fadeInOut()]
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], Filter);
    return Filter;
}());
export { Filter };
