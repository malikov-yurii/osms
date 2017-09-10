"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services = require("./services/index");
var store_1 = require("./store");
var app_1 = require("./app");
exports.App = app_1.App;
var routes_1 = require("./routes");
exports.routes = routes_1.routes;
var index_1 = require("./pipes/index");
exports.KeysPipe = index_1.KeysPipe;
exports.SearchPipe = index_1.SearchPipe;
var mapValuesToArray = function (obj) { return Object.keys(obj).map(function (key) { return obj[key]; }); };
exports.providers = [
    { provide: core_1.LOCALE_ID, useValue: "ru-RU" },
    store_1.Store
].concat(mapValuesToArray(services));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLDJDQUE2QztBQUM3QyxpQ0FBZ0M7QUFFaEMsNkJBQTRCO0FBQW5CLG9CQUFBLEdBQUcsQ0FBQTtBQUNaLG1DQUFrQztBQUF6QiwwQkFBQSxNQUFNLENBQUE7QUFDZix1Q0FBcUQ7QUFBNUMsMkJBQUEsUUFBUSxDQUFBO0FBQUUsNkJBQUEsVUFBVSxDQUFBO0FBRTdCLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxHQUFHLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBUixDQUFRLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztBQUUzRCxRQUFBLFNBQVM7SUFDcEIsRUFBRSxPQUFPLEVBQUUsZ0JBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0lBQ3pDLGFBQUs7U0FDRixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFDN0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMT0NBTEVfSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIHNlcnZpY2VzIGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcblxuZXhwb3J0IHsgQXBwIH0gZnJvbSAnLi9hcHAnO1xuZXhwb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xuZXhwb3J0IHsgS2V5c1BpcGUsIFNlYXJjaFBpcGUgfSBmcm9tICcuL3BpcGVzL2luZGV4JztcblxuY29uc3QgbWFwVmFsdWVzVG9BcnJheSA9IChvYmopID0+IE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiBvYmpba2V5XSk7XG5cbmV4cG9ydCBjb25zdCBwcm92aWRlcnMgPSBbXG4gIHsgcHJvdmlkZTogTE9DQUxFX0lELCB1c2VWYWx1ZTogXCJydS1SVVwiIH0sXG4gIFN0b3JlLFxuICAuLi5tYXBWYWx1ZXNUb0FycmF5KHNlcnZpY2VzKVxuXTtcbiJdfQ==
