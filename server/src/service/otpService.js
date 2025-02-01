import dotenv from 'dotenv';
import User from './../model/user.js';
import { emailTransportProvider } from '../utils/mailProvider.js';
import { HTTP_RESPONSE_STATUS, OTP_PUSH_TYPE } from '../defines.js';
import { generateOtp } from '../utils/otpGenerator.js';
import { NUMERIC_CHARACTER, SPECIAL_CHARACTER, UPPER_CASE_CHARACTER } from '../utils/regex.js';

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
export async function requiredEmailVerification(email, otpCode) {
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
            return { 
                status: true, 
                statusCode: HTTP_RESPONSE_STATUS.OK, 
                message: "Email sent! Use the OTP provided in the email to verify your account."
            };
        }

        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.NOT_ACCEPTABLE, 
            message: "Failed to send email message."
        };
    } catch (error) {
        console.error(`Fatal Error: ${error}`);
    
        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, 
            message:"Internal Server Error"
        };
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
        const user = await User.findOne({ email: email });

        if (!user) {
            return { 
                status: false,
                statusCode: HTTP_RESPONSE_STATUS.NOT_FOUND, 
                message: "User not Found" 
            };
        }
        
        const timestamp = Date.now();

        // Validate otpExpiration
        if (!(user.otpExpiration instanceof Date)) {
            console.error("Invalid otpExpiration:", user.otpExpiration);
            return {
                status: false,
                statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
                message: "OTP Expirated. Please contact support.",
            };
        }
        
        const otpExpiration = user.otpExpiration.getTime();
        
        if (user.otpCode === otpCode && otpExpiration > timestamp) {
            user.verified = true;
            user.otpCode = undefined;
            user.otpExpiration = undefined;
            
            await user.save();
            
            return { 
                status: true,
                statusCode: HTTP_RESPONSE_STATUS.OK,
                otpMethod: OTP_PUSH_TYPE,
                message: "User verified successfully"
            };
        } else if (otpExpiration <= timestamp) {
            // Add Logs to track the expiration
            return {
                status: false,
                statusCode: HTTP_RESPONSE_STATUS.BAD_REQUEST,
                message: "Otp code has expired. Please request a new one.",
            }
        } else {
            return { 
                status: false, 
                statusCode: HTTP_RESPONSE_STATUS.BAD_REQUEST, 
                message: "Invalid or expirated code"
            };
        }
    } catch (error) {
        console.error(`Unexpected error: ${error}`);

        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, 
            message: "Internal Server Error"
        };
    }
}

/**
 * Send new password to the provided email address
 * 
 * @param {String} email
 * @returns {Object} - Returns status, statusCode, token and message 
 */
export async function sendEmailVerification(email) {
    const corpEmailAddress = process.env.CORP_EMAIL_ADDRESS;
    
    if (!corpEmailAddress) {
        console.error("Missing Corp. Email Address");
        
        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.UNAUTHORIZED, 
            message: "Internal Server Error" 
        };
    }

    try {
        const otpCode = generateOtp(6);

        const emailOtpVerificationTemplate = {
            from: `"myFinance EOOD" ${corpEmailAddress}`,
            to: email,
            subject: "Email confirmation",
            text: `Your OTP Verification Code: <strong>${otpCode}</strong>`,
        };

        const transportProvider = await emailTransportProvider.sendMail(emailOtpVerificationTemplate);

        if (
            transportProvider.accepted.length > 0 &&
            transportProvider.rejected.length === 0 &&
            transportProvider.response.startsWith("250")
        ) {
            return { 
                status: true, 
                statusCode: HTTP_RESPONSE_STATUS.CREATED, 
                message: "Email sent! Verify your account.",
                showRequestedModal: true,
            };
        }

        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.NOT_ACCEPTABLE, 
            message: "Failed to send email message."
        };
    } catch (error) {
        console.error(`Fatal Error: ${error}`);
    
        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, 
            message:"Internal Server Error"
        };
    }
};