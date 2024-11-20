import { Category } from "./category";
import { User } from "./user";

export type Advertisement = {
  user: User;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
};
