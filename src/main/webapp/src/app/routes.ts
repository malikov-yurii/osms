import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Main, Orders, Login } from './containers/index';
import { AuthService } from './services/index';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/orders'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'orders',
    component: Main,
    canActivate: [AuthService],
    children: [
      { path: '', component: Orders }
    ]
  }
]);
