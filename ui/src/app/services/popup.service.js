var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import 'rxjs/add/operator/delay';
import { PopupComponent } from '../ui/index';
var PopupService = /** @class */ (function () {
    function PopupService(compiler) {
        this.compiler = compiler;
        this.popupComponent = undefined;
    }
    PopupService.prototype.renderPopup = function (type, header, data) {
        var _this = this;
        var popupFactory = this.compiler.resolveComponentFactory(PopupComponent);
        this.popupComponent = this.viewContainerRef.createComponent(popupFactory);
        this.popupComponent.instance.destroyedStream.subscribe(function () {
            _this.popupComponent.destroy();
        });
        this.popupComponent.instance.header = header;
        switch (type) {
            case 'data':
                this.popupComponent.instance.provideWithData(data);
                break;
            case 'image':
                this.popupComponent.instance.provideWithImage(data);
                break;
        }
        return this.popupComponent.instance.submittedStream;
    };
    PopupService.prototype.onProvideWithFormData = function (data) {
        this.popupComponent.instance.provideWithFormData(data);
    };
    PopupService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ComponentFactoryResolver])
    ], PopupService);
    return PopupService;
}());
export { PopupService };
