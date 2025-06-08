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

// eslint-disable-next-line react-refresh/only-export-components
const CurrencySelector: FC = () => {
  return (
    <div>
      <Label>Currency</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="usd">USD</SelectItem>
          <SelectItem value="eur">EUR</SelectItem>
          <SelectItem value="gbp">GBP</SelectItem>
          <SelectItem value="jpy">JPY</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(CurrencySelector);
