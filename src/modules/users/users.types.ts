export interface User{
  email: string;
  phoneNumber: string;
  verified?: boolean;
  status: AccountStatus
}

export interface CreateUser extends User{
  password: string;
}

export enum AccountStatus {
  Active = 'active',
  Disabled = 'disabled',
  Deleted = 'deleted',
  Blocked = 'blocked'
}

export interface Login extends Omit<CreateUser, "phoneNumber"> {
  deviceId: string;
  deviceName: string;
}