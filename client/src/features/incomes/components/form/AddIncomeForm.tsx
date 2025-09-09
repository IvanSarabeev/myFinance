/* eslint-disable react-refresh/only-export-components */
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Income } from '@/types/features/income/api';
import { Label } from '@/components/ui/label';
import EmojiPickerPopup from '@/components/EmojiPickerPopup';

type AddIncomeFormProps = {
  incomeForm: Partial<Income>;
  setFormField: <K extends keyof Income>(field: K, value: Income[K]) => void;
  handleAddIncome: () => void;
};

const AddIncomeForm: FC<AddIncomeFormProps> = ({
  incomeForm,
  setFormField,
  handleAddIncome,
}) => {
  return (
    <div className="flex flex-col items-start my-4">
      <EmojiPickerPopup
        icon={incomeForm.icon}
        onSelect={(selectedIcon) => setFormField('icon', selectedIcon)}
      />

      <Label>Income Source</Label>
      <Input
        value={incomeForm.source}
        onChange={({ target }) =>
          setFormField(
            'source',
            target.value?.trim().toUpperCase() as Income['source']
          )
        }
        placeholder="Freelance, Salary, etc"
        aria-label="Income Source"
        type="text"
      />

      <Label>Amount</Label>
      <Input
        value={incomeForm.amount}
        onChange={({ target }) => setFormField('amount', Number(target.value))}
        placeholder=""
        aria-label="Amount"
        type="number"
      />

      <Label>Date</Label>
      <Input
        value={String(incomeForm.date)}
        onChange={({ target }) => setFormField('date', new Date(target.value))}
        placeholder="dd/mm/yyyy"
        aria-label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <Button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleAddIncome}
        >
          Add Income
        </Button>
      </div>
    </div>
  );
};

export default observer(AddIncomeForm);
