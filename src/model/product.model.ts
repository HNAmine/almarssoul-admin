import { BasketState } from "./basket.model";

export class Product {
  id?: number;
  label?: string;
  cost?: number;
  description?: string;
  createdAt?:Date;
  expiredAt?:Date;
  canbeExpired?:boolean;
  enable?:boolean;
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
  products?: ProductDetails[];
  closestPositions?: PointInterest[]
}

export class ProductDetails{
  productId?: number;
  productLabel?: string;
  productDescription?: string;
	categoryLabel?: string;
	storeLabel?: string;
	productCost?: number;
	quantity?: number;
}