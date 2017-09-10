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
var animations_1 = require("./animations");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpL25vdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEM7QUFDMUMsd0NBQXVDO0FBQ3ZDLDJDQUEwQztBQWlDMUM7SUFPRTtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFFN0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTyx1Q0FBZSxHQUF2QixVQUF3QixDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBRU0sK0JBQU8sR0FBZCxVQUFlLEtBQVk7UUFBM0IsaUJBR0M7UUFIYyxzQkFBQSxFQUFBLFlBQVk7UUFDekIsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLEVBQWpDLENBQWlDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQXpCVSxhQUFhO1FBL0J6QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzUEFTVDtZQUNELE1BQU0sRUFBRSxDQUFDLHdVQWdCUixDQUFDO1lBQ0YsVUFBVSxFQUFFLENBQUMsdUJBQVUsRUFBRSxDQUFDO1NBQzNCLENBQUM7O09BQ1csYUFBYSxDQTJCekI7SUFBRCxvQkFBQztDQTNCRCxBQTJCQyxJQUFBO0FBM0JZLHNDQUFhIiwiZmlsZSI6InVpL25vdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IGFwcGVhck5vdHkgfSBmcm9tIFwiLi9hbmltYXRpb25zXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibm90eVwiXHJcbiAgICAgIFtAYXBwZWFyTm90eV09XCJhbmltYXRpb25TdGF0ZVwiXHJcbiAgICAgIChAYXBwZWFyTm90eS5kb25lKT1cIm9uQW5pbWF0aW9uRG9uZSgkZXZlbnQpXCJcclxuICAgICAgKGNsaWNrKT1cImFuaW1hdGlvblN0YXRlID0gJ2Rlc3Ryb3llZCdcIlxyXG4gICAgICBbY2xhc3MuZXJyb3JdPVwiaXNFcnJvclwiXHJcbiAgICA+XHJcbiAgICAgIHt7IG1lc3NhZ2UgfX1cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLm5vdHkge1xyXG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgIGxlZnQ6IDUwJTtcclxuICAgICAgYm90dG9tOiAwO1xyXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XHJcbiAgICAgIG1pbi13aWR0aDogMjg4cHg7XHJcbiAgICAgIG1heC13aWR0aDogNTY4cHg7XHJcbiAgICAgIHBhZGRpbmc6IDE0cHggMjRweDtcclxuICAgICAgYmFja2dyb3VuZDogIzMyMzIzMjtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgIH1cclxuICAgIC5ub3R5LmVycm9yIHtcclxuICAgICAgYmFja2dyb3VuZDogIzk5MDAwMDtcclxuICAgIH1cclxuICBgXSxcclxuICBhbmltYXRpb25zOiBbYXBwZWFyTm90eSgpXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm90eUNvbXBvbmVudCB7XHJcbiAgcHVibGljIGRlc3Ryb3llZFN0cmVhbTogU3ViamVjdDxhbnk+O1xyXG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgcHVibGljIGlzRXJyb3I6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBhbmltYXRpb25TdGF0ZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgZGVzdHJveVRpbWVvdXQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5kZXN0cm95ZWRTdHJlYW0gPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgdGhpcy5tZXNzYWdlID0gJ05vdHkgbWVzc2FnZSEnO1xyXG4gICAgdGhpcy5pc0Vycm9yID0gZmFsc2U7XHJcbiAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ2lkbGUnO1xyXG5cclxuICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkFuaW1hdGlvbkRvbmUoZSkge1xyXG4gICAgaWYgKGUudG9TdGF0ZSA9PT0gJ2Rlc3Ryb3llZCcpIHtcclxuICAgICAgdGhpcy5kZXN0cm95ZWRTdHJlYW0ubmV4dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koZGVsYXkgPSAzMDAwKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5kZXN0cm95VGltZW91dCk7XHJcbiAgICB0aGlzLmRlc3Ryb3lUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ2Rlc3Ryb3llZCcsIGRlbGF5KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
