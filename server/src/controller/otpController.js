import { verifiyEmailConfirmation, verifyEmailOtpCode } from "../service/otpService.js";
import { HTTP_RESPONSE_STATUS } from "../defines.js";
import { logMessage } from "../utils/helpers.js";

const {OK, INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

/**
 * Verify User's OTP password Code
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {Function} next - Next Middleware
 *
 * @returns {Object} - Response Object with status, statusCode, otpMethod and message
 */
export async function verifyEmail(req, res, next) {
    const { email, otpCode } = req.body;

    try {    
        const result = await verifyEmailOtpCode(email, otpCode);
        const { status, statusCode, otpMethod, message } = result;
        
        if (status && statusCode === OK) {
            return res.status(statusCode).json({ status, statusCode, otpMethod, message });
        } else {   
            return res.status(statusCode).json({ status, message });
        }
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when verifying email');

        next();
        return {
            status: false, 
            statusCode: INTERNAL_SERVER_ERROR, 
            message: "Unexpected Error",
        };
    }
}

/**
 * Confirm User's email and submitted OTP Code
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {Function} next - Next Middleware
 *
 * @returns {Object} - Response Object with status, statusCode and message
 */
export async function emailConfirmation(req, res, next) {
    const { email, otpCode } = req.body;

    try {
        const response = await verifiyEmailConfirmation(email, otpCode);
        const { status, statusCode, message } = response;

        return res.status(statusCode).json({ status, statusCode, message });
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when confirming email');

        next();
        return { 
            status: false, 
            statusCode: INTERNAL_SERVER_ERROR, 
            message: "Unexpected Error",
        };
    }
}