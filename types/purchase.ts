import { Product } from "./product";
import { Address } from "./address";

export type Purchase = {
  id: string;
  product: Product;
  date: string; // ISO formatted date string
  address: Address;
  deliveryInstructions?: string;
  paymentMethod: "credit_card";
};
