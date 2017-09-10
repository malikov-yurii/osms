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
var Subject_1 = require("rxjs/Subject");
var animations_1 = require("../animations");
var NotyComponent = /** @class */ (function () {
    function NotyComponent() {
        this.destroyedStream = new Subject_1.Subject();
        this.message = 'Noty message!';
        this.isError = false;
        this.animationState = 'idle';
        this.destroy();
    }
    NotyComponent.prototype.onAnimationDone = function (e) {
        if (e.toState === 'destroyed') {
            this.destroyedStream.next();
        }
    };
    NotyComponent.prototype.destroy = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 3000; }
        clearTimeout(this.destroyTimeout);
        this.destroyTimeout = setTimeout(function () { return _this.animationState = 'destroyed'; }, delay);
    };
    NotyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            template: "\n    <div class=\"noty\"\n      [@appearNoty]=\"animationState\"\n      (@appearNoty.done)=\"onAnimationDone($event)\"\n      (click)=\"animationState = 'destroyed'\"\n      [class.error]=\"isError\"\n    >\n      {{ message }}\n    </div>\n  ",
            styles: ["\n    .noty {\n      position: fixed;\n      left: 50%;\n      bottom: 0;\n      transform: translateX(-50%);\n      min-width: 288px;\n      max-width: 568px;\n      padding: 14px 24px;\n      background: #323232;\n      border-radius: 2px;\n      color: #fff;\n    }\n    .noty.error {\n      background: #990000;\n    }\n  "],
            animations: [animations_1.appearNoty()]
        }),
        __metadata("design:paramtypes", [])
    ], NotyComponent);
    return NotyComponent;
}());
exports.NotyComponent = NotyComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpL25vdHkvbm90eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEwQztBQUMxQyx3Q0FBdUM7QUFDdkMsNENBQTJDO0FBaUMzQztJQU9FO1FBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUU3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLHVDQUFlLEdBQXZCLFVBQXdCLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFTSwrQkFBTyxHQUFkLFVBQWUsS0FBWTtRQUEzQixpQkFHQztRQUhjLHNCQUFBLEVBQUEsWUFBWTtRQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsRUFBakMsQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBekJVLGFBQWE7UUEvQnpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHNQQVNUO1lBQ0QsTUFBTSxFQUFFLENBQUMsd1VBZ0JSLENBQUM7WUFDRixVQUFVLEVBQUUsQ0FBQyx1QkFBVSxFQUFFLENBQUM7U0FDM0IsQ0FBQzs7T0FDVyxhQUFhLENBMkJ6QjtJQUFELG9CQUFDO0NBM0JELEFBMkJDLElBQUE7QUEzQlksc0NBQWEiLCJmaWxlIjoidWkvbm90eS9ub3R5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBhcHBlYXJOb3R5IH0gZnJvbSBcIi4uL2FuaW1hdGlvbnNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJub3R5XCJcclxuICAgICAgW0BhcHBlYXJOb3R5XT1cImFuaW1hdGlvblN0YXRlXCJcclxuICAgICAgKEBhcHBlYXJOb3R5LmRvbmUpPVwib25BbmltYXRpb25Eb25lKCRldmVudClcIlxyXG4gICAgICAoY2xpY2spPVwiYW5pbWF0aW9uU3RhdGUgPSAnZGVzdHJveWVkJ1wiXHJcbiAgICAgIFtjbGFzcy5lcnJvcl09XCJpc0Vycm9yXCJcclxuICAgID5cclxuICAgICAge3sgbWVzc2FnZSB9fVxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAubm90eSB7XHJcbiAgICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgICAgbGVmdDogNTAlO1xyXG4gICAgICBib3R0b206IDA7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcclxuICAgICAgbWluLXdpZHRoOiAyODhweDtcclxuICAgICAgbWF4LXdpZHRoOiA1NjhweDtcclxuICAgICAgcGFkZGluZzogMTRweCAyNHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjMzIzMjMyO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAycHg7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgfVxyXG4gICAgLm5vdHkuZXJyb3Ige1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjOTkwMDAwO1xyXG4gICAgfVxyXG4gIGBdLFxyXG4gIGFuaW1hdGlvbnM6IFthcHBlYXJOb3R5KCldXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3R5Q29tcG9uZW50IHtcclxuICBwdWJsaWMgZGVzdHJveWVkU3RyZWFtOiBTdWJqZWN0PGFueT47XHJcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcclxuICBwdWJsaWMgaXNFcnJvcjogYm9vbGVhbjtcclxuICBwcml2YXRlIGFuaW1hdGlvblN0YXRlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBkZXN0cm95VGltZW91dDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3llZFN0cmVhbSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSAnTm90eSBtZXNzYWdlISc7XHJcbiAgICB0aGlzLmlzRXJyb3IgPSBmYWxzZTtcclxuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnaWRsZSc7XHJcblxyXG4gICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQW5pbWF0aW9uRG9uZShlKSB7XHJcbiAgICBpZiAoZS50b1N0YXRlID09PSAnZGVzdHJveWVkJykge1xyXG4gICAgICB0aGlzLmRlc3Ryb3llZFN0cmVhbS5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveShkZWxheSA9IDMwMDApIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmRlc3Ryb3lUaW1lb3V0KTtcclxuICAgIHRoaXMuZGVzdHJveVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnZGVzdHJveWVkJywgZGVsYXkpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
