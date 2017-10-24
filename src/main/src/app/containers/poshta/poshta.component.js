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
import { PoshtaService } from '../../services/index';
import { slideToLeft } from '../../ui/animations';
var PoshtaComponent = /** @class */ (function () {
    function PoshtaComponent(poshtaService) {
        this.poshtaService = poshtaService;
        this.currentTab = 'list';
        this.parcels = [];
    }
    PoshtaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.poshtaService.getCounterpartyContactPerson().subscribe(function (response) { return console.log(response); });
        this.poshtaService.getCounterparties().subscribe(function (response) { return console.log(response); });
        this.poshtaService.getDocumentList().subscribe(function (response) { return _this.parcels = response.data; });
    };
    PoshtaComponent = __decorate([
        Component({
            moduleId: module.id,
            templateUrl: 'poshta.component.html',
            styleUrls: ['poshta.component.css'],
            animations: [slideToLeft()],
            host: { '[@slideToLeft]': '' },
        }),
        __metadata("design:paramtypes", [PoshtaService])
    ], PoshtaComponent);
    return PoshtaComponent;
}());
export { PoshtaComponent };
