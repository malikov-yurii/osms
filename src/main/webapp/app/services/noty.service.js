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
var NotyService = /** @class */ (function () {
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
            notyComponent.instance.destroy(60000);
        }
        notyComponent.instance.message = message;
    };
    NotyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], NotyService);
    return NotyService;
}());
exports.NotyService = NotyService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL25vdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFxRztBQUVyRyxxQ0FBNEM7QUFHNUM7SUFHRSxxQkFBb0IsUUFBa0M7UUFBbEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7SUFBRyxDQUFDO0lBRTFELGdDQUFVLEdBQVYsVUFBVyxPQUFPLEVBQUUsT0FBUTtRQUMxQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLHFCQUFhLENBQUMsQ0FBQztRQUN2RSxJQUFJLGFBQWEsR0FBZ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwRyxhQUFhLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7WUFDL0MsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN6QyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDO1lBQ3ZELGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFFM0MsQ0FBQztJQXBCVSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBSW1CLCtCQUF3QjtPQUgzQyxXQUFXLENBc0J2QjtJQUFELGtCQUFDO0NBdEJELEFBc0JDLElBQUE7QUF0Qlksa0NBQVciLCJmaWxlIjoic2VydmljZXMvbm90eS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ29tcG9uZW50UmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vdHlDb21wb25lbnQgfSBmcm9tICcuLi91aS9pbmRleCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOb3R5U2VydmljZSB7XHJcbiAgcHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcGlsZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cclxuXHJcbiAgcmVuZGVyTm90eShtZXNzYWdlLCBpc0Vycm9yPykge1xyXG4gICAgbGV0IG5vdHlGYWN0b3J5ID0gdGhpcy5jb21waWxlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOb3R5Q29tcG9uZW50KTtcclxuICAgIGxldCBub3R5Q29tcG9uZW50OiBDb21wb25lbnRSZWY8Tm90eUNvbXBvbmVudD4gPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KG5vdHlGYWN0b3J5KTtcclxuXHJcbiAgICBub3R5Q29tcG9uZW50Lmluc3RhbmNlLmRlc3Ryb3llZFN0cmVhbS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBub3R5Q29tcG9uZW50LmRlc3Ryb3koKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpc0Vycm9yKSB7XHJcbiAgICAgIG5vdHlDb21wb25lbnQuaW5zdGFuY2UuaXNFcnJvciA9IGlzRXJyb3I7XHJcbiAgICAgIG1lc3NhZ2UgPSBKU09OLnBhcnNlKG1lc3NhZ2UudGV4dCgpKS5kZXRhaWwgfHwgbWVzc2FnZTtcclxuICAgICAgbm90eUNvbXBvbmVudC5pbnN0YW5jZS5kZXN0cm95KDYwMDAwKTtcclxuICAgIH1cclxuICAgIG5vdHlDb21wb25lbnQuaW5zdGFuY2UubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl19
