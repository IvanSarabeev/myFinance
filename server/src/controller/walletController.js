import { HTTP_RESPONSE_STATUS } from "../defines.js";
import {createUserWallet, deleteUserWallet, getUserWallets} from "../service/walletService.js";

const {INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

export async function getWallets(req, res) {
    const { id } = req.user;

    try {
        const response = await getUserWallets(id);

        const {status, statusCode, details} = response;

        return res.status(statusCode).json({ status, details });
    } catch (error) {
        console.error(`Fatal error: ${error.message ?? "Unable to create Wallet"}`);

        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: `${error.message ?? "Internal Server Error"}`,
        });
    }
}

/**
 * Create a new Wallet to the User
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export async function addWallet(req, res, next) {
    const { name, customEnabled, currency, initialDeposit, accountName, type } = req.body;
    const { id } = req.user;

    try {
        const response = await createUserWallet(id, name, { customEnabled, currency, initialDeposit, accountName, type });

        const {status, statusCode, message} = response;
                
        return res.status(statusCode).json({ status, message });        
    } catch (error) {
        console.error(`Fatal error: ${error.message ?? "Unable to create Wallet"}`);
        
        next();
        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: `${error.message ?? "Internal Server Error"}`,
        });
    }
};

/**
 * Delte an User's Wallet
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
*/
export async function deleteWallet(req, res, next) {
    const { walletId } = req.body;
    const { id } = req.user;
    
    try {    
        const response = await deleteUserWallet(id, walletId);
        
        console.log("Response: ", response);
        
        const {status, statusCode, message} = response;
        
        if (status) {
            return res.status(statusCode).json({ status, message });
        }

        return res.status(statusCode).json({ status, message });
    } catch (error) {
        console.error(`Fatal error: ${error.message ?? "Unable to create Wallet"}`);

        next();
        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: `${error.message ?? "Internal Server Error"}`,
        });
    }
}
