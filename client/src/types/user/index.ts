import type { AccountTypeKey, CurrencyTypeKey } from '@/features/wallet/config';

export type Role = 'user' | 'moderator' | 'admin';

/**
 * User FingerPrint Model
 */
export interface UserFingerPrint {
  userAgent: string;
  browser: string;
  os: string;
  cpu: string;
  mobile: number;
  timeZone?: string;
  language: string;
  deviceType: number;
  lastActive: string;
}

/**
 * Base User Model
 */
export interface UserBase {
  id: string;
  name: string;
  email: string;
  role?: Role[];
  avatar?: string;
  terms?: boolean;
  verified?: boolean;
  blockedBy?: string[];
}

/**
 * Authentication through Website
 */
export interface InternalUser extends Omit<UserBase, 'id'> {
  password: string;
  terms: boolean;
}

/**
 * Authentication through O/Auth | 3rd party
 */
export interface ExternalUser extends Omit<UserBase, 'id'> {
  photoUrl: string;
  isVerified: boolean;
  userFingerPrint: UserFingerPrint;
}

/**
 * User Details
 */
export interface UserDetails extends UserBase {
  userAvatar: string;
  userFingerprint: UserFingerPrint;
}

/**
 * For Forgotten password flow
 */
export interface UserForgottenPassword extends Pick<UserBase, 'email'> {
  password?: string;
  confirm_password?: string;
}

export interface Wallet {
  readonly _id: string;
  name: string;
  balance: number;
  currency: CurrencyTypeKey;
  type: AccountTypeKey;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  active: boolean;
  icon?: string;
  description?: string;
}

export interface Account {
  id: string;
  walletId: string;
  name: string;
  currency: keyof CurrencyType;
  balance?: string;
  description?: string;
  icon?: string;
  type: keyof AccountType;
  active: boolean;
}

export type CurrencyType = {
  USD: 'USD';
  EUR: 'EUR';
  GBP: 'GBP';
  JPY: 'JPY';
  CNY: 'CNY';
  INR: 'INR';
  RUB: 'RUB';
  BTC: 'BTC';
  ETH: 'ETH';
  LTC: 'LTC';
  BGN: 'BGN';
  CZK: 'CZK';
  TUR: 'TUR';
};

export type AccountType = {
  SAVINGS: 'Savings';
  CREDIT: 'Credit';
  CHECKING: 'Checking';
  INVESTING: 'Investment';
  DEPOSIT: 'Deposit';
  STANDARD: 'Standard'; // Universal Type
};
