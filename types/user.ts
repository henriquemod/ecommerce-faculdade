import { Address } from "./address";
import { DeliveryOption } from "./purchase";

export interface User {
  username: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  address: Address;
  avatar?: string;
  deliveryInstructions?: string;
  deliveryOption?: DeliveryOption; // New field for delivery option
}
