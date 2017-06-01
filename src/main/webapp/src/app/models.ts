export class Order {
  id: number = 0;
  customerId: number = 0;
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  city: string = '';
  postOffice: string = '';
  totalSum: number = 0;
  paymentType: string = 'NP';
  date: string = '';
  status: string = 'SHP';
  comment: string = '';
  orderItemTos: OrderItem[] = [new OrderItem()];
}

export class OrderItem {
  id: number = 0;
  orderProductId: number = 0;
  name: string = '';
  quantity: string = '1';
  price: string = '0';
  supplier: string = '';
}
