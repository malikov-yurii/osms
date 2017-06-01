import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { App, providers, routes, KeysPipe } from './app/index';
import { Orders, Products } from './app/containers/index';
import { Header, Order } from './app/ui/index';
import { hotkeysDirective } from './app/directives/index';

@NgModule({
  declarations: [
    App,
    Header,
    Orders,
    Products,
    Order,
    KeysPipe,
    hotkeysDirective
  ],
  providers,
  imports: [BrowserModule, HttpModule, FormsModule, routes],
  bootstrap: [App]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
