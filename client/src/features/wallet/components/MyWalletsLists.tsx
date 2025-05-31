import { FC, useEffect } from 'react';
import useStore from '@/hooks/useStore.ts';
import RowLoader from '@/features/wallet/components/loaders/RowLoader.tsx';
import WalletCard from '@/features/wallet/components/WalletCard.tsx';
import { observer } from 'mobx-react-lite';
import EmptyWallet from '@/features/wallet/components/EmptyWallet.tsx';
import { toJS } from 'mobx';

// eslint-disable-next-line react-refresh/only-export-components
const MyWalletsLists: FC = () => {
  const { walletStore } = useStore();
  const { wallets, hasLoadedWallets, fetchWallets } = walletStore;

  useEffect(() => {
    fetchWallets();
  }, []);

  const hasWallets: boolean = Array.isArray(wallets) && wallets.length > 0;

  const renderWallet = () => {
    if (!hasLoadedWallets) return <RowLoader rowNumber={3} />;

    return hasWallets ? (
      wallets
        .slice(0, 3)
        .map((wallet) => <WalletCard key={wallet._id} data={toJS(wallet)} />)
    ) : (
      <EmptyWallet />
    );
  };

  return (
    <div className="w-full max-h-[383px] sm:max-w-sm rounded-2xl px-4 py-2 lg:p-4 border-solid border-primary border-white-primary shadow-sm shadow-[#171a1f1F] bg-white-primary">
      <h4 className="regular-bold-18 sm:regular-18 lg:bold-22 font-bold text-secondary-black mb-4">
        My Wallets
      </h4>
      {renderWallet()}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(MyWalletsLists);
