import api from '@/utils/axios';
import type { CreateWalletData } from '@/types/features/wallet';
import { formatAxiosError } from '@/utils/axiosErrorHandler.ts';

export const getWallets = async () => {
  try {
    return await api.post('/v1/wallet/list', { withCredentials: true });
  } catch (error: unknown) {
    console.log(`Fatal Error: ${error}`);
    throw formatAxiosError(error);
  }
};

/**
 *
 * @param {CreateWalletData} data
 * @returns
 * @throws {Error}
 */
export const createWallet = async (data: CreateWalletData) => {
  try {
    return await api.post('v1/wallet/create', data, { withCredentials: true });
  } catch (error: unknown) {
    console.error(`Fatal Error: ${error}`);
    throw error;
  }
};
