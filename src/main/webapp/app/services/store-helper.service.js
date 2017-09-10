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
var store_1 = require("../store");
var StoreHelper = /** @class */ (function () {
    function StoreHelper(store) {
        this.store = store;
    }
    StoreHelper.prototype.get = function (prop) {
        var currentState = this.store.getState();
        return currentState[prop];
    };
    StoreHelper.prototype.add = function (prop, state) {
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = [state].concat(collection), _a)));
        var _a;
    };
    StoreHelper.prototype.addArrayLast = function (prop, state) {
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = collection.concat(state), _a)));
        var _a;
    };
    StoreHelper.prototype.update = function (prop, state) {
        var currentState = this.store.getState();
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = state, _a)));
        var _a;
    };
    StoreHelper.prototype.findAndUpdate = function (prop, id, fieldName, value) {
        var updated = false;
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = collection.map(function (item) {
            if (item.id === id && item[fieldName] !== value) {
                item[fieldName] = value;
                updated = true;
            }
            return item;
        }), _a)));
        return updated;
        var _a;
    };
    StoreHelper.prototype.findAndUpdateWithObject = function (prop, id, sourceObj) {
        var updated = false;
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = collection.map(function (item) {
            if (item.id === id) {
                item = Object.assign(item, sourceObj);
                updated = true;
            }
            return item;
        }), _a)));
        return updated;
        var _a;
    };
    StoreHelper.prototype.findAndDelete = function (prop, id) {
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = collection.filter(function (item) { return item.id !== id; }), _a)));
        var _a;
    };
    StoreHelper.prototype.findDeepAndAdd = function (prop, id, deepProp, state) {
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = collection.map(function (item) {
            if (item.id === id) {
                item[deepProp].push(state);
            }
            return item;
        }), _a)));
        var _a;
    };
    StoreHelper.prototype.findDeepAndUpdate = function (prop, id, deepPropKey, deepId, fieldName, value) {
        var updated = false;
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = collection.map(function (item) {
            if (item.id === id) {
                item[deepPropKey].map(function (deepItem) {
                    if (deepItem.id === deepId && deepItem[fieldName] !== value) {
                        deepItem[fieldName] = value;
                        updated = true;
                    }
                    return deepItem;
                });
            }
            return item;
        }), _a)));
        return updated;
        var _a;
    };
    StoreHelper.prototype.findDeepAndUpdateWithObject = function (prop, id, deepPropKey, deepId, sourceObj) {
        var updated = false;
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = collection.map(function (item) {
            if (item.id === id) {
                item[deepPropKey].map(function (deepItem) {
                    if (deepItem.id === deepId) {
                        deepItem = Object.assign(deepItem, sourceObj);
                        updated = true;
                    }
                    return deepItem;
                });
            }
            return item;
        }), _a)));
        return updated;
        var _a;
    };
    StoreHelper.prototype.findDeepAndDelete = function (prop, id, deepPropKey, deepId) {
        var currentState = this.store.getState();
        var collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, (_a = {}, _a[prop] = collection.map(function (item) {
            if (item.id === id) {
                item[deepPropKey] = item[deepPropKey].filter(function (deepItem) { return deepItem.id !== deepId; });
            }
            return item;
        }), _a)));
        var _a;
    };
    // @TODO remove this
    StoreHelper.prototype.onGetState = function () {
        console.log(this.store.getState());
    };
    StoreHelper = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store])
    ], StoreHelper);
    return StoreHelper;
}());
exports.StoreHelper = StoreHelper;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3N0b3JlLWhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLGtDQUFpQztBQUdqQztJQUNFLHFCQUFvQixLQUFZO1FBQVosVUFBSyxHQUFMLEtBQUssQ0FBTztJQUFHLENBQUM7SUFFcEMseUJBQUcsR0FBSCxVQUFJLElBQUk7UUFDTixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELHlCQUFHLEdBQUgsVUFBSSxJQUFJLEVBQUUsS0FBSztRQUNiLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksWUFBSSxHQUFDLElBQUksS0FBSSxLQUFLLFNBQUssVUFBVSxDQUFDLE1BQUcsQ0FBQyxDQUFDOztJQUMzRixDQUFDO0lBRUQsa0NBQVksR0FBWixVQUFhLElBQUksRUFBRSxLQUFZO1FBQzdCLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksWUFBSSxHQUFDLElBQUksSUFBTyxVQUFVLFFBQUssS0FBSyxDQUFDLE1BQUcsQ0FBQyxDQUFDOztJQUM5RixDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLElBQUksRUFBRSxLQUFLO1FB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QyxDQUFDO1FBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQzs7SUFDakIsQ0FBQztJQUVELHVDQUFpQixHQUFqQixVQUFrQixJQUFJLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNO1FBQzdDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksWUFBRyxHQUFDLElBQUksSUFBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUM5RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEVBQUUsS0FBSyxNQUFNLEVBQXRCLENBQXNCLENBQUMsQ0FBQztZQUNuRixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxNQUFFLENBQUMsQ0FBQzs7SUFDUixDQUFDO0lBS0gsb0JBQW9CO0lBQ2xCLGdDQUFVLEdBQVY7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBN0hVLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FFZ0IsYUFBSztPQURyQixXQUFXLENBK0h2QjtJQUFELGtCQUFDO0NBL0hELEFBK0hDLElBQUE7QUEvSFksa0NBQVciLCJmaWxlIjoic2VydmljZXMvc3RvcmUtaGVscGVyLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4uL3N0b3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0b3JlSGVscGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogU3RvcmUpIHt9XG5cbiAgZ2V0KHByb3ApIHtcbiAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZVtwcm9wXTtcbiAgfVxuXG4gIGFkZChwcm9wLCBzdGF0ZSkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gY3VycmVudFN0YXRlW3Byb3BdO1xuICAgIHRoaXMuc3RvcmUuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudFN0YXRlLCB7IFtwcm9wXTogW3N0YXRlLCAuLi5jb2xsZWN0aW9uXSB9KSk7XG4gIH1cblxuICBhZGRBcnJheUxhc3QocHJvcCwgc3RhdGU6IFthbnldKSB7XG4gICAgY29uc3QgY3VycmVudFN0YXRlID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBjdXJyZW50U3RhdGVbcHJvcF07XG4gICAgdGhpcy5zdG9yZS5zZXRTdGF0ZShPYmplY3QuYXNzaWduKHt9LCBjdXJyZW50U3RhdGUsIHsgW3Byb3BdOiBbLi4uY29sbGVjdGlvbiwgLi4uc3RhdGVdIH0pKTtcbiAgfVxuXG4gIHVwZGF0ZShwcm9wLCBzdGF0ZSkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICB0aGlzLnN0b3JlLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30sIGN1cnJlbnRTdGF0ZSwgeyBbcHJvcF06IHN0YXRlIH0pKTtcbiAgfVxuXG4gIGZpbmRBbmRVcGRhdGUocHJvcCwgaWQsIGZpZWxkTmFtZSwgdmFsdWUpOiBib29sZWFuIHtcbiAgICBsZXQgdXBkYXRlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gY3VycmVudFN0YXRlW3Byb3BdO1xuICAgIHRoaXMuc3RvcmUuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudFN0YXRlLCB7W3Byb3BdOiBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmlkID09PSBpZCAmJiBpdGVtW2ZpZWxkTmFtZV0gIT09IHZhbHVlKSB7XG4gICAgICAgIGl0ZW1bZmllbGROYW1lXSA9IHZhbHVlO1xuICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pfSkpO1xuICAgIHJldHVybiB1cGRhdGVkO1xuICB9XG5cbiAgZmluZEFuZFVwZGF0ZVdpdGhPYmplY3QocHJvcCwgaWQsIHNvdXJjZU9iaik6IGJvb2xlYW4ge1xuICAgIGxldCB1cGRhdGVkID0gZmFsc2U7XG4gICAgY29uc3QgY3VycmVudFN0YXRlID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBjdXJyZW50U3RhdGVbcHJvcF07XG4gICAgdGhpcy5zdG9yZS5zZXRTdGF0ZShPYmplY3QuYXNzaWduKHt9LCBjdXJyZW50U3RhdGUsIHtbcHJvcF06IGNvbGxlY3Rpb24ubWFwKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XG4gICAgICAgIGl0ZW0gPSBPYmplY3QuYXNzaWduKGl0ZW0sIHNvdXJjZU9iaik7XG4gICAgICAgIHVwZGF0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSl9KSk7XG4gICAgcmV0dXJuIHVwZGF0ZWQ7XG4gIH1cblxuICBmaW5kQW5kRGVsZXRlKHByb3AsIGlkKSB7XG4gICAgY29uc3QgY3VycmVudFN0YXRlID0gdGhpcy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBjdXJyZW50U3RhdGVbcHJvcF07XG4gICAgdGhpcy5zdG9yZS5zZXRTdGF0ZShPYmplY3QuYXNzaWduKHt9LCBjdXJyZW50U3RhdGUsIHtbcHJvcF06IGNvbGxlY3Rpb24uZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCAhPT0gaWQpfSkpO1xuICB9XG5cbiAgZmluZERlZXBBbmRBZGQocHJvcCwgaWQsIGRlZXBQcm9wLCBzdGF0ZSkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gY3VycmVudFN0YXRlW3Byb3BdO1xuICAgIHRoaXMuc3RvcmUuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudFN0YXRlLCB7W3Byb3BdOiBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xuICAgICAgICBpdGVtW2RlZXBQcm9wXS5wdXNoKHN0YXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pfSkpO1xuICB9XG5cbiAgZmluZERlZXBBbmRVcGRhdGUocHJvcCwgaWQsIGRlZXBQcm9wS2V5LCBkZWVwSWQsIGZpZWxkTmFtZSwgdmFsdWUpOiBib29sZWFuIHtcbiAgICBsZXQgdXBkYXRlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gY3VycmVudFN0YXRlW3Byb3BdO1xuICAgIHRoaXMuc3RvcmUuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudFN0YXRlLCB7W3Byb3BdOiBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xuICAgICAgICBpdGVtW2RlZXBQcm9wS2V5XS5tYXAoZGVlcEl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChkZWVwSXRlbS5pZCA9PT0gZGVlcElkICYmIGRlZXBJdGVtW2ZpZWxkTmFtZV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBkZWVwSXRlbVtmaWVsZE5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRlZXBJdGVtO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pfSkpO1xuICAgIHJldHVybiB1cGRhdGVkO1xuICB9XG5cbiAgZmluZERlZXBBbmRVcGRhdGVXaXRoT2JqZWN0KHByb3AsIGlkLCBkZWVwUHJvcEtleSwgZGVlcElkLCBzb3VyY2VPYmopOiBib29sZWFuIHtcbiAgICBsZXQgdXBkYXRlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gY3VycmVudFN0YXRlW3Byb3BdO1xuICAgIHRoaXMuc3RvcmUuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudFN0YXRlLCB7W3Byb3BdOiBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xuICAgICAgICBpdGVtW2RlZXBQcm9wS2V5XS5tYXAoZGVlcEl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChkZWVwSXRlbS5pZCA9PT0gZGVlcElkKSB7XG4gICAgICAgICAgICBkZWVwSXRlbSA9IE9iamVjdC5hc3NpZ24oZGVlcEl0ZW0sIHNvdXJjZU9iaik7XG4gICAgICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRlZXBJdGVtO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pfSkpO1xuICAgIHJldHVybiB1cGRhdGVkO1xuICB9XG5cbiAgZmluZERlZXBBbmREZWxldGUocHJvcCwgaWQsIGRlZXBQcm9wS2V5LCBkZWVwSWQpIHtcbiAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLnN0b3JlLmdldFN0YXRlKCk7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IGN1cnJlbnRTdGF0ZVtwcm9wXTtcbiAgICB0aGlzLnN0b3JlLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30sIGN1cnJlbnRTdGF0ZSwge1twcm9wXTogY29sbGVjdGlvbi5tYXAoaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgaXRlbVtkZWVwUHJvcEtleV0gPSBpdGVtW2RlZXBQcm9wS2V5XS5maWx0ZXIoZGVlcEl0ZW0gPT4gZGVlcEl0ZW0uaWQgIT09IGRlZXBJZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KX0pKTtcbiAgfVxuXG5cblxuXG4vLyBAVE9ETyByZW1vdmUgdGhpc1xuICBvbkdldFN0YXRlKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RvcmUuZ2V0U3RhdGUoKSk7XG4gIH1cblxufVxuIl19
