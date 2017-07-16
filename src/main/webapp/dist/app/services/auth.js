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
var router_1 = require("@angular/router");
var index_1 = require("./index");
var AuthService = (function () {
    function AuthService(router, api) {
        this.router = router;
        this.api = api;
        this.isAuthorized = false;
    }
    AuthService.prototype.canActivate = function () {
        var canActivate = this.isAuthorized;
        this.onCanActivate(canActivate);
        return canActivate;
    };
    AuthService.prototype.onCanActivate = function (canActivate) {
        if (!canActivate) {
            this.router.navigate(['login']);
        }
    };
    AuthService.prototype.login = function (token) {
        var _this = this;
        this.api.post('/spring_security_check', "username=" + token.username + "&password=" + token.password)
            .subscribe(function (res) { _this.isAuthorized = true; console.log(_this.isAuthorized); return _this.router.navigate(['orders$']); }, function (error) { return false; });
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.ApiService])
], AuthService);
exports.AuthService = AuthService;
