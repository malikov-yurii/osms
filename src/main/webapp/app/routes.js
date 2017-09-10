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
        component: index_1.OrdersComponent
    },
    {
        path: 'products',
        component: index_1.ProductsComponent
    },
    {
        path: 'customers',
        component: index_1.CustomersComponent
    }
]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUErQztBQUUvQyw0Q0FBNEY7QUFFL0UsUUFBQSxNQUFNLEdBQXdCLHFCQUFZLENBQUMsT0FBTyxDQUFDO0lBQzlELElBQUk7SUFDSixjQUFjO0lBQ2QsMkJBQTJCO0lBQzNCLHNCQUFzQjtJQUN0QixLQUFLO0lBQ0w7UUFDRSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSx1QkFBZTtLQUMzQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLFVBQVU7UUFDaEIsU0FBUyxFQUFFLHlCQUFpQjtLQUM3QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLFdBQVc7UUFDakIsU0FBUyxFQUFFLDBCQUFrQjtLQUM5QjtDQUNGLENBQUMsQ0FBQyIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJzQ29tcG9uZW50LCBQcm9kdWN0c0NvbXBvbmVudCwgQ3VzdG9tZXJzQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IHJvdXRlczogTW9kdWxlV2l0aFByb3ZpZGVycyA9IFJvdXRlck1vZHVsZS5mb3JSb290KFtcbiAgLy8ge1xuICAvLyAgIHBhdGg6ICcnLFxuICAvLyAgIHJlZGlyZWN0VG86ICcvb3JkZXJzJyxcbiAgLy8gICBwYXRoTWF0Y2g6ICdmdWxsJ1xuICAvLyB9LFxuICB7XG4gICAgcGF0aDogJycsXG4gICAgY29tcG9uZW50OiBPcmRlcnNDb21wb25lbnRcbiAgfSxcbiAge1xuICAgIHBhdGg6ICdwcm9kdWN0cycsXG4gICAgY29tcG9uZW50OiBQcm9kdWN0c0NvbXBvbmVudFxuICB9LFxuICB7XG4gICAgcGF0aDogJ2N1c3RvbWVycycsXG4gICAgY29tcG9uZW50OiBDdXN0b21lcnNDb21wb25lbnRcbiAgfVxuXSk7XG4iXX0=
