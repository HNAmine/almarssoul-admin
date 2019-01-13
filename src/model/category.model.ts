import { Product } from "./product.model";

export class Category {
  id: number;
  label: string;
  description?: string;
  avatarUri?:string;
  products:Product[];
  constructor(
    id: number,
    label: string,
    description?: string,
    avatarUri?:string
  ) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.avatarUri = avatarUri;
  }
}
