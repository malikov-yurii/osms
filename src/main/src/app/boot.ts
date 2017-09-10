import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App, providers, routes, KeysPipe, SearchPipe } from './index';
import { OrdersComponent, ProductsComponent, CustomersComponent } from './containers/index';
import { Header, AutocompleteList, Pagination, PopupComponent, Filter, FilterStatic, NotyComponent } from './ui/index';
import { HotkeysDirective, Autocomplete, ContenteditableModel } from './directives/index';
import { environment } from './environment';

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
    Filter,
    FilterStatic,
    NotyComponent
  ],
  providers,
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

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
