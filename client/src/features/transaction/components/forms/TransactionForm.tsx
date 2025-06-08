import { FC, memo, useState } from 'react';
import type {
  CreateTransaction,
  TransactionState,
} from '@/features/transaction/types.ts';
import { Wallet } from '@/types/user';
import CreateTransactionForm from '@/features/transaction/components/forms/CreateTransactionForm.tsx';

interface TransactionFormProps {
  wallets: Wallet[];
}

const TransactionForm: FC<TransactionFormProps> = ({ wallets }) => {
  const [transactionState, setTransactionState] = useState<TransactionState>({
    formData: {
      amount: 0,
      type: '',
      category: '',
      description: '',
      icon: '',
      isActive: false,
    },
    errorFields: [],
    isLoading: false,
    isSubmitting: false,
  });

  /**
   * Updates the state of a transaction by updating the specified key with the provided value.
   *
   * @template T - The type of the value to be updated in the state.
   * @param {keyof typeof transactionState} key - The key in the transaction state to update.
   * @param {T | ((currentValue: any) => T)} value - The new value for the specified key, or a function
   * that takes the current value and returns the updated value.
   */
  const handleState = <T,>(key: keyof typeof transactionState, value: T) => {
    setTransactionState({
      ...transactionState,
      [key]: typeof value === 'function' ? value(transactionState[key]) : value,
    });
  };

  /**
   * Updates the state of a form field within the transaction form data.
   *
   * @template K - The type of the key in the `CreateTransaction` interface.
   * @param {K} key - The key of the form field to update.
   * @param {CreateTransaction[K]} value - The new value to set for the specified form field.
   * If the value is a function, it will be executed with the current value of the field
   * and its return value will be used as the updated value.
   */
  const handleFormChange = <K extends keyof CreateTransaction>(
    key: K,
    value: CreateTransaction[K]
  ) => {
    setTransactionState((prevState) => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [key]:
          typeof value === 'function'
            ? (value as (prev: CreateTransaction[K]) => CreateTransaction[K])(
                prevState.formData[key]
              )
            : value,
      },
    }));
  };

  return (
    <article className="px-6 py-2.5">
      <CreateTransactionForm
        wallets={wallets}
        transactionState={transactionState}
        handleState={handleState}
        handleFormChange={handleFormChange}
      />
    </article>
  );
};

export default memo(TransactionForm);
