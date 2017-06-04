import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { App, providers, routes, KeysPipe, SearchPipe } from './app/index';
import { Orders, Products } from './app/containers/index';
import { Header, Order } from './app/ui/index';
import { HotkeysDirective } from './app/directives/index';

@NgModule({
  declarations: [
    App,
    Header,
    Orders,
    Products,
    Order,
    KeysPipe,
    SearchPipe,
    HotkeysDirective
  ],
  providers,
  imports: [BrowserModule, HttpModule, FormsModule, routes],
  bootstrap: [App]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
