"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order = (function () {
    function Order() {
        this.id = "0-" + Order.count++;
        this.customerId = 0;
        this.firstName = '';
        this.lastName = '';
        this.phoneNumber = '';
        this.city = '';
        this.postOffice = '';
        this.totalSum = 0;
        this.paymentType = 'NP';
        this.date = '';
        this.status = 'SHP';
        this.comment = '';
        this.orderItemDtos = [new Product()];
    }
    return Order;
}());
Order.count = 0;
exports.Order = Order;
var Product = (function () {
    function Product() {
        this.id = "0-" + Product.count++;
        this.orderProductId = 0;
        this.name = '';
        this.quantity = '1';
        this.price = '0';
        this.supplier = '';
    }
    return Product;
}());
Product.count = 0;
exports.Product = Product;
var AutocompleteItem = (function () {
    function AutocompleteItem() {
        this.label = '';
    }
    return AutocompleteItem;
}());
exports.AutocompleteItem = AutocompleteItem;
var StaticDATA = (function () {
    function StaticDATA() {
    }
    return StaticDATA;
}());
StaticDATA.infoBlocks = {
    status: ['SHP', 'WFP', 'OK', 'NEW', 'NOT'],
    paymentType: ['PB', 'SV', 'NP']
};
StaticDATA.autocompleteBlocks = ['firstName', 'lastName', 'phoneNumber', 'city', 'name'];
StaticDATA.keycodesNotToAutocomplete = [9, 13, 16, 17, 18, 20]; // Tab, Enter, Shift, Ctrl, Alt, Caps Lock
exports.StaticDATA = StaticDATA;
//# sourceMappingURL=models.js.map