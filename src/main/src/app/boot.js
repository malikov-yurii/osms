var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowser, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App, routes, KeysPipe, SearchPipe, Store } from './index';
import { OrdersComponent, ProductsComponent, CustomersComponent, PoshtaComponent } from './containers/index';
import { Header, AutocompleteList, Pagination, PopupComponent, Filter, FilterStatic, NotyComponent } from './ui/index';
import { HotkeysDirective, Autocomplete, ContenteditableModel } from './directives/index';
import { ApiService, CustomerService, NotyService, OrderService, ProductService, SearchService, StoreHelper, PoshtaService } from './services/index';
import { AppModuleNgFactory } from '../aot/src/main/src/app/boot.ngfactory';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                App,
                Header,
                OrdersComponent,
                ProductsComponent,
                CustomersComponent,
                PoshtaComponent,
                KeysPipe,
                SearchPipe,
                HotkeysDirective,
                Autocomplete,
                AutocompleteList,
                ContenteditableModel,
                Pagination,
                PopupComponent,
                Filter,
                FilterStatic,
                NotyComponent
            ],
            providers: [
                { provide: LOCALE_ID, useValue: "ru-RU" },
                Store,
                ApiService,
                CustomerService,
                NotyService,
                OrderService,
                ProductService,
                SearchService,
                PoshtaService,
                StoreHelper
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                HttpModule,
                FormsModule,
                ReactiveFormsModule,
                routes
            ],
            entryComponents: [AutocompleteList, PopupComponent, NotyComponent],
            bootstrap: [App]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
