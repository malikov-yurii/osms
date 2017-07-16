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
var StoreHelper = (function () {
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
                    if (deepItem.id === deepId && deepItem[fieldName] != value) {
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
                        console.log(deepItem);
                        console.log(sourceObj);
                        deepItem = Object.assign(deepItem, sourceObj);
                        console.log(deepItem);
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
    StoreHelper.prototype.onGetState = function () {
        console.log(this.store.getState());
    };
    return StoreHelper;
}());
StoreHelper = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [store_1.Store])
], StoreHelper);
exports.StoreHelper = StoreHelper;
