import { HTTP_RESPONSE_STATUS } from "../defines.js";
import { createUserWallet } from "../service/walletService.js";

const {INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

/**
 * Create a new Wallet to the User
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export async function addWallet(req, res, next) {
    const { name } = req.body;
    const { id } = req.user;

    try {
        const response = await createUserWallet(id, name);

        const {status, statusCode, message} = response;

        if (response) {
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
};
