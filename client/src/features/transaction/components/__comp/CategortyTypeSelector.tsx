import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Label } from '@/components/ui/label.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { AccountTypeOptions } from '@/features/wallet/config';
import type { CreateTransaction } from '@/features/transaction/types.ts';

type CategortyTypeSelectorProps = {
  handleFormChange: <K extends keyof CreateTransaction>(
    key: K,
    value: CreateTransaction[K]
  ) => void;
};

const CategortyTypeSelector: FC<CategortyTypeSelectorProps> = ({
  handleFormChange,
}) => {
  return (
    <div>
      <Label>Category</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(AccountTypeOptions).map((type) => {
            return (
              <SelectItem
                key={type}
                value={type}
                onClick={() => handleFormChange('category', type)}
              >
                {type}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(CategortyTypeSelector);
