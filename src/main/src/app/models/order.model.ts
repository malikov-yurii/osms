import { Product } from "./index";

export class Order {
  static count: number = 0;

  id: any = `0-${Order.count++}`;
  customerId: number = 0;
  customerLastName: string = '';
  customerFirstName: string = '';
  customerPhoneNumber: string = '';
  destinationCity: string = '';
  destinationPostOffice: string = '';
  paymentType: string = 'NP';
  totalSum: number = 0;
  createdDateTime: any = new Date();
  status: string = 'NEW';
  note: string = '';
  customerNote: string = '';
  orderItems: Product[] = [new Product()];
}