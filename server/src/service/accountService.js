import { HTTP_RESPONSE_STATUS } from "../defines.js";
import AccountRepository from "../repositories/AccountRepository.js";

const {CREATED, INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

/**
 * Create default Account
 * 
 * @param {string} walletId - User's Wallet ID
 * @returns {Promise<Account>} return {status, statusCode and message}
 */
export async function createAccount(walletId) {
    const payload = {
        wallet: walletId,
        balance: 0,
    };
    
    try {    
        const account = await AccountRepository.create(payload);

        if (!account) {
            return {
                status: false,
                statusCode: INTERNAL_SERVER_ERROR,
                message: "Unable to create account",
            }
        }
        
        return {
            status: true,
            statusCode: CREATED,
            message: "Congratulations, you created a new wallet with a default account."
        };
    } catch (error) {
        console.error(`Error creating account ${walletId}: ${error.message}`)

        return {
            status: false,
            statusCode: INTERNAL_SERVER_ERROR,
            message: error.message ?? "Internal Server Error",
        };
    }
}