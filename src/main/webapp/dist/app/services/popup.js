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
require("rxjs/add/operator/delay");
var index_1 = require("../ui/index");
var PopupService = (function () {
    function PopupService(compiler) {
        this.compiler = compiler;
        this.popupComponent = undefined;
    }
    PopupService.prototype.renderPopup = function () {
        var _this = this;
        var popupFactory = this.compiler.resolveComponentFactory(index_1.PopupComponent);
        this.popupComponent = this.viewContainerRef.createComponent(popupFactory);
        this.popupComponent.instance.destroyedStream.delay(180).subscribe(function () {
            _this.popupComponent.destroy();
        });
        return this.popupComponent.instance.submittedStream;
    };
    PopupService.prototype.onProvideWithData = function (data) {
        this.popupComponent.instance.provideWithData(data);
    };
    return PopupService;
}());
PopupService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
], PopupService);
exports.PopupService = PopupService;
//# sourceMappingURL=popup.js.map