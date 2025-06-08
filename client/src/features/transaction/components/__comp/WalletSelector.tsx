import { FC } from 'react';
import { Label } from '@/components/ui/label.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import type { Wallet } from '@/types/user';
import { observer } from 'mobx-react-lite';

type WalletSelectorProps = {
  wallets: Wallet[];
};

// eslint-disable-next-line react-refresh/only-export-components
const WalletSelector: FC<WalletSelectorProps> = ({ wallets }) => {
  return (
    <div>
      <Label>Wallet</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Wallet" />
        </SelectTrigger>
        <SelectContent>
          {wallets.length > 0 &&
            wallets.map((wallet) => {
              return (
                <SelectItem key={wallet._id} value={wallet._id}>
                  {wallet.name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(WalletSelector);
