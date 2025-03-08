import api from "@/utils/axiosInstance";
import { CreateWalletData } from "@/types/wallet/createWallet";

/**
 * 
 * @param {CreateWalletData} data 
 * @returns 
 * @throws {Error}
 */
export const createWallet = async (data: CreateWalletData) => {
    try {
        return await api.post("v1/wallet/create", data, { withCredentials: true });
    } catch (error: unknown) {
        console.error(`Fatal Error: ${error}`);
        throw error;
    }
};