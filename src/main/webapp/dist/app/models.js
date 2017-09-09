"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order = (function () {
    function Order() {
        this.id = "0-" + Order.count++;
        this.customerId = 0;
        this.customerLastName = '';
        this.customerFirstName = '';
        this.customerPhoneNumber = '';
        this.destinationCity = '';
        this.destinationPostOffice = '';
        this.paymentType = 'NP';
        this.totalSum = 0;
        this.createdDateTime = new Date();
        this.status = 'NEW';
        this.note = '';
        this.customerNote = '';
        this.orderItems = [new Product()];
    }
    return Order;
}());
Order.count = 0;
exports.Order = Order;
var Product = (function () {
    function Product() {
        this.id = "0-" + Product.count++;
        this.productId = 0;
        this.productVariationId = 0;
        this.name = '';
        this.categories = [''];
        this.quantity = '0';
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
exports.STATIC_DATA = {
    infoBlocks: {
        status: ['SHP', 'WFP', 'OK', 'NEW', 'NOT'],
        paymentType: ['PB', 'SV', 'NP']
    },
    fieldsToAutocomplete: ['customerLastName', 'customerPhoneNumber', 'destionationCity', 'name'],
    keycodesNotToAutocomplete: [9, 13, 16, 17, 18, 20],
    sessionTime: 235 * 60 * 1000,
    ordersPath: 'order',
    orderItemsPath: 'orderItems'
};
//# sourceMappingURL=models.js.map