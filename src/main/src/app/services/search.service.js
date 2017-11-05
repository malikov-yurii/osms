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
    SearchService_1 = SearchService;
    SearchService.prototype.search = function (items, searchQuery) {
        // To enable deep search, change "_search" to "_deepSearch" in following line
        return items.length && searchQuery ? items.filter(SearchService_1._deepSearch.bind(this, searchQuery)) : items;
    };
    SearchService._ifValueConsistQuery = function (query, value) {
        // Return true if given value isn't empty and matches search text
        if (value) {
            value += '';
            return value.toLowerCase().indexOf(query.toLowerCase()) > -1;
        }
    };
    SearchService._deepSearch = function (query, item) {
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                // At first checks in values of given object, e.g. 'firstName/phoneNumber'
                // if no, then goes recursivly and checks in nested object/arrays, e.g. 'orderItemTos'.
                if (SearchService_1._ifValueConsistQuery(query, item[key])
                    || typeof item[key] === 'object'
                        && SearchService_1._deepSearch(query, item[key])) {
                    return true;
                }
            }
        }
    };
    SearchService._search = function (query, item) {
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                // Checks in values of given object, e.g. 'firstName/phoneNumber'
                if (SearchService_1._ifValueConsistQuery(query, item[key])) {
                    return true;
                }
            }
        }
    };
    SearchService = SearchService_1 = __decorate([
        Injectable()
    ], SearchService);
    return SearchService;
    var SearchService_1;
}());
export { SearchService };
