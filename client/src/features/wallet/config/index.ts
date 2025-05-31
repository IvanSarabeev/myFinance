import { ElementType } from 'react';
import {
  PiggyBank,
  CreditCard,
  Banknote,
  BarChart3,
  Wallet,
  Landmark,
} from 'lucide-react';
import {
  FaDollarSign,
  FaEuroSign,
  FaPoundSign,
  FaYenSign,
  FaRubleSign,
  FaBitcoin,
} from 'react-icons/fa';
import { SiEthereum, SiLitecoin } from 'react-icons/si';
import { GiCoins } from 'react-icons/gi';
import { TbCurrencyTugrik, TbCurrencyForint } from 'react-icons/tb'; // For unknown ones
import { BsCurrencyRupee } from 'react-icons/bs';

export const WALLET_STEPS = {
  Initial: 'Initial',
  CUSTOM_ACCOUNT: 'CustomAccount',
  CUSTOM_WALLET: 'CustomWallet',
  DEFAULT: 'Default',
} as const;

/**
 * This is a list of currency codes that can be used in the wallet application.
 */
export const CurrencyOptions = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  CNY: 'CNY',
  INR: 'INR',
  RUB: 'RUB',
  BTC: 'BTC',
  ETH: 'ETH',
  LTC: 'LTC',
  BGN: 'BGN',
  CZK: 'CZK',
  TUR: 'TUR',
} as const;

export type CurrencyTypeKey = keyof typeof CurrencyOptions;

export const CurrencyIconOptions = {
  USD: FaDollarSign,
  EUR: FaEuroSign,
  GBP: FaPoundSign,
  JPY: FaYenSign,
  CNY: GiCoins, // Generic coin icon (no CNY available)
  INR: BsCurrencyRupee,
  RUB: FaRubleSign,
  BTC: FaBitcoin,
  ETH: SiEthereum,
  LTC: SiLitecoin,
  BGN: TbCurrencyTugrik, // Closest visual fit
  CZK: TbCurrencyForint, // Closest alternative
  TUR: GiCoins, // No Turkish Lira, using generic
} as const;

export type CurrencyKey = keyof typeof CurrencyIconOptions;

/**
 * This is a list of account types that can be used in the wallet application.
 */
export const AccountTypeOptions = {
  SAVINGS: 'Savings',
  CREDIT: 'Credit',
  CHECKING: 'Checking',
  INVESTING: 'Investment',
  DEPOSIT: 'Deposit',
  STANDARD: 'Standard',
} as const;

export type AccountTypeKey = keyof typeof AccountTypeOptions;

export const AccountIconOptions: Record<AccountTypeKey, ElementType> = {
  SAVINGS: PiggyBank,
  CREDIT: CreditCard,
  CHECKING: Banknote,
  INVESTING: BarChart3,
  DEPOSIT: Landmark,
  STANDARD: Wallet, // Default Universal
};

export type AccountIconKey = keyof typeof AccountIconOptions;
