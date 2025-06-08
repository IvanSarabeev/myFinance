import { FC, useEffect } from 'react';
import type { CreateTransactionProps } from '@/types/modal.ts';
import useStore from '@/hooks/useStore.ts';
import TransactionForm from '@/features/transaction/components/forms/TransactionForm.tsx';
import SideDrawer from '@/components/SideDrawer.tsx';
import InfinitySpinLoader from '@/components/icons/InfinitySpinLoader.tsx';
import { observer } from 'mobx-react-lite';

/**
 * @component
 * @access Private
 * CreateTransactionModal is a functional React component.
 */
// eslint-disable-next-line react-refresh/only-export-components
const CreateTransactionModal: FC<CreateTransactionProps> = ({ onClose }) => {
  const { walletStore } = useStore();
  const { wallets, hasLoadedWallets, fetchWallets } = walletStore;

  useEffect(() => {
    if (wallets.length === 0) {
      fetchWallets().catch((error) => {
        console.log('Catch Error', error);
      });
    }
  }, [fetchWallets, wallets.length]);

  return (
    <SideDrawer isOpen onClose={onClose} className={''}>
      {hasLoadedWallets ? (
        <TransactionForm wallets={wallets} />
      ) : (
        <InfinitySpinLoader customColor="black" />
      )}
    </SideDrawer>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(CreateTransactionModal);
