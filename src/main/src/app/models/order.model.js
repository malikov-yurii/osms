import { Product } from "./index";
var Order = /** @class */ (function () {
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
    Order.count = 0;
    return Order;
}());
export { Order };
