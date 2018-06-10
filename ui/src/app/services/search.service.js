var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var SearchService = /** @class */ (function () {
    function SearchService() {
    }
    SearchService.prototype.search = function (items, query, fieldsToSearch) {
        var _this = this;
        if (!(items.length && query)) {
            return items;
        }
        return items.filter(function (item) {
            for (var i = 0; i < fieldsToSearch.length; i++) {
                var fieldValue = item[fieldsToSearch[i]];
                if (fieldValue && _this._ifValueConsistQuery(fieldValue, query)) {
                    return true;
                }
            }
        });
    };
    SearchService.prototype._ifValueConsistQuery = function (value, query) {
        // Return true if given value isn't empty and matches search text
        if (value) {
            value += '';
            return value.toLowerCase().includes(query.toLowerCase());
        }
    };
    SearchService.prototype._deepSearch = function (query, item) {
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                // At first checks in values of given object, e.g. 'firstName/phoneNumber'
                // if no, then goes recursivly and checks in nested object/arrays, e.g. 'orderItemTos'.
                if (this._ifValueConsistQuery(query, item[key])
                    || typeof item[key] === 'object'
                        && this._deepSearch(query, item[key])) {
                    return true;
                }
            }
        }
    };
    SearchService._search = function (query, item) {
    };
    SearchService = __decorate([
        Injectable()
    ], SearchService);
    return SearchService;
}());
export { SearchService };
