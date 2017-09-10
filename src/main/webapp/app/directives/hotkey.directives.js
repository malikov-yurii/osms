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
var HotkeysDirective = /** @class */ (function () {
    function HotkeysDirective(el) {
        this.el = el;
        this.addProduct = new core_1.EventEmitter();
        this.moveFocus = new core_1.EventEmitter();
    }
    HotkeysDirective.prototype.onKey = function (e) {
        if (e.ctrlKey && e.code === 'Enter') {
            this.addProduct.emit();
            return false;
        }
        else if (e.shiftKey && e.code === 'Enter') {
            this.moveFocus.emit();
            return false;
        }
        else if (e.code === 'Enter' || e.code === 'Escape') {
            this.el.nativeElement.blur();
            return false;
        }
    };
    __decorate([
        core_1.Output('addProduct'),
        __metadata("design:type", Object)
    ], HotkeysDirective.prototype, "addProduct", void 0);
    __decorate([
        core_1.Output('moveFocus'),
        __metadata("design:type", Object)
    ], HotkeysDirective.prototype, "moveFocus", void 0);
    HotkeysDirective = __decorate([
        core_1.Directive({
            selector: '[hotkeys]',
            host: {
                '(keypress)': 'onKey($event)'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], HotkeysDirective);
    return HotkeysDirective;
}());
exports.HotkeysDirective = HotkeysDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvaG90a2V5LmRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBNEU7QUFRNUU7SUFLRSwwQkFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFIWixlQUFVLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDakMsY0FBUyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBRWYsQ0FBQztJQUV0QyxnQ0FBSyxHQUFMLFVBQU0sQ0FBQztRQUNMLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0lBaEJxQjtRQUFyQixhQUFNLENBQUMsWUFBWSxDQUFDOzt3REFBaUM7SUFDakM7UUFBcEIsYUFBTSxDQUFDLFdBQVcsQ0FBQzs7dURBQWdDO0lBSHpDLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsSUFBSSxFQUFFO2dCQUNKLFlBQVksRUFBRSxlQUFlO2FBQzlCO1NBQ0YsQ0FBQzt5Q0FNd0IsaUJBQVU7T0FMdkIsZ0JBQWdCLENBb0I1QjtJQUFELHVCQUFDO0NBcEJELEFBb0JDLElBQUE7QUFwQlksNENBQWdCIiwiZmlsZSI6ImRpcmVjdGl2ZXMvaG90a2V5LmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tob3RrZXlzXScsXG4gIGhvc3Q6IHtcbiAgICAnKGtleXByZXNzKSc6ICdvbktleSgkZXZlbnQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIEhvdGtleXNEaXJlY3RpdmUge1xuXG4gIEBPdXRwdXQoJ2FkZFByb2R1Y3QnKSBhZGRQcm9kdWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdtb3ZlRm9jdXMnKSBtb3ZlRm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICBvbktleShlKSB7XG4gICAgaWYgKGUuY3RybEtleSAmJiBlLmNvZGUgPT09ICdFbnRlcicpIHtcbiAgICAgIHRoaXMuYWRkUHJvZHVjdC5lbWl0KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChlLnNoaWZ0S2V5ICYmIGUuY29kZSA9PT0gJ0VudGVyJykge1xuICAgICAgdGhpcy5tb3ZlRm9jdXMuZW1pdCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoZS5jb2RlID09PSAnRW50ZXInIHx8IGUuY29kZSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==
