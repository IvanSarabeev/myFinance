import {HTTP_RESPONSE_STATUS} from "../defines.js";
import UserRepository from "../repositories/UserRepository.js";
import WalletRepository from "../repositories/WalletRepository.js";
import {createAccount} from "./accountService.js";
import {createDepositTransaction} from "./transactionService.js";
import AbstractController from "../controller/AbstractController.js";
import {getCache} from "./Cache.js";
import Encryption from "./Encryption.js";
import AccountRepository from "../repositories/AccountRepository.js";
import Wallet from "../model/wallet.js";
import {logMessage} from "../utils/helpers.js";

const {
    OK,
    UNAUTHORIZED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    NO_CONTENT,
    NOT_FOUND,
    NOT_ACCEPTABLE
} = HTTP_RESPONSE_STATUS;

class WalletService extends AbstractController {
    /**
     * Retrieves the wallets associated with a specific user.
     *
     * @param {string} userId - The unique identifier of the user whose wallets need to be fetched.
     * @param {number} page - The page number for pagination.
     * @param {number} limit - The maximum number of wallets to retrieve per page.
     * @return {Promise<{status: boolean, statusCode: number, message?: string, data?: Array}>} An object representing the status of the operation, including status code, message, and the list of wallets if successfully retrieved.
     */
    async getUserWallets(userId, page, limit) {
        const filters = { userId };
        const { limitIndex, offset } = this.createPaginationFromRequest(page, limit);

        const querySignature = JSON.stringify({ filters, limitIndex, offset });
        const cacheKey = `wallets_${Encryption.hashValue(querySignature)}`;

        const wallet = await Wallet.find({ userId }).select('_id');

        if (!wallet) return { status: false, statusCode: NOT_FOUND, message: "Wallet not found" };

        try {
            const result = await getCache(cacheKey, async () => {
                const walletIds = wallet.map((item) => item._id);
                const filter = { wallet: { $in: walletIds } };

                return await AccountRepository.findWithPagination(filter, offset, limitIndex);
            });

            if (!result) {
                return { status: false, statusCode: NO_CONTENT, accounts: [] };
            }

            return { status: true, statusCode: OK, ...result };
        } catch (error) {
            logMessage(error, "Error retrieving wallets");

            throw new Error(`Failed to find wallets: ${error.message || error}`);
        }
    }

    /**
     * Make validation and then create new Wallet Instance
     *
     * @param {string} userId - The id of the user (token-based)
     * @param {string} walletName - The name of the walled
     * @param {Object | null} parameters - Additional Account parameters (currency, icon, type, etc...)
     * @returns {Promise<Object>} - status, statusCode, and message
     */
    async createUserWallet(userId, walletName, parameters = null) {
        if (!userId || !walletName) {
            throw new Error("Provided empty fields");
        }

        try {
            const user = await UserRepository.findById(userId);

            if (!user) {
                return {
                    status: false,
                    statusCode: UNAUTHORIZED,
                    message: "Unauthorized",
                };
            }

            if (user.id !== userId) {
                return {
                    status: false,
                    statusCode: NOT_ACCEPTABLE,
                    message: "User ID does not match"
                }
            }

            const wallet = await WalletRepository.create({userId: userId, name: walletName});

            if (!wallet) {
                return {
                    status: false,
                    statusCode: BAD_REQUEST,
                    message: "Unable to create new wallet, please contact our support team!",
                };
            }

            const account = await createAccount(wallet.id, parameters);
            const {status, statusCode, message, dataId} = account;

            const initialDeposit = Number(parameters?.initialDeposit) || 0;

            if (initialDeposit > 0) {
                const depositTransaction = await createDepositTransaction(dataId, initialDeposit);
                const {status, statusCode, message} = depositTransaction;

                return {status, statusCode, message};
            }

            return {status, statusCode, message}; // Default Return if there's no transaction
        } catch (error) {
            console.error(`Error creating wallet for user ${userId}: ${error.message}`)

            return {
                status: false,
                statusCode: INTERNAL_SERVER_ERROR,
                message: error.message ?? "Internal Server Error",
            };
        }
    }

    /**
     * Delete content from the DB
     *
     * @param {string} userId - User ID (token)
     * @param {string} walletId - User Wallet ID
     * @returns
     */
    async deleteUserWallet(userId, walletId) {
        try {
            const user = await UserRepository.findById(userId);

            if (!user) {
                return {
                    status: false,
                    statusCode: UNAUTHORIZED,
                    message: "Unauthorized",
                };
            }

            const wallet = await WalletRepository.delete(userId);

            if (!wallet) {
                return {
                    status: false,
                    statusCode: NOT_FOUND,
                    message: "Unable to delete wallet, please contact our support team!",
                };
            }

            return {
                status: true,
                statusCode: NO_CONTENT,
                message: "Wallet deleted successfully.",
            };
        } catch (error) {
            console.error(`Error deleting wallet for userId/${userId}: with walletId/${walletId} - ${error.message}`)

            return {
                status: false,
                statusCode: INTERNAL_SERVER_ERROR,
                message: error.message ?? "Internal Server Error",
            };
        }
    }
}

export default new WalletService;