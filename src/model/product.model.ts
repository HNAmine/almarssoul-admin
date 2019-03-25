import { BasketState } from "./basket.model";
import { Label } from "ionic-angular";

export class Product {
  id?: number;
  label?: string;
  cost?: number;
  description?: string;
  createdAt?:Date;
  expiredAt?:Date;
  canbeExpired?:boolean;
  enable?:boolean;
  categoryLabel?:Label;
  categoryId?: number;
}

export class Assignment {
  quantity: number;
  totalCost: number;
  product: Product;
}

export class AssignmentGlobal{
  assignments?: Assignment[];
  totalCost?: number;
  createdAt?: Date;
	state?: BasketState;
	ownerRate?: number;
	ownerComment?: string;
	deliveryRate?: number;
  deliveryComment?: string;
  deliveryCost?: number;
}

export enum Action {
  ADD = 'ADD', UPDATE= 'UPDATE', DELETE= 'DELETE', SUBMIT= 'SUBMIT'
}

export class Address {
  details?: string;
	lat?: number;
	lng?: number;
	city?: string;
	country?: string;
	postalCode?: string
}

export class AssignmentPayload {
  idProduct?: number;
	quantity?: number;
	action?: Action;
  submit?: boolean;
  address?:Address;
}
export class PointInterest{
  id?: number;
	label?: string;
	lat?: number;
	lng?: number;
  distance?: number;
  avatarUri?: string;
}

export class BasketDetails {
  id?: number;
	state?: string;
	createdAt?: Date;
	doneAt?: Date;
	ownerFirstName?: string;
	ownerLastName?: string;
  phone?: string;
  ownerRate?: number;
  totalCost?: number;
  deliveryCost?: number;
  lat?: number;
  lng?:number;
  deliveryFirstName?: string;
	deliveryLastName?: string;
	deliveryPhone?: string;
	deliveryAvatarUri?: string;
  products?: ProductDetails[];
  closestPositions?: PointInterest[]
}

export class ProductDetails{
  productId?: number;
  productLabelAr?: string;
  productLabelFr?: string;
  productDescriptionAr?: string;
  productDescriptionFr?: string;
	categoryLabelAr?: string;
	categoryLabelFr?: string;
	storeLabelAr?: string;
	storeLabelFr?: string;
	productCost?: number;
	quantity?: number;
}
