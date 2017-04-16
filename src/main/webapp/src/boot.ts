import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App, providers, routes } from './app/index';
import { Login, Main, Orders } from './app/containers/index';
import { Header, Order } from './app/ui/index';

@NgModule({
  declarations: [
    App,
    Login,
    Main,
    Orders,
    Header,
    Order
  ],
  providers,
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routes
  ],
  bootstrap: [App]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
