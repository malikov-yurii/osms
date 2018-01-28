export class Product {
  static count: number = 0;

  orderLineId?: any = `0-${Product.count++}`;
  productId: number = 0;
  productVariationId?: number = 0;
  orderLineProductName: string = '';
  categories?: string[] = [''];
  orderLineProductQuantity: string = '0';
  orderLineProductPrice: string = '0';
  supplier: string = '';
  isAggregated: boolean;
}