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
var AutocompleteList = (function () {
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
    return AutocompleteList;
}());
AutocompleteList = __decorate([
    core_1.Component({
        template: "\n    <ul class=\"autocomplete\"\n      [style.top]=\"styleTop + 'px'\"\n      [style.left]=\"styleLeft + 'px'\"\n      (click)=\"onClick()\"\n    >\n      \n      <li \n        *ngFor=\"let item of list; let i = index;\"\n        (mouseenter)=\"setSelected(i)\"\n        [class.active]=\"i === selectedIndex\"\n      >\n        {{ item.label }}\n      </li>\n    \n    </ul>\n  "
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], AutocompleteList);
exports.AutocompleteList = AutocompleteList;
//# sourceMappingURL=autocomplete-list.js.map