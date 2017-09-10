var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs/Subject';
var PopupComponent = /** @class */ (function () {
    function PopupComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.data = {};
        this.hasData = false;
        this.hasFormData = false;
        this.animationState = 'idle';
        this.header = 'Popup header';
        this.destroyedStream = new Subject();
        this.submittedStream = new Subject();
    }
    PopupComponent.prototype.provideWithData = function (data) {
        this.data = data;
        this.hasData = true;
    };
    PopupComponent.prototype.provideWithFormData = function (data) {
        this.data = data;
        this.hasFormData = true;
        this.form = this.formBuilder.group(data);
    };
    PopupComponent.prototype.onSubmit = function () {
        this.submittedStream.next(this.form.value);
        this.close();
    };
    PopupComponent.prototype.close = function () {
        this.animationState = 'destroyed';
    };
    PopupComponent.prototype.reset = function () {
        this.form.reset(this.data);
    };
    PopupComponent.prototype.onAnimationDone = function (e) {
        if (e.toState === 'destroyed') {
            this.destroyedStream.next();
        }
    };
    PopupComponent = __decorate([
        Component({
            moduleId: module.id,
            templateUrl: 'popup.html',
            styleUrls: ['./popup.css'],
            animations: [
                trigger('fadeInOut', [
                    state('destroyed', style({ opacity: 0 })),
                    transition(':enter', [
                        style({ opacity: 0 }),
                        animate('0.2s ease', style({ opacity: 1 }))
                    ]),
                    transition('* => destroyed', [
                        animate('0.2s ease')
                    ])
                ]),
                trigger('flyInOut', [
                    state('destroyed', style({ opacity: 0, transform: 'translateX(-10%)' })),
                    transition(':enter', [
                        style({ opacity: 0, transform: 'translateX(-90%)' }),
                        animate('0.2s ease', style({ opacity: 1, transform: 'translateX(-50%)' }))
                    ]),
                    transition('* => destroyed', [
                        animate('0.2s ease')
                    ])
                ]),
                trigger('expandHeight', [
                    state('0', style({ height: '150px' })),
                    state('1', style({ height: '*' })),
                    transition('0 => 1', animate('0.2s ease'))
                ])
            ],
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], PopupComponent);
    return PopupComponent;
}());
export { PopupComponent };
