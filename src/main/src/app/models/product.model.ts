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
  isAggregated: boolean;
}