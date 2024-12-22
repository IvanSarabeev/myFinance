import { verifyEmailOtpCode } from "../service/otpService.js";
import { OTP_PUSH_TYPE } from "../defines.js";

/**
 * Verify User's OTP password Code
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Object}
 */
export async function verifyEmail(req, res) {
    try {
        const { email, otpCode } = req.body;
        
        const result = await verifyEmailOtpCode(email, otpCode);

        console.log("OTP Response", result);

        if (result.status && result.statusCode === 200) {
            return res.status(200).json({ status: true, otpMethod: OTP_PUSH_TYPE, message: result.message });
        } else {   
            return res.status(result.statusCode).json({ status: false, message: result.message });
        }
    } catch (error) {
        console.error(`Unexpected Error: ${error}`);

        return { status: false, statusCode: 500, message: "Unexpected Error" };
    }
}