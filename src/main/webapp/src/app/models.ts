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

export class Product {
  static count: number = 0;

  id: any = `0-${Product.count++}`;
  productId?: number = 0;
  productVariationId?: number = 0;
  name: string = '';
  categories?: string[] = [''];
  quantity: string = '0';
  price: string = '0';
  supplier: string = '';
}

export class AutocompleteItem {
  label: string = '';
}

export const STATIC_DATA = {
  infoBlocks: {
    status: ['SHP', 'WFP', 'OK', 'NEW', 'NOT'],
    paymentType: ['PB', 'SV', 'NP']
  },
  fieldsToAutocomplete: ['customerLastName', 'customerPhoneNumber', 'destionationCity', 'name'],
  keycodesNotToAutocomplete: [9, 13, 16, 17, 18, 20], // Tab, Enter, Shift, Ctrl, Alt, Caps Lock
  sessionTime: 235 * 60 * 1000, // minutes

  ordersPath: 'order',
  orderItemsPath: 'orderItems'
};

export interface IOrderFilter {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  date: string;
}

export interface IPageStream {
  page: number;
  length: number;
  apiGet?: boolean
}