import { RouterModule }          from '@angular/router';
import { ModuleWithProviders }   from '@angular/core';
import {
  OrdersComponent, ProductsComponent,
  CustomersComponent, PoshtaComponent
}                                from './containers/index';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'poshta',
    component: PoshtaComponent
  }
]);
