import { NgModule, enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowser, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App, routes, KeysPipe, SearchPipe, Store } from './index';
import { OrdersComponent, ProductsComponent, CustomersComponent } from './containers/index';
import { Header, AutocompleteList, Pagination, PopupComponent, DataFilter, FilterStatic, NotyComponent, ProgressBarComponent } from './ui/index';
import { HotkeysDirective, Autocomplete, ContenteditableModel, PhoneNumberDirective } from './directives/index';
import { ApiService, CustomerService, NotyService, OrderService, ProductService, SearchService, StoreHelper} from './services/index';
import { ProgressBarService } from './ui/progress-bar/progress-bar.service';

import { AppModuleNgFactory } from '../aot/src/main/src/app/boot.ngfactory';


@NgModule({
  declarations: [
    App,
    Header,
    OrdersComponent,
    ProductsComponent,
    CustomersComponent,
    KeysPipe,
    SearchPipe,
    HotkeysDirective,
    Autocomplete,
    AutocompleteList,
    ContenteditableModel,
    Pagination,
    PopupComponent,
    DataFilter,
    FilterStatic,
    NotyComponent,
    ProgressBarComponent,
    PhoneNumberDirective
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
    StoreHelper,
    ProgressBarService
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

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);