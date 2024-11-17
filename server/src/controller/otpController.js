import { verifyOtpCode } from "../service/otpService.js";

/**
 * Verify User's OTP password Code
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Object}
 */
export async function verifyOtp(req, res) {
    try {
        const { email, otpCode } = req.body;
        
        const result = verifyOtpCode(email, Number(otpCode));

        console.log("OTP Response", result);

        if (result.status && result.statusCode === 200) {
            return res.status(200).json({ status: true, message: result.message });
        } else {   
            return res.status(result.statusCode).json({ status: false, message: result.message });
        }
    } catch (error) {
        console.error(`Unexpected Error: ${error}`);

        return { status: false, statusCode: 500, message: "Unexpected Error" };
    }
}