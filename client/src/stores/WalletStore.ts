import { action, makeObservable, observable, runInAction } from 'mobx';
import type { Wallet } from '@/types/user';
import { getWallets } from '@/app/api/wallet.ts';

/**
 * The WalletStore class is responsible for managing wallet data within an observable MobX store.
 * It provides methods to fetch, update, and interact with wallet information.
 */
class WalletStore {
  wallets: Wallet[] = [];
  hasLoadedWallets: boolean = false;
  error: null | Error | string = null;

  constructor() {
    makeObservable(this, {
      wallets: observable,
      hasLoadedWallets: observable,
      error: observable,
      fetchWallets: action,
      updateWallet: action,
    });
  }

  /**
   * Retrieves wallets by making an asynchronous request and processes the response.
   * Logs the response and updates the wallet data if the request is successful.
   *
   * @return {Promise<void>} A promise that resolves when the wallet data has been updated successfully.
   */
  fetchWallets = async (): Promise<void> => {
    try {
      runInAction(() => {
        this.hasLoadedWallets = false;
        this.error = null;
      });

      const response = await getWallets();

      if (!response.status) {
        throw new Error('Failed to fetch wallets');
      }

      runInAction(() => {
        this.wallets = response.data.accounts || [];
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : 'Unknown error occurred';
      });
    } finally {
      runInAction(() => {
        this.hasLoadedWallets = true;
      });
    }
  };

  /**
   * Updates the wallet state with a new value for the specified key.
   *
   * @param {string} walletId - The unique identifier for the wallet to update.
   * @param {Wallet} value - The new value to set for the specified key in the wallet object.
   *
   * @return {void} Does not return a value.
   */
  updateWallet(walletId: string, value: Partial<Wallet>): void {
    runInAction(() => {
      this.wallets = this.wallets.map((wallet) =>
        wallet._id === walletId ? { ...wallet, ...value } : wallet
      );
    });
  }
}

const walletStore = new WalletStore();

export default walletStore;
