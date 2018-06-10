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
import { FormBuilder, FormControl } from '@angular/forms';
import 'rxjs/add/operator/take';
import { appear, fadeInOut } from '../animations';
var DataFilter = /** @class */ (function () {
    function DataFilter(fb) {
        this.fb = fb;
        this.filterSubmit = new EventEmitter();
        this.form = this.fb.group({});
    }
    DataFilter.prototype.ngOnInit = function () {
        var _this = this;
        this.filters.forEach(function (filter) {
            _this.form.addControl(filter.code, new FormControl(filter.value || ''));
        });
        this.form.addControl('productId', new FormControl(null));
        this.form.addControl('productVariationId', new FormControl(null));
    };
    DataFilter.prototype.onSubmit = function () {
        this.filterSubmit.emit(this.form.value);
    };
    DataFilter.prototype.onAutocomplete = function (event, code) {
        var _this = this;
        this.form.get(code).setValue(event.productName);
        var idType;
        if (event.productVariationId) {
            idType = 'productVariationId';
        }
        else if (event.productId) {
            idType = 'productId';
        }
        if (event[idType]) {
            this.form.get(idType).setValue(event[idType]);
            this.form.get(code).valueChanges.take(1).subscribe(function () {
                console.log('hello');
                _this.form.get(idType).setValue(null);
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DataFilter.prototype, "filters", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataFilter.prototype, "filterSubmit", void 0);
    DataFilter = __decorate([
        Component({
            moduleId: module.id,
            selector: 'data-filter',
            templateUrl: './filter.html',
            styleUrls: ['./filter.css'],
            animations: [appear(), fadeInOut()]
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], DataFilter);
    return DataFilter;
}());
export { DataFilter };
