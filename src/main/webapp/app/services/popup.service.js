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
var PopupService = /** @class */ (function () {
    function PopupService(compiler) {
        this.compiler = compiler;
        this.popupComponent = undefined;
    }
    PopupService.prototype.renderPopup = function (header, data) {
        var _this = this;
        var popupFactory = this.compiler.resolveComponentFactory(index_1.PopupComponent);
        this.popupComponent = this.viewContainerRef.createComponent(popupFactory);
        this.popupComponent.instance.destroyedStream.subscribe(function () {
            _this.popupComponent.destroy();
        });
        this.popupComponent.instance.header = header;
        if (data) {
            this.popupComponent.instance.provideWithData(data);
        }
        return this.popupComponent.instance.submittedStream;
    };
    PopupService.prototype.onProvideWithFormData = function (data) {
        this.popupComponent.instance.provideWithFormData(data);
    };
    PopupService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], PopupService);
    return PopupService;
}());
exports.PopupService = PopupService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3BvcHVwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBcUc7QUFDckcsbUNBQWlDO0FBRWpDLHFDQUE2QztBQUc3QztJQUlFLHNCQUFvQixRQUFrQztRQUFsQyxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUY5QyxtQkFBYyxHQUFpQyxTQUFTLENBQUM7SUFFUixDQUFDO0lBRTFELGtDQUFXLEdBQVgsVUFBWSxNQUFNLEVBQUUsSUFBVTtRQUE5QixpQkFjQztRQWJDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsc0JBQWMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO1lBQ3JELEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDdEQsQ0FBQztJQUVELDRDQUFxQixHQUFyQixVQUFzQixJQUFXO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUF4QlUsWUFBWTtRQUR4QixpQkFBVSxFQUFFO3lDQUttQiwrQkFBd0I7T0FKM0MsWUFBWSxDQTRCeEI7SUFBRCxtQkFBQztDQTVCRCxBQTRCQyxJQUFBO0FBNUJZLG9DQUFZIiwiZmlsZSI6InNlcnZpY2VzL3BvcHVwLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBDb21wb25lbnRSZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kZWxheSc7XG5cbmltcG9ydCB7IFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi4vdWkvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9wdXBTZXJ2aWNlIHtcbiAgcHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWY7XG4gIHByaXZhdGUgcG9wdXBDb21wb25lbnQ6IENvbXBvbmVudFJlZjxQb3B1cENvbXBvbmVudD4gPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21waWxlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxuXG4gIHJlbmRlclBvcHVwKGhlYWRlciwgZGF0YT86IGFueSkge1xuICAgIGxldCBwb3B1cEZhY3RvcnkgPSB0aGlzLmNvbXBpbGVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBvcHVwQ29tcG9uZW50KTtcbiAgICB0aGlzLnBvcHVwQ29tcG9uZW50ID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChwb3B1cEZhY3RvcnkpO1xuXG4gICAgdGhpcy5wb3B1cENvbXBvbmVudC5pbnN0YW5jZS5kZXN0cm95ZWRTdHJlYW0uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucG9wdXBDb21wb25lbnQuZGVzdHJveSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wb3B1cENvbXBvbmVudC5pbnN0YW5jZS5oZWFkZXIgPSBoZWFkZXI7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMucG9wdXBDb21wb25lbnQuaW5zdGFuY2UucHJvdmlkZVdpdGhEYXRhKGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBvcHVwQ29tcG9uZW50Lmluc3RhbmNlLnN1Ym1pdHRlZFN0cmVhbTtcbiAgfVxuXG4gIG9uUHJvdmlkZVdpdGhGb3JtRGF0YShkYXRhOiB7YW55fSkge1xuICAgIHRoaXMucG9wdXBDb21wb25lbnQuaW5zdGFuY2UucHJvdmlkZVdpdGhGb3JtRGF0YShkYXRhKTtcbiAgfVxuXG5cblxufVxuIl19
