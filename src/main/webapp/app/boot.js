"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/http");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var forms_1 = require("@angular/forms");
var index_1 = require("./index");
var index_2 = require("./containers/index");
var index_3 = require("./ui/index");
var index_4 = require("./directives/index");
var environment_1 = require("./environment");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                index_1.App,
                index_3.Header,
                index_2.OrdersComponent,
                index_2.ProductsComponent,
                index_2.CustomersComponent,
                index_1.KeysPipe,
                index_1.SearchPipe,
                index_4.HotkeysDirective,
                index_4.Autocomplete,
                index_3.AutocompleteList,
                index_4.ContenteditableModel,
                index_3.Pagination,
                index_3.PopupComponent,
                index_3.Filter,
                index_3.FilterStatic,
                index_3.NotyComponent
            ],
            providers: index_1.providers,
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                index_1.routes
            ],
            entryComponents: [index_3.AutocompleteList, index_3.PopupComponent, index_3.NotyComponent],
            bootstrap: [index_1.App]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsOERBQTBEO0FBQzFELG1FQUErRTtBQUMvRSxzQ0FBMkM7QUFDM0MsOEVBQTJFO0FBQzNFLHdDQUFrRTtBQUNsRSxpQ0FBdUU7QUFDdkUsNENBQTRGO0FBQzVGLG9DQUF1SDtBQUN2SCw0Q0FBMEY7QUFDMUYsNkNBQTRDO0FBa0M1QztJQUFBO0lBQXdCLENBQUM7SUFBWixTQUFTO1FBaENyQixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ1osV0FBRztnQkFDSCxjQUFNO2dCQUNOLHVCQUFlO2dCQUNmLHlCQUFpQjtnQkFDakIsMEJBQWtCO2dCQUNsQixnQkFBUTtnQkFDUixrQkFBVTtnQkFDVix3QkFBZ0I7Z0JBQ2hCLG9CQUFZO2dCQUNaLHdCQUFnQjtnQkFDaEIsNEJBQW9CO2dCQUNwQixrQkFBVTtnQkFDVixzQkFBYztnQkFDZCxjQUFNO2dCQUNOLG9CQUFZO2dCQUNaLHFCQUFhO2FBQ2Q7WUFDRCxTQUFTLG1CQUFBO1lBQ1QsT0FBTyxFQUFFO2dCQUNQLGdDQUFhO2dCQUNiLG9DQUF1QjtnQkFDdkIsaUJBQVU7Z0JBQ1YsbUJBQVc7Z0JBQ1gsMkJBQW1CO2dCQUNuQixjQUFNO2FBQ1A7WUFDRCxlQUFlLEVBQUUsQ0FBQyx3QkFBZ0IsRUFBRSxzQkFBYyxFQUFFLHFCQUFhLENBQUM7WUFDbEUsU0FBUyxFQUFFLENBQUMsV0FBRyxDQUFDO1NBQ2pCLENBQUM7T0FFVyxTQUFTLENBQUc7SUFBRCxnQkFBQztDQUF6QixBQUF5QixJQUFBO0FBQVosOEJBQVM7QUFFdEIsRUFBRSxDQUFDLENBQUMseUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzNCLHFCQUFjLEVBQUUsQ0FBQztBQUNuQixDQUFDO0FBQ0QsaURBQXNCLEVBQUUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMiLCJmaWxlIjoiYm9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBlbmFibGVQcm9kTW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFwcCwgcHJvdmlkZXJzLCByb3V0ZXMsIEtleXNQaXBlLCBTZWFyY2hQaXBlIH0gZnJvbSAnLi9pbmRleCc7XHJcbmltcG9ydCB7IE9yZGVyc0NvbXBvbmVudCwgUHJvZHVjdHNDb21wb25lbnQsIEN1c3RvbWVyc0NvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9pbmRleCc7XHJcbmltcG9ydCB7IEhlYWRlciwgQXV0b2NvbXBsZXRlTGlzdCwgUGFnaW5hdGlvbiwgUG9wdXBDb21wb25lbnQsIEZpbHRlciwgRmlsdGVyU3RhdGljLCBOb3R5Q29tcG9uZW50IH0gZnJvbSAnLi91aS9pbmRleCc7XHJcbmltcG9ydCB7IEhvdGtleXNEaXJlY3RpdmUsIEF1dG9jb21wbGV0ZSwgQ29udGVudGVkaXRhYmxlTW9kZWwgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaW5kZXgnO1xyXG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFwcCxcclxuICAgIEhlYWRlcixcclxuICAgIE9yZGVyc0NvbXBvbmVudCxcclxuICAgIFByb2R1Y3RzQ29tcG9uZW50LFxyXG4gICAgQ3VzdG9tZXJzQ29tcG9uZW50LFxyXG4gICAgS2V5c1BpcGUsXHJcbiAgICBTZWFyY2hQaXBlLFxyXG4gICAgSG90a2V5c0RpcmVjdGl2ZSxcclxuICAgIEF1dG9jb21wbGV0ZSxcclxuICAgIEF1dG9jb21wbGV0ZUxpc3QsXHJcbiAgICBDb250ZW50ZWRpdGFibGVNb2RlbCxcclxuICAgIFBhZ2luYXRpb24sXHJcbiAgICBQb3B1cENvbXBvbmVudCxcclxuICAgIEZpbHRlcixcclxuICAgIEZpbHRlclN0YXRpYyxcclxuICAgIE5vdHlDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVycyxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBCcm93c2VyTW9kdWxlLFxyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBIdHRwTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgcm91dGVzXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtBdXRvY29tcGxldGVMaXN0LCBQb3B1cENvbXBvbmVudCwgTm90eUNvbXBvbmVudF0sXHJcbiAgYm9vdHN0cmFwOiBbQXBwXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxyXG5cclxuaWYgKGVudmlyb25tZW50LnByb2R1Y3Rpb24pIHtcclxuICBlbmFibGVQcm9kTW9kZSgpO1xyXG59XHJcbnBsYXRmb3JtQnJvd3NlckR5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKTtcclxuIl19
