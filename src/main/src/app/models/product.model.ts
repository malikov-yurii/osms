export class Product {
  static count: number = 0;

  orderLineId?: any = `0-${Product.count++}`;
  productId: number = 0;
  productVariationId?: number = 0;
  orderLineProductName: string = '';
  orderLineProductQuantity: string = '0';
  orderLineProductPrice: string = '0';
  productCategories?: string[] = [''];
  productAggregated?: boolean;
  productImage?: string;
  productName?: string;
  productPrice?: string;
  productSupplier?: string;
  productQuantityUnlimited?: boolean;
  productQuantity?: string;
}