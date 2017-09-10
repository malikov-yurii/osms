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
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
var AutocompleteList = /** @class */ (function () {
    function AutocompleteList(viewRef) {
        var _this = this;
        this.viewRef = viewRef;
        this.list = [];
        this.focusMoved = new Subject_1.Subject();
        this.selectedStream = new Subject_1.Subject();
        this.selectedIndex = 0;
        this.selectedSource = this.selectedStream.map(function () {
            return Observable_1.Observable.of(_this.list[_this.selectedIndex]);
        });
    }
    AutocompleteList.prototype.ngOnInit = function () {
        var _this = this;
        this.focusMoved.subscribe(function (direction) {
            if (direction === 'next' && _this.selectedIndex < _this.list.length - 1) {
                _this.selectedIndex++;
            }
            else if (direction === 'prev' && _this.selectedIndex > 0) {
                _this.selectedIndex--;
            }
            _this.resolveScroll();
        });
    };
    AutocompleteList.prototype.onClick = function () {
        console.log(this.selectedIndex);
        console.log(this.list[this.selectedIndex]);
        this.selectedStream.next();
    };
    AutocompleteList.prototype.setSelected = function (index) {
        this.selectedIndex = index;
    };
    AutocompleteList.prototype.resolveScroll = function () {
        var activeEl = this.viewRef.element.nativeElement.querySelector('.active');
        activeEl.scrollIntoViewIfNeeded();
    };
    AutocompleteList = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'autocomplete-list.html'
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], AutocompleteList);
    return AutocompleteList;
}());
exports.AutocompleteList = AutocompleteList;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpL2F1dG9jb21wbGV0ZS1saXN0L2F1dG9jb21wbGV0ZS1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBQ3BFLHdDQUF1QztBQUN2Qyw4Q0FBNkM7QUFDN0MsaUNBQStCO0FBQy9CLGtDQUFnQztBQVFoQztJQVdFLDBCQUFxQixPQUF5QjtRQUE5QyxpQkFNQztRQU5vQixZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQVR2QyxTQUFJLEdBQXVCLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFDM0IsbUJBQWMsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUU5QixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQU9oQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFXQztRQVRDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsU0FBUztZQUNqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN2QixDQUFDO1lBQ0QsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQUVELGtDQUFPLEdBQVA7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsc0NBQVcsR0FBWCxVQUFZLEtBQUs7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRUQsd0NBQWEsR0FBYjtRQUNFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0UsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQTdDVSxnQkFBZ0I7UUFKNUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3RDLENBQUM7eUNBWThCLHVCQUFnQjtPQVhuQyxnQkFBZ0IsQ0FpRDVCO0lBQUQsdUJBQUM7Q0FqREQsQUFpREMsSUFBQTtBQWpEWSw0Q0FBZ0IiLCJmaWxlIjoidWkvYXV0b2NvbXBsZXRlLWxpc3QvYXV0b2NvbXBsZXRlLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzL1N1YmplY3RcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvb2YnO1xuXG5pbXBvcnQgeyBBdXRvY29tcGxldGVJdGVtIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiAnYXV0b2NvbXBsZXRlLWxpc3QuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlTGlzdCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIGxpc3Q6IEF1dG9jb21wbGV0ZUl0ZW1bXSA9IFtdO1xuICBwdWJsaWMgZm9jdXNNb3ZlZCA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBzZWxlY3RlZFN0cmVhbSA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBzZWxlY3RlZFNvdXJjZTtcbiAgcHJpdmF0ZSBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuXG4gIHB1YmxpYyBzdHlsZVRvcDtcbiAgcHVibGljIHN0eWxlTGVmdDtcblxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG5cbiAgICB0aGlzLnNlbGVjdGVkU291cmNlID0gdGhpcy5zZWxlY3RlZFN0cmVhbS5tYXAoKCkgPT4ge1xuICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodGhpcy5saXN0W3RoaXMuc2VsZWN0ZWRJbmRleF0pO1xuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIHRoaXMuZm9jdXNNb3ZlZC5zdWJzY3JpYmUoZGlyZWN0aW9uID0+IHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICduZXh0JyAmJiB0aGlzLnNlbGVjdGVkSW5kZXggPCB0aGlzLmxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXgrKztcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncHJldicgJiYgdGhpcy5zZWxlY3RlZEluZGV4ID4gMCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzb2x2ZVNjcm9sbCgpO1xuICAgIH0pO1xuXG4gIH1cblxuICBvbkNsaWNrKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgY29uc29sZS5sb2codGhpcy5saXN0W3RoaXMuc2VsZWN0ZWRJbmRleF0pO1xuICAgIHRoaXMuc2VsZWN0ZWRTdHJlYW0ubmV4dCgpO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWQoaW5kZXgpIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIHJlc29sdmVTY3JvbGwoKSB7XG4gICAgbGV0IGFjdGl2ZUVsID0gdGhpcy52aWV3UmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gICAgYWN0aXZlRWwuc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCgpO1xuICB9XG5cblxuXG59XG4iXX0=
