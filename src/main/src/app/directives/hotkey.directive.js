var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
var HotkeysDirective = /** @class */ (function () {
    function HotkeysDirective(el) {
        this.el = el;
        this.addProduct = new EventEmitter();
        this.moveFocus = new EventEmitter();
    }
    HotkeysDirective.prototype.onKey = function (e) {
        if (e.ctrlKey && e.code === 'Enter') {
            this.addProduct.emit();
            return false;
        }
        else if (e.shiftKey && e.code === 'Enter') {
            this.moveFocus.emit();
            return false;
        }
        else if (e.code === 'Enter' || e.code === 'Escape') {
            this.el.nativeElement.blur();
            return false;
        }
    };
    __decorate([
        Output('addProduct'),
        __metadata("design:type", Object)
    ], HotkeysDirective.prototype, "addProduct", void 0);
    __decorate([
        Output('moveFocus'),
        __metadata("design:type", Object)
    ], HotkeysDirective.prototype, "moveFocus", void 0);
    HotkeysDirective = __decorate([
        Directive({
            selector: '[hotkeys]',
            host: {
                '(keypress)': 'onKey($event)'
            }
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], HotkeysDirective);
    return HotkeysDirective;
}());
export { HotkeysDirective };
