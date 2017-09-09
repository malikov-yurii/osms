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
var animations_1 = require("./animations");
var Header = (function () {
    function Header() {
        this.menuState = 'collapsed';
    }
    Header.prototype.toggleMenuState = function () {
        this.menuState = this.menuState === 'collapsed' ? 'expanded' : 'collapsed';
    };
    return Header;
}());
Header = __decorate([
    core_1.Component({
        selector: 'nav-header',
        templateUrl: '/assets/templates/ui/header.html',
        styleUrls: ['assets/css/ui/header.css'],
        animations: [animations_1.fadeInOut({ paramsVoid: 'collapsed', paramsAny: 'expanded' })]
    }),
    __metadata("design:paramtypes", [])
], Header);
exports.Header = Header;
//# sourceMappingURL=header.js.map