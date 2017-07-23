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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Pagination = (function () {
    function Pagination() {
        this.totalItems = 0;
        this.pageLength = 10;
        this.currentParentPage = 1;
        this.currentPageStream = new BehaviorSubject_1.BehaviorSubject(1);
        this.pagesToDisplay = 3;
        this.dataChanged = new core_1.EventEmitter();
        this.lengthChanged = new core_1.EventEmitter();
    }
    Pagination.prototype.ngOnInit = function () {
        var _this = this;
        this.currentPageStream.subscribe(function (page) {
            _this.currentPageNumber = page;
            _this.setPages();
        });
    };
    Pagination.prototype.ngOnChanges = function () {
        this.lastPage = Math.ceil(this.totalItems / this.pageLength);
        this.setPages();
        this.currentPageStream.next(this.currentParentPage);
    };
    Pagination.prototype.selectPage = function (page) {
        if (page > 0) {
            this.currentPageStream.next(page);
            this.dataChanged.emit({ page: page, length: this.pageLength });
        }
    };
    Pagination.prototype.changeLength = function (length) {
        this.dataChanged.emit({ page: 1, length: +length });
    };
    Pagination.prototype.getPrevPage = function () {
        if (this.currentPageNumber > 1) {
            return --this.currentPageNumber;
        }
    };
    Pagination.prototype.getNextPage = function () {
        if (this.currentPageNumber < this.lastPage) {
            return ++this.currentPageNumber;
        }
    };
    Pagination.prototype.getLastPage = function () {
        return this.lastPage;
    };
    Pagination.prototype.setPages = function () {
        var start = 2;
        var current = this.currentPageNumber;
        var ptd = this.pagesToDisplay;
        var end = ptd;
        if (current <= ptd + 1) {
            end = 4;
        }
        if (current > ptd + 1) {
            start = current - 1;
            if (current >= this.lastPage - ptd) {
                start = this.lastPage - ptd - 1;
                end = 4;
            }
        }
        if (this.lastPage <= ptd + 4) {
            start = 2;
            end = ptd + 2;
            if (this.lastPage <= ptd + 2) {
                end = this.lastPage - 2;
            }
        }
        this.pages = Array.from(new Array(Math.max(0, end)), function (v, i) { return i + start; });
    };
    Pagination.prototype.isPrevSpreadShown = function () {
        return this.lastPage > this.pagesToDisplay + 4 && this.currentPageNumber > this.pagesToDisplay + 1;
    };
    Pagination.prototype.isNextSpreadShown = function () {
        return this.lastPage > this.pagesToDisplay + 4 && this.currentPageNumber < this.lastPage - this.pagesToDisplay;
    };
    return Pagination;
}());
__decorate([
    core_1.Input('total'),
    __metadata("design:type", Number)
], Pagination.prototype, "totalItems", void 0);
__decorate([
    core_1.Input('length'),
    __metadata("design:type", Number)
], Pagination.prototype, "pageLength", void 0);
__decorate([
    core_1.Input('current'),
    __metadata("design:type", Number)
], Pagination.prototype, "currentParentPage", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], Pagination.prototype, "dataChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], Pagination.prototype, "lengthChanged", void 0);
Pagination = __decorate([
    core_1.Component({
        selector: 'pagination',
        template: "\n    <div class=\"pagination\">\n    \n      <div class=\"pagination__info\">\n        Displaying {{ (currentPageNumber - 1) * pageLength + 1}} \u2013 {{ currentPageNumber * pageLength }} of {{ totalItems }} items\n      </div>\n      \n      <div class=\"pagination__right\">\n        <select name=\"\" id=\"\" class=\"pagination__length\"\n          (change)=\"changeLength($event.target.value)\"\n        >\n          <option\n            *ngFor=\"let value of [10, 20, 50, 100, 200]\"\n            value=\"{{ value }}\"\n            [attr.selected]=\"value === pageLength ? '' : null\"\n          >\n            {{ value }}\n          </option>\n        </select>\n  \n        <ul class=\"pagination__selector\"\n          *ngIf=\"totalItems > pageLength\"\n        >\n          <li (click)=\"selectPage(getPrevPage())\">Prev</li>\n          <li (click)=\"selectPage(1)\" [class.active]=\"currentPageNumber === 1\">1</li>        \n          <li *ngIf=\"isPrevSpreadShown()\">...</li>\n          \n          <li \n            *ngFor=\"let page of pages\"\n            [class.active]=\"page === currentPageNumber\"\n            (click)=\"selectPage(page)\"\n          >\n            {{ page }}\n          </li>\n          \n          <li *ngIf=\"isNextSpreadShown()\">...</li>\n          <li\n            (click)=\"selectPage(lastPage)\"\n            [class.active]=\"currentPageNumber === lastPage\"\n          >\n            {{ lastPage }}\n          </li>\n          <li (click)=\"selectPage(getNextPage())\">Next</li>\n        </ul>\n        \n      </div>\n    </div>\n  ",
        styles: ["\n    .pagination {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin: 20px 0;\n    }\n    .pagination__right {\n      text-align: right;\n    }\n    .pagination__selector {\n      display: flex;\n      list-style: none;\n    }    \n    .pagination__selector li {\n      padding: 5px 10px;\n      user-select: none;\n      cursor: pointer;\n    }\n    .pagination__selector li:hover,\n    .pagination__selector .active {\n      background: #f0f0f0;\n    }\n  "]
    })
], Pagination);
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map