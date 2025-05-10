import { HTTP_RESPONSE_STATUS } from "../defines.js";
import UserRepository from "../repositories/UserRepository.js";
import WalletRepository from "../repositories/WalletRepository.js";
import { createAccount } from "./accountService.js";
import { createDepositTransaction } from "./transactionService.js";

const {OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR, BAD_REQUEST, NO_CONTENT, NOT_FOUND, NOT_ACCEPTABLE} = HTTP_RESPONSE_STATUS;

/**
 *
 * @param userId
 * @returns {Promise<{any}>}
 */
export async function getUserWallets(userId) {
    const user = await UserRepository.findById(userId, '_id');

    if (!user) {
        return {
            status: false,
            statusCode: UNAUTHORIZED,
            message: "Unauthorized",
        }
    }

    const wallets = await WalletRepository.findAllByUserId(user._id);

    if (wallets === null || wallets.length === 0) {
        return {
            status: false,
            statusCode: NO_CONTENT,
            message: "No wallets found",
        };
    }
    return {
        status: true,
        statusCode: OK,
        details: wallets,
    };
}

/**
 * Make validation and then create new Wallet Instance
 * 
 * @param {string} userId - The id of the user (token-based)
 * @param {string} walletName - The name of the walled
 * @param {Object | null} parameters - Additional Account parameters (currency, icon, type etc...)
 * @returns {Promise<Object>} - status, statusCode and message
 */
export async function createUserWallet(userId, walletName, parameters = null) {
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

        const wallet = await WalletRepository.create({ userId: userId, name: walletName });

        if (!wallet) {
            return {
                status: false,
                statusCode: BAD_REQUEST,
                message: "Unable to create new wallet, please contact our support team!",
            }; 
        }

        const account = await createAccount(wallet.id, parameters);
        const { status, statusCode, message, dataId } = account;

        const initialDeposit = Number(parameters?.initialDeposit) || 0;

        if (initialDeposit > 0) {
            const depositTransaction = await createDepositTransaction(dataId, initialDeposit);            
            const {status, statusCode, message} = depositTransaction;

            return {status, statusCode, message};
        }
        
        return { status, statusCode, message }; // Default Return if there's no transaction
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
export async function deleteUserWallet(userId, walletId) {
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