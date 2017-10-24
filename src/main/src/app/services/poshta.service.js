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
import { ApiService } from './api.service';
var PoshtaService = /** @class */ (function () {
    function PoshtaService(api) {
        this.api = api;
        this.path = 'https://api.novaposhta.ua/v2.0/json';
        this.key = '1d11b1e838978931f9620705eb0f76df';
        this.myRef = '4db40554-9c0a-11e6-a54a-005056801333';
    }
    PoshtaService.prototype.getDocumentList = function () {
        return this.api.postBody(this.path + "/", {
            apiKey: this.key,
            modelName: 'InternetDocument',
            calledMethod: 'getDocumentList',
            GetFullList: '1'
        });
    };
    PoshtaService.prototype.getCounterparties = function () {
        return this.api.postBody(this.path + "/", {
            apiKey: this.key,
            modelName: 'Counterparty',
            calledMethod: 'getCounterparties',
            methodProperties: {
                CounterpartyProperty: 'Recipient'
                //FindByString: 'св'
            }
        });
    };
    PoshtaService.prototype.getCounterpartyContactPerson = function () {
        return this.api.postBody(this.path + "/", {
            apiKey: this.key,
            modelName: 'Counterparty',
            calledMethod: 'getCounterpartyContactPersons',
            methodProperties: {
                Ref: this.myRef,
                Page: '1'
            }
        });
    };
    PoshtaService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ApiService])
    ], PoshtaService);
    return PoshtaService;
}());
export { PoshtaService };
