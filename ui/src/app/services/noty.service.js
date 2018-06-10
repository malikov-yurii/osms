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
import { NotyComponent } from '../ui/index';
var NotyService = /** @class */ (function () {
    function NotyService(compiler) {
        this.compiler = compiler;
    }
    NotyService.prototype.renderNoty = function (message, isError) {
        var notyFactory = this.compiler.resolveComponentFactory(NotyComponent);
        var notyComponent = this.viewContainerRef.createComponent(notyFactory);
        notyComponent.instance.destroyedStream.subscribe(function () {
            notyComponent.destroy();
        });
        if (isError) {
            notyComponent.instance.isError = isError;
            message = JSON.parse(message.text ? message.text() : '{}').detail || message;
            notyComponent.instance.destroy(60000);
        }
        notyComponent.instance.message = message;
    };
    NotyService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ComponentFactoryResolver])
    ], NotyService);
    return NotyService;
}());
export { NotyService };
