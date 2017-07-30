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
var api_1 = require("./services/api");
var popup_1 = require("./services/popup");
var noty_1 = require("./services/noty");
var App = (function () {
    function App(popupService, notyService, viewRef) {
        this.popupService = popupService;
        this.notyService = notyService;
        this.viewRef = viewRef;
    }
    App.prototype.ngOnInit = function () {
        var _this = this;
        this.popupService.viewContainerRef = this.viewRef;
        this.notyService.viewContainerRef = this.viewRef;
        api_1.sessionTimeoutStream.subscribe(function () {
            _this.popupService
                .renderPopup('Warning!', 'You session has timed out!\nPlease, reload the page')
                .subscribe();
        });
    };
    return App;
}());
App = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: '/assets/templates/app.html',
        providers: [popup_1.PopupService]
    }),
    __metadata("design:paramtypes", [popup_1.PopupService,
        noty_1.NotyService,
        core_1.ViewContainerRef])
], App);
exports.App = App;
//# sourceMappingURL=app.js.map