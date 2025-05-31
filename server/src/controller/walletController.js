import WalletService from "../service/walletService.js";
import { HTTP_RESPONSE_STATUS } from "../defines.js";

const {INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

/**
 * Retrieves the wallets for the authenticated user.
 *
 * @param {Object} req - The request object containing user and query information.
 * @param {Object} req.user - The user object, including the authenticated user's details.
 * @param {string} req.user.id - The ID of the authenticated user.
 * @param {Object} req.query - The query parameters for pagination.
 * @param {number} [req.query.page] - The page number for paginated results.
 * @param {number} [req.query.limit] - The number of results per page.
 * @param {Object} res - The response object used to return the result or an error.
 * @return {Promise<void>} Resolves with a JSON response containing the wallets and pagination info or an error status.
 */
export async function getWallets(req, res) {
    const { id } = req.user;
    const { page, limit } = req.query;

    try {
        const response = await WalletService.getUserWallets(id, page,  limit);

        const { status, statusCode, accounts,  total } = response;

        return res.status(statusCode).json({ status, accounts,  total });
    } catch (error) {
        console.error(`Fatal error: ${error.message ?? "Unable to create Wallet"}`);

        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: `${error.message ?? "Internal Server Error"}`,
        });
    }
}

/**
 * Creates a new wallet for the authenticated user.
 *
 * @param {Object} req - The request object containing input data.
 * @param {Object} req.body - The body of the request containing wallet details.
 * @param {string} req.body.name - The name of the wallet to be created.
 * @param {boolean} req.body.customEnabled - Indicates if custom features are enabled for the wallet.
 * @param {string} req.body.currency - The currency type for the wallet.
 * @param {number} req.body.initialDeposit - The initial deposit amount for the wallet.
 * @param {string} req.body.accountName - The account name for the wallet.
 * @param {string} req.body.type - The type of the wallet.
 * @param {Object} req.user - The authenticated user making the request.
 * @param {string} req.user.id - The ID of the authenticated user.
 * @param {Object} res - The response object to send results to the client.
 * @param {Function} next - The middleware function for error handling.
 * @return {Promise<Object>} A response object containing the wallet creation status and a message.
 */
export async function addWallet(req, res, next) {
    const { name, customEnabled, currency, initialDeposit, accountName, type } = req.body;
    const { id } = req.user;

    try {
        const response = await WalletService.createUserWallet(id, name, { customEnabled, currency, initialDeposit, accountName, type });

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
}

/**
 * Deletes the wallet associated with the user's account.
 *
 * @param {Object} req - The request object containing the user's information and wallet details.
 * @param {Object} res - The response object used to send the result of the operation.
 * @param {Function} next - The next middleware function in the request-response cycle, used to handle errors if any occur.
 * @return {Promise<void>} Returns a promise that resolves with the response indicating the success or failure of the wallet deletion.
 */
export async function deleteWallet(req, res, next) {
    const { walletId } = req.body;
    const { id } = req.user;
    
    try {    
        const response = await WalletService.deleteUserWallet(id, walletId);
        
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
}
