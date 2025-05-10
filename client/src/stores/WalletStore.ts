import { makeObservable, observable } from 'mobx';
import type { Wallet } from '@/types/user';
import { getWallets } from '@/app/api/wallet.ts';

class WalletStore {
  wallet: Wallet | null = null;

  constructor() {
    makeObservable(this, {
      wallet: observable,
    });
  }

  async getWallets() {
    return await getWallets().then((response) => {
      console.log('Response: ', response);
    });
  }
}

const walletStore = new WalletStore();

export default walletStore;
