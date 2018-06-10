var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { fadeInOut } from '../animations';
import { ApiService } from '../../services/api.service';
import { finalize } from 'rxjs/operators';
import { NotyService } from '../../services/noty.service';
var Header = /** @class */ (function () {
    function Header(api, notyService) {
        this.api = api;
        this.notyService = notyService;
        this.currencies = [];
        this.menuState = 'collapsed';
    }
    Header.prototype.ngOnInit = function () {
        this.getCurrencies();
    };
    Header.prototype.getCurrencies = function (updated) {
        var _this = this;
        if (updated === void 0) { updated = false; }
        var apiUrl = updated ? '/currencies/updated' : '/currencies';
        if (updated && this.currencies.some(function (currency) { return (new Date().getTime() - currency.lastAutoUpdateAttempt.getTime()) < 300000; })) {
            this.notyService.renderNoty('Нельзя обновлять чаще, чем 1 раз в 5 минут!', true);
            return;
        }
        this.currencies.forEach(function (currency) { return currency.isLoading = true; });
        this.api.get(apiUrl, updated)
            .pipe(finalize(function () { return _this.currencies.forEach(function (currency) { return currency.isLoading = false; }); }))
            .subscribe(function (currencies) {
            _this.currencies = currencies.map(function (currency) {
                return __assign({}, currency, { lastUpdated: new Date(currency.lastUpdated), lastAutoUpdateAttempt: new Date(currency.lastAutoUpdateAttempt), isLoading: true, isEditable: false });
            });
        });
    };
    Header.prototype.toggleMenuState = function () {
        this.menuState = this.menuState === 'collapsed' ? 'expanded' : 'collapsed';
    };
    Header.prototype.setRate = function (currency) {
        var _this = this;
        var exchangeRate = prompt('Введите новое значение курса, например: 31.35');
        if (!exchangeRate) {
            return;
        }
        else {
            exchangeRate = parseFloat(exchangeRate.replace(',', '.'));
        }
        currency.isLoading = true;
        this.api.put("/currencies", [{ code: currency.code, exchangeRate: exchangeRate }])
            .pipe(finalize(function () { return currency.isLoading = false; }))
            .subscribe(function () { return currency.exchangeRate = exchangeRate; }, function (error) { return _this.notyService.renderNoty(error, true); });
    };
    Header = __decorate([
        Component({
            moduleId: module.id,
            selector: 'nav-header',
            templateUrl: 'header.html',
            styleUrls: ['header.css'],
            animations: [fadeInOut({ paramsVoid: 'collapsed', paramsAny: 'expanded' })]
        }),
        __metadata("design:paramtypes", [ApiService,
            NotyService])
    ], Header);
    return Header;
}());
export { Header };
