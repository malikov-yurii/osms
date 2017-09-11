import { RouterModule } from '@angular/router';
import { OrdersComponent, ProductsComponent, CustomersComponent } from './containers/index';
export var routes = RouterModule.forRoot([
    // {
    //   path: '',
    //   redirectTo: '/orders',
    //   pathMatch: 'full'
    // },
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
    }
]);
