import { Order, Product } from "./index";

export interface IState {
  order: Order[];
  product: Product[];
  productAggregators: any[];
  customer: any[];
}