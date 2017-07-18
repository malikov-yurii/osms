"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var services = require("./services/index");
var store_1 = require("./store");
var app_1 = require("./app");
exports.App = app_1.App;
var routes_1 = require("./routes");
exports.routes = routes_1.routes;
var pipes_1 = require("./pipes");
exports.KeysPipe = pipes_1.KeysPipe;
exports.SearchPipe = pipes_1.SearchPipe;
var mapValuesToArray = function (obj) { return Object.keys(obj).map(function (key) { return obj[key]; }); };
exports.providers = [
    store_1.Store
].concat(mapValuesToArray(services));
//# sourceMappingURL=index.js.map