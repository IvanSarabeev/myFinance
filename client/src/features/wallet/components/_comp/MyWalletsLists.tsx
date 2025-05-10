import { FC } from 'react';
import useStore from '@/hooks/useStore.ts';

const MyWalletsLists: FC = () => {
  const { walletStore } = useStore();

  const { getWallets } = walletStore;

  getWallets().then((response) => {
    console.log(response);
  });

  return <div>My Wallets</div>;
};

export default MyWalletsLists;
