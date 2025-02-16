import { verifiyEmailConfirmation, verifyEmailOtpCode } from "../service/otpService.js";
import { HTTP_RESPONSE_STATUS } from "../defines.js";

/**
 * Verify User's OTP password Code
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Object} - Response Object with status and message
 */
export async function verifyEmail(req, res, next) {
    try {
        const { email, otpCode } = req.body;
        
        const result = await verifyEmailOtpCode(email, otpCode);

        const { status, statusCode, otpMethod, message } = result;
        
        if (status && statusCode === HTTP_RESPONSE_STATUS.OK) {
            return res.status(statusCode).json({ 
                status: true,
                statusCode: statusCode,
                otpMethod: otpMethod, 
                message: message
            });
        } else {   
            return res.status(statusCode).json({ 
                status: false, 
                message: message
            });
        }
    } catch (error) {
        console.error(`Unexpected Error: ${error}`);

        next();
        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, 
            message: "Unexpected Error",
        };
    }
}

/**
 * Confirm User's email and submitted OTP Code
 * 
 * @param {Request} req 
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Object} - Response Object with status, statusCode and message
 */
export async function emailConfirmation(req, res, next) {
    try {
        const { email, otpCode } = req.body;

        const response = await verifiyEmailConfirmation(email, otpCode);

        const { status, statusCode, message } = response;

        if (status && statusCode === HTTP_RESPONSE_STATUS.OK) {
            return res.status(statusCode).json({
                status,
                statusCode,
                message,
            });
        } else {
            return res.status(statusCode).json({
                status,
                statusCode,
                message,
            });
        }
    } catch (error) {
        console.error(`Unexpected Error: ${error}`);

        next();
        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, 
            message: "Unexpected Error",
        };
    }
}