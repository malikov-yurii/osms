import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App, providers, routes, KeysPipe, SearchPipe } from './app/index';
import { Orders, Products, Customers } from './app/containers/index';
import { Header, Order, AutocompleteList, Pagination, PopupComponent, Filter, NotyComponent } from './app/ui/index';
import { HotkeysDirective, Autocomplete, ContenteditableModel } from './app/directives/index';

@NgModule({
  declarations: [
    App,
    Header,
    Orders,
    Products,
    Customers,
    Order,
    KeysPipe,
    SearchPipe,
    HotkeysDirective,
    Autocomplete,
    AutocompleteList,
    ContenteditableModel,
    Pagination,
    PopupComponent,
    Filter,
    NotyComponent
  ],
  providers,
  imports: [BrowserModule, BrowserAnimationsModule, HttpModule, FormsModule, ReactiveFormsModule, routes],
  entryComponents: [AutocompleteList, PopupComponent, NotyComponent],
  bootstrap: [App]
})

export class AppModule {}

// enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
