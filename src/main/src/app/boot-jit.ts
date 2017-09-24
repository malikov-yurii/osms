import { NgModule, LOCALE_ID }                    from '@angular/core';
import { BrowserModule }                          from '@angular/platform-browser';
import { platformBrowserDynamic }                 from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule }                from '@angular/platform-browser/animations';
import { HttpModule }                             from '@angular/http';
import { FormsModule, ReactiveFormsModule }       from '@angular/forms';
import {
  App, routes, KeysPipe,
  SearchPipe, Store
}                                                 from './index';
import {
  OrdersComponent, ProductsComponent,
  CustomersComponent, PoshtaComponent
}                                                 from './containers/index';
import {
  Header, AutocompleteList, Pagination,
  PopupComponent, Filter, FilterStatic,
  NotyComponent
}                                                 from './ui/index';
import {
  HotkeysDirective, Autocomplete,
  ContenteditableModel
}                                                 from './directives/index';
import {
  ApiService, CustomerService, NotyService,
  OrderService, ProductService, SearchService,
  StoreHelper, PoshtaService
}                                                 from './services/index';

@NgModule({
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

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
