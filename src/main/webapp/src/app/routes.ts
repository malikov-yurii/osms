import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Orders, Products } from './containers/index';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  // {
  //   path: '',
  //   redirectTo: '/orders',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: Orders
  },
  {
    path: 'products',
    component: Products
  }
]);
