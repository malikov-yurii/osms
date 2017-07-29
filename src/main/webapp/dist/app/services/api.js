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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/observable/throw");
var sessionTimeout;
exports.sessionTimeoutStream = new Subject_1.Subject();
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.headersForm = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        });
        this.headersJson = new http_1.Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }
    ApiService.prototype.get = function (path) {
        return this.http.get(path, { headers: this.headersForm })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .map(this.getJson)
            .do(this.updateSession);
    };
    ApiService.prototype.post = function (path) {
        return this.http.post(path, { headers: this.headersForm })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .map(this.getJson)
            .do(this.updateSession);
    };
    ApiService.prototype.put = function (path, body, json) {
        if (json === void 0) { json = false; }
        var headers = json ? this.headersJson : this.headersForm;
        return this.http.put(path, body, { headers: headers })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
            .map(this.getJson)
            .do(this.updateSession);
    };
    ApiService.prototype.apiDelete = function (path) {
        return this.http.delete(path, { headers: this.headersForm })
            .map(this.checkForError)
            .catch(function (err) { return Observable_1.Observable.throw(err); })
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
            exports.sessionTimeoutStream.next();
        }, 5000);
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.js.map