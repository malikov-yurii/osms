"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchService = (function () {
    function SearchService() {
    }
    SearchService.prototype.search = function (items, searchQuery) {
        function _ifValueConsistQuery(value) {
            // Return true if given value isn't empty and matches search text
            if (value) {
                value += '';
                return value.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
            }
        }
        function _deepSearch(item) {
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    // At first checks in values of given object, e.g. 'firstName/phoneNumber'
                    // if no, then goes recursivly and checks in nested object/arrays, e.g. 'orderItemTos'.
                    if (_ifValueConsistQuery(item[key]) || typeof item[key] === 'object' && _deepSearch(item[key])) {
                        return true;
                    }
                }
            }
        }
        function _search(item) {
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    // Checks in values of given object, e.g. 'firstName/phoneNumber'
                    if (_ifValueConsistQuery(item[key])) {
                        return true;
                    }
                }
            }
        }
        // To implement deep search, change "_search" to "_deepSearch" in following line
        return items.length && searchQuery ? items.filter(_search) : items;
    };
    return SearchService;
}());
SearchService = __decorate([
    core_1.Injectable()
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.js.map