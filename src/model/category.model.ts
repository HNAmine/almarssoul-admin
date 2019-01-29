import { Product } from "./product.model";

export class Category {
  id?: number;
  labelAr?: string;
  descriptionAr?: string;
  labelFr?: string;
  descriptionFr?: string;
  avatarUri?:string;
  createdAt?: Date;
  storeLabel?:string;
  products?:Product[];
  storeId?: number;
}
