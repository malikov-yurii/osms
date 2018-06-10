var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';
var defaultState = {
    order: [],
    product: [],
    productAggregators: [],
    customer: []
};
var _store = new BehaviorSubject(defaultState);
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
        Injectable()
    ], Store);
    return Store;
}());
export { Store };
