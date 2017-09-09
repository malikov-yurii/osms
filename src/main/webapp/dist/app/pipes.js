"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (obj, keysToFilter) {
        if (obj) {
            var keys = Object.keys(obj);
            if (keysToFilter) {
                return keys.filter(function (i) {
                    return keysToFilter.indexOf(i) < 0;
                });
            }
            else {
                return keys;
            }
        }
    };
    return KeysPipe;
}());
KeysPipe = __decorate([
    core_1.Pipe({ name: 'keys' })
], KeysPipe);
exports.KeysPipe = KeysPipe;
var SearchPipe = (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (items, searchQuery) {
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
                    // At first checks in values of given object, e.g. 'firstName/totalSum'
                    // if no, then goes recursivly and checks in nested object/arrays, e.g. 'orderItemTos'
                    if (_ifValueConsistQuery(item[key]) ||
                        typeof item[key] === 'object' && _deepSearch(item[key])) {
                        return true;
                    }
                }
            }
        }
        return items.length && searchQuery ? items.filter(_deepSearch) : items;
    };
    return SearchPipe;
}());
SearchPipe = __decorate([
    core_1.Pipe({ name: 'search' })
], SearchPipe);
exports.SearchPipe = SearchPipe;
//# sourceMappingURL=pipes.js.map