import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App, providers, routes, KeysPipe, SearchPipe } from './app/index';
import { Orders, Products } from './app/containers/index';
import { Header, Order, AutocompleteList } from './app/ui/index';
import { HotkeysDirective, Autocomplete, ContenteditableModel } from './app/directives/index';

@NgModule({
  declarations: [
    App,
    Header,
    Orders,
    Products,
    Order,
    KeysPipe,
    SearchPipe,
    HotkeysDirective,
    Autocomplete,
    AutocompleteList,
    ContenteditableModel
  ],
  providers,
  imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, routes],
  entryComponents: [AutocompleteList],
  bootstrap: [App]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
