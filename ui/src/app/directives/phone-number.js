var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, HostListener } from '@angular/core';
import { STATIC_DATA } from '../models/index';
var PhoneNumberDirective = /** @class */ (function () {
    function PhoneNumberDirective() {
    }
    PhoneNumberDirective.prototype.onKey = function (event) {
        if (event.ctrlKey || event.altKey || event.which === 8 || event.which === 46 || STATIC_DATA.serviceKeys.indexOf(+event.which) > -1) {
            return true;
        }
        else {
            var value = event.target.value || event.target.innerText;
            return new RegExp('^\\d$').test(event.key) && value.length < 14;
        }
    };
    __decorate([
        HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PhoneNumberDirective.prototype, "onKey", null);
    PhoneNumberDirective = __decorate([
        Directive({
            selector: '[phoneNumber]'
        }),
        __metadata("design:paramtypes", [])
    ], PhoneNumberDirective);
    return PhoneNumberDirective;
}());
export { PhoneNumberDirective };
