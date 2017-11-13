var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewContainerRef } from '@angular/core';
import { sessionTimeoutStream } from "./services/api.service";
import { PopupService } from "./services/popup.service";
import { NotyService } from "./services/noty.service";
var App = /** @class */ (function () {
    function App(popupService, notyService, viewRef) {
        this.popupService = popupService;
        this.notyService = notyService;
        this.viewRef = viewRef;
    }
    App.prototype.ngOnInit = function () {
        var _this = this;
        this.popupService.viewContainerRef = this.viewRef;
        this.notyService.viewContainerRef = this.viewRef;
        sessionTimeoutStream.subscribe(function () {
            _this.popupService
                .renderPopup('Warning!', 'You session has timed out!\nPlease, reload the page')
                .subscribe();
        });
    };
    App = __decorate([
        Component({
            moduleId: module.id,
            selector: 'app',
            template: "\n    <nav-header></nav-header>\n    <router-outlet></router-outlet>\n  ",
            providers: [PopupService]
        }),
        __metadata("design:paramtypes", [PopupService,
            NotyService,
            ViewContainerRef])
    ], App);
    return App;
}());
export { App };
