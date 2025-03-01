import { HTTP_RESPONSE_STATUS } from "../defines.js";
import UserRepository from "../repositories/UserRepository.js";
import WalletRepository from "../repositories/WalletRepository.js";

const {UNAUTHORIZED, INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST} = HTTP_RESPONSE_STATUS;

/**
 * Make validation's and then create new Wallet Instance
 * 
 * @param {string} userId - The Id of the user (token based)
 * @param {string} walletName - The name of the walled
 * @returns {Promise<any>} - status, statusCode and message
 */
export async function createUserWallet(userId, walletName) {
    if (userId.length <= 0 || walletName.length <= 0) throw new Error("Provided empty fields");

    try {    
        const user = await UserRepository.findById(userId);
        
        if (!user) {
            return {
                status: false,
                statusCode: UNAUTHORIZED,
                message: "Unauthorized",
            };
        }
        
        if (user.id !== userId) throw new Error("User ID does not match");

        const wallet = await WalletRepository.create({ userId: userId, name: walletName });

        if (wallet) {
            return {
                status: true,
                statusCode: CREATED,
                message: "Congratulations, you created new Wallet."
            };
        }

        return {
            status: false,
            statusCode: BAD_REQUEST,
            message: "Unable to create new wallet, please contact our support team!",
        }; 
    } catch (error) {
        console.error(`Error creating wallet for user ${userId}: ${error.message}`)

        return {
            status: false,
            statusCode: INTERNAL_SERVER_ERROR,
            message: error.message ?? "Internal Server Error",
        };
    }
}