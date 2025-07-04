import { HTTP_RESPONSE_STATUS } from "../defines.js";
import { getUserDetails } from "../service/userService.js";
import { logMessage } from "../utils/helpers.js";

const {INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

// TODO: add Service from userService.js

/**
 * Get User Details
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {Function} next - Next Middleware
 *
 * @returns {Object} - contains status, statusCode and User data
 */
export async function userDetails(req, res, next) {
    const { email } = req.body;
    
    try {
        const response = await getUserDetails(email);
        const {status, statusCode, data} = response;

        return res.status(statusCode).json({ status, data});
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when getting User details');

        next();
        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}