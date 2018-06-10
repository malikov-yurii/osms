var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var Pagination = /** @class */ (function () {
    function Pagination() {
        this.totalItems = 0;
        this.pageLength = 10;
        this.currentParentPage = 1;
        this.currentPageStream = new BehaviorSubject(1);
        this.pagesToDisplay = 3;
        this.dataChanged = new EventEmitter();
        this.lengthChanged = new EventEmitter();
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
    __decorate([
        Input('total'),
        __metadata("design:type", Number)
    ], Pagination.prototype, "totalItems", void 0);
    __decorate([
        Input('length'),
        __metadata("design:type", Number)
    ], Pagination.prototype, "pageLength", void 0);
    __decorate([
        Input('current'),
        __metadata("design:type", Number)
    ], Pagination.prototype, "currentParentPage", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "dataChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "lengthChanged", void 0);
    Pagination = __decorate([
        Component({
            moduleId: module.id,
            selector: 'pagination',
            templateUrl: 'pagination.html',
            styleUrls: ['./pagination.css']
        })
    ], Pagination);
    return Pagination;
}());
export { Pagination };
