export interface User{
  _id?: Object,
  email: string;
  phoneNumber: string;
  verified?: boolean;
  status: AccountStatus
}

export interface CreateUser extends Omit<User, "_id">{
  password: string;
}

export enum AccountStatus {
  Active = 'active',
  Disabled = 'disabled',
  Deleted = 'deleted',
  Blocked = 'blocked'
}

export interface Login extends Omit<CreateUser, "phoneNumber"> {
  _id?: Object,
  deviceId?: string;
  deviceName?: string;
}