var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { STATIC_DATA } from '../models/index';
var sessionTimeout;
export var sessionTimeoutStream = new Subject();
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.headersForm = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        });
        this.headersJson = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }
    ApiService.prototype.get = function (path) {
        return this.http.get(path, { headers: this.headersForm })
            .map(this.checkForError)
            .catch(function (err) { return Observable.throw(err); })
            .map(this.getJson)
            .do(this.updateSession);
    };
    ApiService.prototype.post = function (path) {
        return this.http.post(path, { headers: this.headersForm })
            .map(this.checkForError)
            .catch(function (err) { return Observable.throw(err); })
            .map(this.getJson)
            .do(this.updateSession);
    };
    ApiService.prototype.postBody = function (path, body) {
        return this.http.post(path, body, { headers: this.headersJson })
            .map(this.checkForError)
            .catch(function (err) { return Observable.throw(err); })
            .map(this.getJson)
            .do(this.updateSession);
    };
    ApiService.prototype.put = function (path, body) {
        return this.http.put(path, body, { headers: this.headersJson })
            .map(this.checkForError)
            .catch(function (err) { return Observable.throw(err); })
            .map(this.getJson)
            .do(this.updateSession);
    };
    ApiService.prototype.apiDelete = function (path) {
        return this.http.delete(path, { headers: this.headersForm })
            .map(this.checkForError)
            .catch(function (err) { return Observable.throw(err); })
            .do(this.updateSession);
    };
    ApiService.prototype.getJson = function (resp) {
        try {
            return resp.json();
        }
        catch (err) {
            return;
        }
    };
    ApiService.prototype.checkForError = function (resp) {
        if (resp.url.indexOf('login') !== -1) {
            return window.location.pathname = '/login';
        }
        if (resp.status >= 200 && resp.status < 400) {
            return resp;
        }
        else {
            var error = new Error(resp.statusText);
            error['response'] = resp;
            console.error(error);
            throw error;
        }
    };
    ApiService.prototype.updateSession = function () {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(function () {
            sessionTimeoutStream.next();
        }, STATIC_DATA.sessionTime);
    };
    ApiService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
