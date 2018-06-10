import { RouterModule } from '@angular/router';
import { OrdersComponent, ProductsComponent, CustomersComponent } from './containers/index';
export var routes = RouterModule.forRoot([
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
