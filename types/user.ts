import { Address } from "./address";

export type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  address: Address;
  avatar?: string;
};
