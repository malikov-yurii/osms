var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
var ContenteditableModel = /** @class */ (function () {
    function ContenteditableModel(el) {
        this.el = el;
        this.update = new EventEmitter();
        this.changed = new EventEmitter();
    }
    ContenteditableModel.prototype.ngOnChanges = function (changes) {
        if (changes['model'] && changes['model'].currentValue !== this.lastViewModel) {
            this.lastViewModel = this.model;
            this.refreshView();
        }
    };
    ContenteditableModel.prototype.onKeydown = function (e) {
        if (e.keyCode === 13 || e.keyCode === 27) {
            this.el.nativeElement.blur();
            return false;
        }
    };
    /** This should probably be debounced. */
    ContenteditableModel.prototype.onBlur = function () {
        var value = this.el.nativeElement.innerText;
        // tslint:disable-next-line
        if (this.lastViewModel != value) {
            // debugger
            this.changed.emit({ newValue: value, oldValue: this.lastViewModel });
            this.lastViewModel = value;
        }
        this.update.emit(value);
    };
    ContenteditableModel.prototype.refreshView = function () {
        this.el.nativeElement.innerText = this.model;
    };
    __decorate([
        Input('contenteditableModel'),
        __metadata("design:type", String)
    ], ContenteditableModel.prototype, "model", void 0);
    __decorate([
        Output('contenteditableModelChange'),
        __metadata("design:type", Object)
    ], ContenteditableModel.prototype, "update", void 0);
    __decorate([
        Output('contentChanged'),
        __metadata("design:type", Object)
    ], ContenteditableModel.prototype, "changed", void 0);
    ContenteditableModel = __decorate([
        Directive({
            selector: '[contenteditableModel]',
            host: {
                '(blur)': 'onBlur()',
                '(keypress)': 'onKeydown($event)'
            }
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ContenteditableModel);
    return ContenteditableModel;
}());
export { ContenteditableModel };
