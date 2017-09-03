"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/http");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var forms_1 = require("@angular/forms");
var index_1 = require("./app/index");
var index_2 = require("./app/containers/index");
var index_3 = require("./app/ui/index");
var index_4 = require("./app/directives/index");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            index_1.App,
            index_3.Header,
            index_2.Orders,
            index_2.Products,
            index_2.Customers,
            index_3.Order,
            index_1.KeysPipe,
            index_1.SearchPipe,
            index_4.HotkeysDirective,
            index_4.Autocomplete,
            index_3.AutocompleteList,
            index_4.ContenteditableModel,
            index_3.Pagination,
            index_3.PopupComponent,
            index_3.Filter,
            index_3.FilterStatic,
            index_3.NotyComponent
        ],
        providers: index_1.providers,
        imports: [platform_browser_1.BrowserModule, animations_1.BrowserAnimationsModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, index_1.routes],
        entryComponents: [index_3.AutocompleteList, index_3.PopupComponent, index_3.NotyComponent],
        bootstrap: [index_1.App]
    })
], AppModule);
exports.AppModule = AppModule;
// enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=boot.js.map