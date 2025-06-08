import type { Account } from '@/types/user';

export interface Transaction {
  id?: string;
  account: Account;
  amount: number;
  type: string;
  category: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export type CreateTransaction = Omit<Transaction, 'id' | 'account'>;

export interface TransactionState {
  formData: CreateTransaction;
  errorFields: [];
  isSubmitting: boolean;
  isLoading: boolean;
}
