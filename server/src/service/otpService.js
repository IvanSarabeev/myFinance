import dotenv from 'dotenv';
import { emailTransportProvider } from '../utils/mailProvider.js';
import User from './../model/user.js';
import { HTTP_RESPONSE_STATUS } from '../defines.js';

dotenv.config();

/**
 * Create/Send email OTP Code after an
 * User Registration workflow with an Email Template
 * 
 * @param {String} email - Client email address 
 * @param {Number} otpCode - Client generated OTP code
 * 
 * @returns {Object} - Returns status, statusCode and message
 */
export async function emailVerification(email, otpCode) {
    const corpEmailAddress = process.env.CORP_EMAIL_ADDRESS;

    if (!corpEmailAddress) {
        console.error("Missing Corp. Email Address");
        
        return { status: false, statusCode: HTTP_RESPONSE_STATUS.UNAUTHORIZED, message: "Internal Server Error" };
    }

    // TODO Create a Email Template
    const mailTemplate = {
        from: `"myFinance EOOD" ${corpEmailAddress}`,
        to: email,
        subject: "Account Verification",
        text: `Your OTP Verification Code: ${otpCode}`,
    };

    try {
        const result = await emailTransportProvider.sendMail(mailTemplate);

        if (
            result.accepted.length > 0 &&
            result.rejected.length === 0 &&
            result.response.startsWith("250")
        ) {
            return { status: true, statusCode: HTTP_RESPONSE_STATUS.OK, message: "Email sent! Use the OTP provided in the email to verify your account." };
        }

        return { status: false, statusCode: HTTP_RESPONSE_STATUS.NOT_ACCEPTABLE, message: "Failed to send email message." };
    } catch (error) {
        console.error(`Fatal Error: ${error}`);
    
        return { status: false, statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, message:"Internal Server Error" };
    }
}

/**
 * Verify User's email and compare OTP password
 * Then persist the User Entity
 * 
 * @param {String} email - Client email address
 * @param {Number} otpCode - Client OTP code
 * 
 * @returns {Object} - Returns status, statusCode, otpMethod and message
 */
export async function verifyEmailOtpCode(email, otpCode) {
    try {
        // TODO: Think for a query with Criteria...
        const user = await User.findOne({ email: email });
        
        console.log("User is Found", user);
        if (!user) {
            return { status: false, statusCode: HTTP_RESPONSE_STATUS.NOT_FOUND, message: "User not Found" };
        }
        
        const checkTimezoneTime = Date.now();
        
        console.log(
            otpCode,
            user.otpCode,
            user.otpCode === otpCode,
            user?.otpExpiration,
            user.otpExpiration.getTime(),
            user.otpExpiration.getTime() > checkTimezoneTime
        );
        
        if (
            user.otpCode === otpCode &&
            user?.otpExpiration &&
            user.otpExpiration.getTime() > checkTimezoneTime
        ) {
            user.verified = true;
            user.otpCode = undefined;
            user.otpExpiration = undefined;
            
            await user.save();
            
            return { status: true, statusCode: HTTP_RESPONSE_STATUS.OK, message: "User verified successfully" };
        } else {
            console.log("Unable to Proceed");

            return { status: false, statusCode: HTTP_RESPONSE_STATUS.BAD_REQUEST, message: "Invalid or Expirated OTP" };
        }
    } catch (error) {
        console.error(`Unexpected error: ${error}`);

        return { status: false, statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, message: "Internal Server Error" };
    }
}