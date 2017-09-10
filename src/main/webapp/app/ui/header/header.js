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
var animations_1 = require("../animations");
var Header = /** @class */ (function () {
    function Header() {
        this.menuState = 'collapsed';
    }
    Header.prototype.toggleMenuState = function () {
        this.menuState = this.menuState === 'collapsed' ? 'expanded' : 'collapsed';
    };
    Header = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'nav-header',
            templateUrl: '/app/ui/header/header.html',
            styleUrls: ['./header.css'],
            animations: [animations_1.fadeInOut({ paramsVoid: 'collapsed', paramsAny: 'expanded' })]
        }),
        __metadata("design:paramtypes", [])
    ], Header);
    return Header;
}());
exports.Header = Header;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpL2hlYWRlci9oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEM7QUFFMUMsNENBQTBDO0FBUzFDO0lBR0U7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0NBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsS0FBSyxXQUFXLEdBQUcsVUFBVSxHQUFHLFdBQVcsQ0FBQztJQUM3RSxDQUFDO0lBVFUsTUFBTTtRQVBsQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQzNCLFVBQVUsRUFBRSxDQUFDLHNCQUFTLENBQUMsRUFBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1NBQzFFLENBQUM7O09BQ1csTUFBTSxDQVVsQjtJQUFELGFBQUM7Q0FWRCxBQVVDLElBQUE7QUFWWSx3QkFBTSIsImZpbGUiOiJ1aS9oZWFkZXIvaGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBmYWRlSW5PdXQgfSBmcm9tICcuLi9hbmltYXRpb25zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICduYXYtaGVhZGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy9hcHAvdWkvaGVhZGVyL2hlYWRlci5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9oZWFkZXIuY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW2ZhZGVJbk91dCh7cGFyYW1zVm9pZDogJ2NvbGxhcHNlZCcsIHBhcmFtc0FueTogJ2V4cGFuZGVkJ30pXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSGVhZGVyIHtcclxuICBwcml2YXRlIG1lbnVTdGF0ZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWVudVN0YXRlID0gJ2NvbGxhcHNlZCc7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVNZW51U3RhdGUoKSB7XHJcbiAgICB0aGlzLm1lbnVTdGF0ZSA9IHRoaXMubWVudVN0YXRlID09PSAnY29sbGFwc2VkJyA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJztcclxuICB9XHJcbn1cclxuIl19
