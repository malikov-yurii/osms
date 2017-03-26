import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App, providers } from './app/index';
import { Orders } from './app/container/index';
import { Header, Order } from './app/ui/index';

@NgModule({
  declarations: [
    App,
    Header,
    Orders,
    Order
  ],
  providers,
  imports: [BrowserModule, HttpModule],
  bootstrap: [App]
})

export class AppModule{};

platformBrowserDynamic().bootstrapModule(AppModule);