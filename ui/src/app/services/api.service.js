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
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import { STATIC_DATA } from '../models/index';
import { ProgressBarService } from '../ui/progress-bar/progress-bar.service';
var sessionTimeout;
export var sessionTimeoutStream = new Subject();
var ApiService = /** @class */ (function () {
    function ApiService(http, progressBar) {
        this.http = http;
        this.progressBar = progressBar;
        this.headersForm = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        });
        this.headersJson = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        this.headersText = new Headers({
            'Content-Type': 'text/plain',
            'Accept': 'text/plain'
        });
    }
    ApiService.prototype.get = function (path, showProgressBar, isRespJson) {
        var _this = this;
        if (showProgressBar === void 0) { showProgressBar = true; }
        if (isRespJson === void 0) { isRespJson = true; }
        if (showProgressBar) {
            this.progressBar.show();
        }
        var requestText = this.http.get(path, { headers: this.headersText })
            .finally(function () { return _this.onRequestEnd(showProgressBar); })
            .map(function (resp) { return resp.text(); });
        var requestJson = this.http.get(path, { headers: this.headersForm })
            .finally(function () { return _this.onRequestEnd(showProgressBar); })
            .map(this.checkForError)
            .catch(function (err) { return Observable.throw(err); })
            .map(this.getJson);
        return isRespJson ? requestJson : requestText;
    };
    ApiService.prototype.post = function (path) {
        var _this = this;
        this.progressBar.show();
        return this.http.post(path, { headers: this.headersForm })
            .finally(function () { return _this.onRequestEnd(); })
            .map(this.checkForError)
            .catch(function (err) { return Observable.throw(err); })
            .map(this.getJson);
    };
    ApiService.prototype.put = function (path, body) {
        var _this = this;
        this.progressBar.show();
        return this.http.put(path, body, { headers: this.headersJson })
            .finally(function () { return _this.onRequestEnd(); })
            .map(this.checkForError)
            .catch(function (err) { return Observable.throw(err); })
            .map(this.getJson);
    };
    ApiService.prototype.apiDelete = function (path) {
        var _this = this;
        this.progressBar.show();
        return this.http.delete(path, { headers: this.headersForm })
            .finally(function () { return _this.onRequestEnd(); })
            .map(this.checkForError)
            .catch(function (err) { return Observable.throw(err); });
    };
    ApiService.prototype.onRequestEnd = function (hideProgressBar) {
        if (hideProgressBar === void 0) { hideProgressBar = true; }
        this.updateSession();
        if (hideProgressBar) {
            this.progressBar.hide();
        }
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
        sessionTimeout = setTimeout(function () { return sessionTimeoutStream.next(); }, STATIC_DATA.sessionTime);
    };
    ApiService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, ProgressBarService])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
