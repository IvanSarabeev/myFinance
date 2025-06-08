import { FC, FormEvent } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { Button } from '@/components/ui/button.tsx';
import type {
  CreateTransaction,
  TransactionState,
} from '@/features/transaction/types.ts';
import type { Wallet } from '@/types/user';
import WalletSelector from '@/features/transaction/components/__comp/WalletSelector.tsx';
import { observer } from 'mobx-react-lite';
import CurrencySelector from '@/features/transaction/components/__comp/CurrencySelector.tsx';
import CategortyTypeSelector from '@/features/transaction/components/__comp/CategortyTypeSelector.tsx';

interface CreateTransactionFormProps {
  transactionState: TransactionState;
  wallets: Wallet[];
  handleState: <T>(
    key: keyof TransactionState,
    value: T | ((prev: TransactionState[keyof TransactionState]) => T)
  ) => void;
  handleFormChange: <K extends keyof CreateTransaction>(
    key: K,
    value: CreateTransaction[K]
  ) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const CreateTransactionForm: FC<CreateTransactionFormProps> = ({
  transactionState,
  wallets,
  handleState,
  handleFormChange,
}) => {
  const handleFormSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data = {
      ...transactionState.formData,
    };

    handleState('errorFields', []);

    return await new Promise((resolve) => {
      console.log('Submitting Form:');
      setTimeout(() => {
        resolve(data);
      }, 300);
    })
      .then((response) => {
        handleState('isSubmitting', true);
        console.log('Form Response: ', response);
      })
      .finally(() => {
        handleState('isSubmitting', false);
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Transaction Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* TODO: Add onChange for the wallet */}
        <WalletSelector wallets={wallets} />

        {/* Account Name */}
        <div>
          <Label>Account Name</Label>
          <Input placeholder="e.g. Emergency Fund" />
        </div>

        {/* Currency and Balance */}
        <div className="grid grid-cols-2 gap-4">
          {/*  TODO: Add Currency Selector */}
          <CurrencySelector />
          <div>
            <Label>Balance</Label>
            <Input type="number" placeholder="0.00" />
          </div>
        </div>

        {/* Type */}
        <CategortyTypeSelector handleFormChange={handleFormChange} />

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea placeholder="Brief description..." />
        </div>

        {/* Icon Upload or Select */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Select Icon</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose Icon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="piggy">🐷 Piggy Bank</SelectItem>
                <SelectItem value="wallet">👛 Wallet</SelectItem>
                <SelectItem value="safe">🔐 Safe</SelectItem>
                <SelectItem value="bank">🏦 Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Or Upload Icon</Label>
            <Input type="file" accept="image/*" />
          </div>
        </div>

        {/* Account Type and Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Account Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="saving">Saving</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Label htmlFor="active-switch">Status</Label>
            <Switch
              id="active-switch"
              checked={transactionState.formData.isActive}
              // onCheckedChange={setState('form')}
            />
            <span>
              {transactionState.formData.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            onClick={(event) => handleFormSubmit(event)}
            disabled={transactionState.isSubmitting}
            className={transactionState.isSubmitting ? 'opacity-50' : ''}
          >
            Create Transaction
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(CreateTransactionForm);
