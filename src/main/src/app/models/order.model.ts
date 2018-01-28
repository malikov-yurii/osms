import { Product } from "./index";

export class Order {
  static count: number = 0;

  orderId: any = `0-${Order.count++}`;
  customerId: number = 0;
  customerLastName: string = '';
  customerFirstName: string = '';
  customerPhoneNumber: string = '';
  destinationCity: string = '';
  destinationPostOffice: string = '';
  paymentType: string = 'NP';
  totalValue: number = 0;
  createdDateTime: any = new Date();
  status: string = 'NEW';
  orderNote: string = '';
  customerNote: string = '';
  orderLines: Product[] = [new Product()];
}