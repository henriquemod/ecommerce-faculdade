import { Product } from "./product";
import { Address } from "./address";

export type Purchase = {
  id: string;
  product: Product;
  date: string; // ISO formatted date string
  address: Address;
  deliveryInstructions?: string;
  paymentMethod: "credit_card";
  deliveryOption: DeliveryOption;
};

export enum DeliveryOption {
  PickupCenter = "pickup_center",
  PickupEntry = "pickup_entry",
  DeliveryDoor = "delivery_door",
}
