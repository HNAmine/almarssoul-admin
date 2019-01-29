import { Category } from "./category.model";

export class Store {
    id?: number;
    labelAr?: string;
    descriptionAr?: string;
    labelFr?: string;
    descriptionFr?: string;
    avatarUri?:string;
    enable?: boolean;
    code?: string;
    type?: 'DEFAULT' | 'RESTAURANT'| 'BUTCHERS';
    categories?: Category[];
  }
  