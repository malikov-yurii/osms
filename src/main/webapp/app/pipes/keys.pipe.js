"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        core_1.Pipe({ name: 'keys' })
    ], KeysPipe);
    return KeysPipe;
}());
exports.KeysPipe = KeysPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpcGVzL2tleXMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUFvRDtBQUdwRDtJQUFBO0lBZUEsQ0FBQztJQWRDLDRCQUFTLEdBQVQsVUFBVSxHQUFRLEVBQUUsWUFBb0I7UUFDdEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVSLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBUyxDQUFDO29CQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1FBRUgsQ0FBQztJQUNILENBQUM7SUFkVSxRQUFRO1FBRHBCLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztPQUNSLFFBQVEsQ0FlcEI7SUFBRCxlQUFDO0NBZkQsQUFlQyxJQUFBO0FBZlksNEJBQVEiLCJmaWxlIjoicGlwZXMva2V5cy5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoe25hbWU6ICdrZXlzJ30pXHJcbmV4cG9ydCBjbGFzcyBLZXlzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIHRyYW5zZm9ybShvYmo6IGFueSwga2V5c1RvRmlsdGVyPzogYW55W10pOiBhbnkge1xyXG4gICAgaWYgKG9iaikge1xyXG5cclxuICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgICBpZiAoa2V5c1RvRmlsdGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleXMuZmlsdGVyKGZ1bmN0aW9uKGkpIHtcclxuICAgICAgICAgIHJldHVybiBrZXlzVG9GaWx0ZXIuaW5kZXhPZihpKSA8IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGtleXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG59Il19
