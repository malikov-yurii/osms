"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var core_1 = require("@angular/core");
require("rxjs/add/operator/distinctUntilChanged");
var defaultState = {
    order: [],
    product: [],
    customer: []
};
var _store = new BehaviorSubject_1.BehaviorSubject(defaultState);
var Store = /** @class */ (function () {
    function Store() {
        this.store = _store;
        this.changes = this.store.asObservable().distinctUntilChanged();
    }
    Store.prototype.setState = function (state) {
        this.store.next(state);
    };
    Store.prototype.getState = function () {
        return this.store.value;
    };
    Store.prototype.purge = function () {
        this.store.next(defaultState);
    };
    Store = __decorate([
        core_1.Injectable()
    ], Store);
    return Store;
}());
exports.Store = Store;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0RBQXlEO0FBQ3pELHNDQUFrRDtBQUNsRCxrREFBZ0Q7QUFJaEQsSUFBTSxZQUFZLEdBQVc7SUFDM0IsS0FBSyxFQUFFLEVBQUU7SUFDVCxPQUFPLEVBQUUsRUFBRTtJQUNYLFFBQVEsRUFBRSxFQUFFO0NBQ2IsQ0FBQztBQUVGLElBQU0sTUFBTSxHQUFHLElBQUksaUNBQWUsQ0FBUyxZQUFZLENBQUMsQ0FBQztBQUd6RDtJQURBO1FBRVUsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUN2QixZQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBYzdELENBQUM7SUFaQyx3QkFBUSxHQUFSLFVBQVMsS0FBYTtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsd0JBQVEsR0FBUjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRUQscUJBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFkVSxLQUFLO1FBRGpCLGlCQUFVLEVBQUU7T0FDQSxLQUFLLENBZ0JqQjtJQUFELFlBQUM7Q0FoQkQsQUFnQkMsSUFBQTtBQWhCWSxzQkFBSyIsImZpbGUiOiJzdG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9ICAgZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9ICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZGlzdGluY3RVbnRpbENoYW5nZWQnO1xuXG5pbXBvcnQgeyBJU3RhdGUgfSAgICAgICAgICAgIGZyb20gJy4vbW9kZWxzL2luZGV4JztcblxuY29uc3QgZGVmYXVsdFN0YXRlOiBJU3RhdGUgPSB7XG4gIG9yZGVyOiBbXSxcbiAgcHJvZHVjdDogW10sXG4gIGN1c3RvbWVyOiBbXVxufTtcblxuY29uc3QgX3N0b3JlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxJU3RhdGU+KGRlZmF1bHRTdGF0ZSk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gIHByaXZhdGUgc3RvcmUgPSBfc3RvcmU7XG4gIGNoYW5nZXMgPSB0aGlzLnN0b3JlLmFzT2JzZXJ2YWJsZSgpLmRpc3RpbmN0VW50aWxDaGFuZ2VkKCk7XG5cbiAgc2V0U3RhdGUoc3RhdGU6IElTdGF0ZSkge1xuICAgIHRoaXMuc3RvcmUubmV4dChzdGF0ZSk7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS52YWx1ZTtcbiAgfVxuXG4gIHB1cmdlKCkge1xuICAgIHRoaXMuc3RvcmUubmV4dChkZWZhdWx0U3RhdGUpO1xuICB9XG5cbn1cbiJdfQ==
