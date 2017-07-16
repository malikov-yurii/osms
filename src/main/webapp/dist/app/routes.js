"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./containers/index");
exports.routes = router_1.RouterModule.forRoot([
    // {
    //   path: '',
    //   redirectTo: '/orders',
    //   pathMatch: 'full'
    // },
    {
        path: '',
        component: index_1.Orders
    },
    {
        path: 'products',
        component: index_1.Products
    },
    {
        path: 'customers',
        component: index_1.Customers
    }
]);
