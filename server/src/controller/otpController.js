import { verifyEmailOtpCode } from "../service/otpService.js";
import { HTTP_RESPONSE_STATUS } from "../defines.js";

/**
 * Verify User's OTP password Code
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Object} - Response Object with status and message
 */
export async function verifyEmail(req, res) {
    try {
        const { email, otpCode } = req.body;
        
        const result = await verifyEmailOtpCode(email, otpCode);

        if (result) {   
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
        }
    } catch (error) {
        console.error(`Unexpected Error: ${error}`);

        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, 
            message: "Unexpected Error",
        };
    }
}