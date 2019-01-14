import { Category } from "./category.model";

export class Store {
    id?: number;
    label?: string;
    description?: string;
    avatarUri?:string;
    enable?: boolean;
    type?: 'DEFAULT' | 'RESTAURANT'| 'BUTCHERS';
    categories?: Category[];
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
  