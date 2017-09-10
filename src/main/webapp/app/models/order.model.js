"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
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
        this.orderItems = [new index_1.Product()];
    }
    Order.count = 0;
    return Order;
}());
exports.Order = Order;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy9vcmRlci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFrQztBQUVsQztJQUFBO1FBR0UsT0FBRSxHQUFRLE9BQUssS0FBSyxDQUFDLEtBQUssRUFBSSxDQUFDO1FBQy9CLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBQzlCLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUMvQix3QkFBbUIsR0FBVyxFQUFFLENBQUM7UUFDakMsb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFDN0IsMEJBQXFCLEdBQVcsRUFBRSxDQUFDO1FBQ25DLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsb0JBQWUsR0FBUSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2xDLFdBQU0sR0FBVyxLQUFLLENBQUM7UUFDdkIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQWMsQ0FBQyxJQUFJLGVBQU8sRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQWhCUSxXQUFLLEdBQVcsQ0FBQyxDQUFDO0lBZ0IzQixZQUFDO0NBakJELEFBaUJDLElBQUE7QUFqQlksc0JBQUsiLCJmaWxlIjoibW9kZWxzL29yZGVyLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL2luZGV4XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT3JkZXIge1xyXG4gIHN0YXRpYyBjb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgaWQ6IGFueSA9IGAwLSR7T3JkZXIuY291bnQrK31gO1xyXG4gIGN1c3RvbWVySWQ6IG51bWJlciA9IDA7XHJcbiAgY3VzdG9tZXJMYXN0TmFtZTogc3RyaW5nID0gJyc7XHJcbiAgY3VzdG9tZXJGaXJzdE5hbWU6IHN0cmluZyA9ICcnO1xyXG4gIGN1c3RvbWVyUGhvbmVOdW1iZXI6IHN0cmluZyA9ICcnO1xyXG4gIGRlc3RpbmF0aW9uQ2l0eTogc3RyaW5nID0gJyc7XHJcbiAgZGVzdGluYXRpb25Qb3N0T2ZmaWNlOiBzdHJpbmcgPSAnJztcclxuICBwYXltZW50VHlwZTogc3RyaW5nID0gJ05QJztcclxuICB0b3RhbFN1bTogbnVtYmVyID0gMDtcclxuICBjcmVhdGVkRGF0ZVRpbWU6IGFueSA9IG5ldyBEYXRlKCk7XHJcbiAgc3RhdHVzOiBzdHJpbmcgPSAnTkVXJztcclxuICBub3RlOiBzdHJpbmcgPSAnJztcclxuICBjdXN0b21lck5vdGU6IHN0cmluZyA9ICcnO1xyXG4gIG9yZGVySXRlbXM6IFByb2R1Y3RbXSA9IFtuZXcgUHJvZHVjdCgpXTtcclxufSJdfQ==
