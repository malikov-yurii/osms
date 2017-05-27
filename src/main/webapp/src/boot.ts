import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App, providers, routes, KeysPipe } from './app/index';
import { Orders, Products } from './app/containers/index';
import { Header, Order } from './app/ui/index';

@NgModule({
  declarations: [
    App,
    Header,
    Orders,
    Products,
    Order,
    KeysPipe
  ],
  providers,
  imports: [BrowserModule, HttpModule, routes],
  bootstrap: [App]
})

export class AppModule {};

platformBrowserDynamic().bootstrapModule(AppModule);
