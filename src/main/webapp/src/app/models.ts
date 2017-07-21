export class Order {
  static count: number = 0;

  id: any = `0-${Order.count++}`;
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
  orderItemDtos: Product[] = [new Product()];
}

export class Product {
  static count: number = 0;

  id: any = `0-${Product.count++}`;
  orderProductId: number = 0;
  name: string = '';
  categories?: {id, name}[] = [{id: '', name: ''}];
  quantity: string = '1';
  price: string = '0';
  supplier: string = '';
}

export class AutocompleteItem {
  label: string = '';
}

export class StaticDATA {
  static readonly infoBlocks = {
    status: ['SHP', 'WFP', 'OK', 'NEW', 'NOT'],
    paymentType: ['PB', 'SV', 'NP']
  };

  static readonly autocompleteBlocks = ['firstName', 'lastName', 'phoneNumber', 'city', 'name'];

  static readonly keycodesNotToAutocomplete = [9, 13, 16, 17, 18, 20]; // Tab, Enter, Shift, Ctrl, Alt, Caps Lock
}

