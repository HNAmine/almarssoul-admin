export interface Credentials {
  login: string;
  password: string;
}

export class Invitation {
  id: number;
  createdAt: Date;
  validationCode?: string;
  phone?:string;
  state?:string;
  invited?: User;
}

export class InvitationPayload {
  validationCode?: string;
  phone?:string;
  firstName?:string;
  lastName?:string;
  password?: User;
}

export interface User {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  rawPassword?: string;
  password?: string;
  repassword?: string;
  phone?: string;
  address?: string;
  roles?: Role[];
}

export interface Token {
  sub?: string;
  user?: User;
  iat: number | Date;
  exp: number | Date;
}

export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN', ROLE_CLIENT = 'ROLE_CLIENT', ROLE_DELIVERY = 'ROLE_DELIVERY'
}

export interface PasswordConfirmation {
  id?: number;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  receiveNotification?: boolean;
}
