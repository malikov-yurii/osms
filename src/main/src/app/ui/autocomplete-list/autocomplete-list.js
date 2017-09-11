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
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
var AutocompleteList = /** @class */ (function () {
    function AutocompleteList(viewRef) {
        var _this = this;
        this.viewRef = viewRef;
        this.list = [];
        this.focusMoved = new Subject();
        this.selectedStream = new Subject();
        this.selectedIndex = 0;
        this.selectedSource = this.selectedStream.map(function () {
            return Observable.of(_this.list[_this.selectedIndex]);
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
        Component({
            moduleId: module.id,
            templateUrl: 'autocomplete-list.html'
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], AutocompleteList);
    return AutocompleteList;
}());
export { AutocompleteList };
