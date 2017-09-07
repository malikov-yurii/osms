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
var index_1 = require("../ui/index");
var NotyService = (function () {
    function NotyService(compiler) {
        this.compiler = compiler;
    }
    NotyService.prototype.renderNoty = function (message, isError) {
        var notyFactory = this.compiler.resolveComponentFactory(index_1.NotyComponent);
        var notyComponent = this.viewContainerRef.createComponent(notyFactory);
        notyComponent.instance.destroyedStream.subscribe(function () {
            notyComponent.destroy();
        });
        if (isError) {
            notyComponent.instance.isError = isError;
            message = JSON.parse(message.text()).detail || message;
        }
        notyComponent.instance.message = message;
    };
    return NotyService;
}());
NotyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
], NotyService);
exports.NotyService = NotyService;
//# sourceMappingURL=noty.js.map