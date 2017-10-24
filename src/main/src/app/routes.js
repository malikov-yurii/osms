import { RouterModule } from '@angular/router';
import { OrdersComponent, ProductsComponent, CustomersComponent, PoshtaComponent } from './containers/index';
export var routes = RouterModule.forRoot([
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
