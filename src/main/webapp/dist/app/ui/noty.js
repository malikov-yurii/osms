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
var NotyComponent = (function () {
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
    return NotyComponent;
}());
NotyComponent = __decorate([
    core_1.Component({
        template: "\n    <div class=\"noty\"\n      [@appearNoty]=\"animationState\"\n      (@appearNoty.done)=\"onAnimationDone($event)\"\n      (click)=\"animationState = 'destroyed'\"\n      [class.error]=\"isError\"\n    >\n      {{ message }}\n    </div>\n  ",
        styles: ["\n    .noty {\n      position: fixed;\n      left: 50%;\n      bottom: 0;\n      transform: translateX(-50%);\n      min-width: 288px;\n      max-width: 568px;\n      padding: 14px 24px;\n      background: #323232;\n      border-radius: 2px;\n      color: #fff;\n    }\n    .noty.error {\n      background: #990000;\n    }\n  "],
        animations: [animations_1.appearNoty()]
    }),
    __metadata("design:paramtypes", [])
], NotyComponent);
exports.NotyComponent = NotyComponent;
//# sourceMappingURL=noty.js.map