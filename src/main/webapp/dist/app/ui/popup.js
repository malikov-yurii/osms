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
var animations_1 = require("@angular/animations");
var Subject_1 = require("rxjs/Subject");
var PopupComponent = (function () {
    function PopupComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.data = {};
        this.hasData = false;
        this.hasFormData = false;
        this.animationState = 'idle';
        this.header = 'Popup header';
        this.destroyedStream = new Subject_1.Subject();
        this.submittedStream = new Subject_1.Subject();
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
    return PopupComponent;
}());
PopupComponent = __decorate([
    core_1.Component({
        template: "\n    <div class=\"popup-wrapper\">\n      <div class=\"popup-overlay\" (click)=\"close()\" [@fadeInOut]=\"animationState\"></div>\n      <div class=\"popup\"\n        [@expandHeight]=\"hasData || hasFormData\"\n        [@flyInOut]=\"animationState\"\n        (@flyInOut.done)=\"onAnimationDone($event)\"\n      >\n        <div class=\"popup__head\">\n          {{ header }}\n          \n          <div class=\"popup__close\" (click)=\"close()\">\n            <i class=\"material-icons\">close</i>\n          </div>\n        </div>\n        \n        <div class=\"popup__loading\" *ngIf=\"!this.hasData && !this.hasFormData\">\n          <div class=\"popup__loading-text\">Loading...</div>\n          <img src=\"/assets/images/loading.svg\" alt=\"\" class=\"popup__loading-image\">\n        </div>\n        \n        <div class=\"popup__content\" *ngIf=\"hasData\">\n          <div class=\"popup__content-text\">{{ this.data }}</div>\n        </div>\n        \n        <form\n          *ngIf=\"hasFormData\"\n          [formGroup]=\"form\"\n          (ngSubmit)=\"onSubmit()\"\n        >\n        \n          <div class=\"popup__content\">\n            <div class=\"popup__formgroup\">\n              <label class=\"popup__label\">ID</label>\n              <div class=\"popup__input\">{{ data.id || data.customerId }}</div>\n            </div>\n          \n            <div class=\"popup__formgroup\" *ngFor=\"let key of data | keys:['id', 'customerId']\">\n              <label class=\"popup__label\" for=\"{{ key }}\">{{ key }}</label>\n              <input class=\"input popup__input\" id=\"{{ key }}\" type=\"text\" formControlName=\"{{ key }}\">\n            </div>\n          </div>\n          \n          <div class=\"popup__btns\">\n            <button class=\"btn btn--warning popup__btn popup__btn--reset\" type=\"button\" (click)=\"reset()\">\n              <i class=\"material-icons\">restore</i> Reset\n            </button>\n            <button class=\"btn popup__btn popup__btn--submit\" type=\"submit\">\n              <i class=\"material-icons\">save</i> Submit\n            </button>\n          </div>\n        </form>\n      </div>\n    </div>\n  ",
        styles: ["\n    .popup-wrapper,\n    .popup-overlay {\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        overflow-y: auto;\n    }\n    \n    .popup-overlay {\n        background: rgba(0,0,0,.3);\n    }\n    \n    .popup {\n        position: absolute;\n        top: 12%;\n        left: 50%;\n        transform: translateX(-50%);\n        min-width: 550px;\n        max-width: 100%;\n        min-height: 195px;\n        display: flex;\n        flex-wrap: wrap;\n        align-items: flex-start;\n        align-content: stretch;\n        justify-content: center;\n        background: #fff;\n        border: 1px solid #b9b9b9;\n        border-radius: 4px;\n        box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.42);\n        overflow: hidden;\n    }\n    \n    .popup__head {\n        position: relative;\n        padding: 8px 16px;\n        width: 100%;\n        background: #f4f4f4;\n        border-bottom: 1px solid #ccc;\n        border-top-right-radius: 4px;\n        border-top-left-radius: 4px;\n        font-size: 22px;\n    }\n    \n    .popup__close {\n        position: absolute;\n        top: 8px;\n        right: 8px;\n        cursor: pointer;\n    }\n    \n    .popup__close .material-icons {\n        font-size: 19px;\n    }\n    \n    .popup__close:hover {\n        color: #555;\n    }\n    \n    .popup__content {\n        width: 100%;\n        padding: 8px 16px;\n        font-size: 15px;\n    }\n    \n    .popup__content-text {\n        max-width: 220px;\n        margin: 0 auto;\n        text-align: center;\n    }\n    \n    .popup__formgroup {\n        margin: 13px 0;\n    }\n    \n    .popup__label {\n        display: inline-block;\n        vertical-align: middle;\n        width: 36%;\n    }\n    \n    .popup__input {\n        display: inline-block;\n        vertical-align: middle;\n        width: 58%;\n        margin: 0 0 0 4%;\n        font-size: 15px;\n    }\n    \n    .popup__btns {\n        padding: 3px 16px 16px;\n        display: flex;\n        justify-content: space-between;\n    }\n    \n    .popup__btn .material-icons {\n        font-size: 17px;\n        display: inline-block;\n        vertical-align: sub;\n        margin: 0 5px 0 0;\n    }\n    .popup__loading {\n        display: flex;\n        justify-content: center;\n        align-content: center;\n        flex-wrap: wrap;\n        padding: 20px 0;\n    }\n    \n    .popup__loading-text {\n        width: 100%;\n        font-size: 16px;\n        text-align: center;\n    }\n    \n    .popup__loading-image {\n        max-width: 70px;\n        max-height: 70px;\n        margin: 15px 0 0;\n    }\n    \n    form {\n        width: 100%;\n    }\n    \n    @media only screen and (max-width: 600px) {\n      .popup {\n          min-width: initial;\n          width: 300px;\n          top: 0;\n          margin: 30px 0 50px;\n      }\n      \n      .popup__label {\n          display: block;\n          width: 100%;\n          font-size: 13px;\n          color: #999;\n      }\n      \n      .popup__input {\n          display: block;\n          width: 100%;\n          margin: 0;\n      }    \n    }\n  "],
        animations: [
            animations_1.trigger('fadeInOut', [
                animations_1.state('destroyed', animations_1.style({ opacity: 0 })),
                animations_1.transition(':enter', [
                    animations_1.style({ opacity: 0 }),
                    animations_1.animate('0.2s ease', animations_1.style({ opacity: 1 }))
                ]),
                animations_1.transition('* => destroyed', [
                    animations_1.animate('0.2s ease')
                ])
            ]),
            animations_1.trigger('flyInOut', [
                animations_1.state('destroyed', animations_1.style({ opacity: 0, transform: 'translateX(-10%)' })),
                animations_1.transition(':enter', [
                    animations_1.style({ opacity: 0, transform: 'translateX(-90%)' }),
                    animations_1.animate('0.2s ease', animations_1.style({ opacity: 1, transform: 'translateX(-50%)' }))
                ]),
                animations_1.transition('* => destroyed', [
                    animations_1.animate('0.2s ease')
                ])
            ]),
            animations_1.trigger('expandHeight', [
                animations_1.state('0', animations_1.style({ height: '150px' })),
                animations_1.state('1', animations_1.style({ height: '*' })),
                animations_1.transition('0 => 1', animations_1.animate('0.2s ease'))
            ])
        ],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], PopupComponent);
exports.PopupComponent = PopupComponent;
//# sourceMappingURL=popup.js.map