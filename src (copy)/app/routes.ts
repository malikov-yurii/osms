import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OrdersComponent, ProductsComponent, CustomersComponent } from './containers/index';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: 'orders',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  }
]);
