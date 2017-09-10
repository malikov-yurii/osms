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
var PopupComponent = /** @class */ (function () {
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
    PopupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'popup.html',
            styleUrls: ['./popup.css'],
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
    return PopupComponent;
}());
exports.PopupComponent = PopupComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLENBQUM7d0JBQ2xELG9CQUFPLENBQUMsV0FBVyxFQUFFLGtCQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBQyxDQUFDLENBQUM7cUJBQ3pFLENBQUM7b0JBQ0YsdUJBQVUsQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDM0Isb0JBQU8sQ0FBQyxXQUFXLENBQUM7cUJBQ3JCLENBQUM7aUJBQ0gsQ0FBQztnQkFDRixvQkFBTyxDQUFDLGNBQWMsRUFBRTtvQkFDdEIsa0JBQUssQ0FBQyxHQUFHLEVBQUUsa0JBQUssQ0FBQyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO29CQUNwQyxrQkFBSyxDQUFDLEdBQUcsRUFBRSxrQkFBSyxDQUFDLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7b0JBQ2hDLHVCQUFVLENBQUMsUUFBUSxFQUFFLG9CQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQzNDLENBQUM7YUFDSDtTQUNGLENBQUM7eUNBV2lDLG1CQUFXO09BVmpDLGNBQWMsQ0F5QzFCO0lBQUQscUJBQUM7Q0F6Q0QsQUF5Q0MsSUFBQTtBQXpDWSx3Q0FBYyIsImZpbGUiOiJ1aS9wb3B1cC9wb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlVXJsOiAncG9wdXAuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcG9wdXAuY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignZmFkZUluT3V0JywgW1xyXG4gICAgICBzdGF0ZSgnZGVzdHJveWVkJywgc3R5bGUoe29wYWNpdHk6IDB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxyXG4gICAgICAgIGFuaW1hdGUoJzAuMnMgZWFzZScsIHN0eWxlKHtvcGFjaXR5OiAxfSkpXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IGRlc3Ryb3llZCcsIFtcclxuICAgICAgICBhbmltYXRlKCcwLjJzIGVhc2UnKVxyXG4gICAgICBdKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdmbHlJbk91dCcsIFtcclxuICAgICAgc3RhdGUoJ2Rlc3Ryb3llZCcsIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC0xMCUpJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC05MCUpJ30pLFxyXG4gICAgICAgIGFuaW1hdGUoJzAuMnMgZWFzZScsIHN0eWxlKHtvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJ30pKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignKiA9PiBkZXN0cm95ZWQnLCBbXHJcbiAgICAgICAgYW5pbWF0ZSgnMC4ycyBlYXNlJylcclxuICAgICAgXSlcclxuICAgIF0pLFxyXG4gICAgdHJpZ2dlcignZXhwYW5kSGVpZ2h0JywgW1xyXG4gICAgICBzdGF0ZSgnMCcsIHN0eWxlKHtoZWlnaHQ6ICcxNTBweCd9KSksXHJcbiAgICAgIHN0YXRlKCcxJywgc3R5bGUoe2hlaWdodDogJyonfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCcwID0+IDEnLCBhbmltYXRlKCcwLjJzIGVhc2UnKSlcclxuICAgIF0pXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBvcHVwQ29tcG9uZW50IHtcclxuICBwcml2YXRlIGRhdGEgPSB7fTtcclxuICBwcml2YXRlIGZvcm06IEZvcm1Hcm91cDtcclxuICBwcml2YXRlIGhhc0RhdGE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIGhhc0Zvcm1EYXRhOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBhbmltYXRpb25TdGF0ZTogc3RyaW5nID0gJ2lkbGUnO1xyXG4gIHB1YmxpYyBoZWFkZXI6IHN0cmluZyA9ICdQb3B1cCBoZWFkZXInO1xyXG4gIHB1YmxpYyBkZXN0cm95ZWRTdHJlYW0gPSBuZXcgU3ViamVjdCgpO1xyXG4gIHB1YmxpYyBzdWJtaXR0ZWRTdHJlYW0gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge31cclxuXHJcbiAgcHJvdmlkZVdpdGhEYXRhKGRhdGE6IGFueSkge1xyXG4gICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIHRoaXMuaGFzRGF0YSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcm92aWRlV2l0aEZvcm1EYXRhKGRhdGE6IHthbnl9KSB7XHJcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgdGhpcy5oYXNGb3JtRGF0YSA9IHRydWU7XHJcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgb25TdWJtaXQoKSB7XHJcbiAgICB0aGlzLnN1Ym1pdHRlZFN0cmVhbS5uZXh0KHRoaXMuZm9ybS52YWx1ZSk7XHJcbiAgICB0aGlzLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnZGVzdHJveWVkJztcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5mb3JtLnJlc2V0KHRoaXMuZGF0YSk7XHJcbiAgfVxyXG5cclxuICBvbkFuaW1hdGlvbkRvbmUoZSkge1xyXG4gICAgaWYgKGUudG9TdGF0ZSA9PT0gJ2Rlc3Ryb3llZCcpIHtcclxuICAgICAgdGhpcy5kZXN0cm95ZWRTdHJlYW0ubmV4dCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
