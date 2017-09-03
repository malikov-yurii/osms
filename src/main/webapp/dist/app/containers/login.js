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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var index_1 = require("../services/index");
var Login = (function () {
    function Login(authService, formBuilder, router) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.router = router;
    }
    Login.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            "username": ['', forms_1.Validators.required],
            "password": ['', forms_1.Validators.required]
        });
    };
    Login.prototype.onSubmit = function () {
        return this.authService.login(this.loginForm.value);
    };
    return Login;
}());
Login = __decorate([
    core_1.Component({
        template: "\n    <form [formGroup]=\"loginForm\" class=\"login-form\" (ngSubmit)=\"onSubmit()\">\n      <input type=\"text\" formControlName=\"username\">\n      <input type=\"password\" formControlName=\"password\">\n      \n      <button type=\"submit\">Login</button>\n    </form>\n  "
    }),
    __metadata("design:paramtypes", [index_1.AuthService,
        forms_1.FormBuilder,
        router_1.Router])
], Login);
exports.Login = Login;
