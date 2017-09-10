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
var api_service_1 = require("./services/api.service");
var popup_service_1 = require("./services/popup.service");
var noty_service_1 = require("./services/noty.service");
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
        api_service_1.sessionTimeoutStream.subscribe(function () {
            _this.popupService
                .renderPopup('Warning!', 'You session has timed out!\nPlease, reload the page')
                .subscribe();
        });
    };
    App = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            template: "\n    <nav-header></nav-header>\n    <router-outlet></router-outlet>\n  ",
            providers: [popup_service_1.PopupService]
        }),
        __metadata("design:paramtypes", [popup_service_1.PopupService,
            noty_service_1.NotyService,
            core_1.ViewContainerRef])
    ], App);
    return App;
}());
exports.App = App;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUVwRSxzREFBOEQ7QUFDOUQsMERBQWdFO0FBQ2hFLHdEQUErRDtBQVcvRDtJQUVFLGFBQ1UsWUFBMEIsRUFDMUIsV0FBd0IsRUFDeEIsT0FBeUI7UUFGekIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7SUFDaEMsQ0FBQztJQUVKLHNCQUFRLEdBQVI7UUFBQSxpQkFTQztRQVJDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFakQsa0NBQW9CLENBQUMsU0FBUyxDQUFDO1lBQzdCLEtBQUksQ0FBQyxZQUFZO2lCQUNkLFdBQVcsQ0FBQyxVQUFVLEVBQUUscURBQXFELENBQUM7aUJBQzlFLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWpCVSxHQUFHO1FBVGYsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSwwRUFHVDtZQUNELFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7U0FDMUIsQ0FBQzt5Q0FJd0IsNEJBQVk7WUFDYiwwQkFBVztZQUNmLHVCQUFnQjtPQUx4QixHQUFHLENBbUJmO0lBQUQsVUFBQztDQW5CRCxBQW1CQyxJQUFBO0FBbkJZLGtCQUFHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHNlc3Npb25UaW1lb3V0U3RyZWFtIH0gZnJvbSBcIi4vc2VydmljZXMvYXBpLnNlcnZpY2VcIjtcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9ICAgICAgICAgZnJvbSBcIi4vc2VydmljZXMvcG9wdXAuc2VydmljZVwiO1xuaW1wb3J0IHsgTm90eVNlcnZpY2UgfSAgICAgICAgICBmcm9tIFwiLi9zZXJ2aWNlcy9ub3R5LnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXBwJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmF2LWhlYWRlcj48L25hdi1oZWFkZXI+XG4gICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICBgLFxuICBwcm92aWRlcnM6IFtQb3B1cFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEFwcCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZSxcbiAgICBwcml2YXRlIG5vdHlTZXJ2aWNlOiBOb3R5U2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucG9wdXBTZXJ2aWNlLnZpZXdDb250YWluZXJSZWYgPSB0aGlzLnZpZXdSZWY7XG4gICAgdGhpcy5ub3R5U2VydmljZS52aWV3Q29udGFpbmVyUmVmID0gdGhpcy52aWV3UmVmO1xuXG4gICAgc2Vzc2lvblRpbWVvdXRTdHJlYW0uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucG9wdXBTZXJ2aWNlXG4gICAgICAgIC5yZW5kZXJQb3B1cCgnV2FybmluZyEnLCAnWW91IHNlc3Npb24gaGFzIHRpbWVkIG91dCFcXG5QbGVhc2UsIHJlbG9hZCB0aGUgcGFnZScpXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=
