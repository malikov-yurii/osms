var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var KeysPipe = /** @class */ (function () {
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
    KeysPipe = __decorate([
        Pipe({ name: 'keys' })
    ], KeysPipe);
    return KeysPipe;
}());
export { KeysPipe };
