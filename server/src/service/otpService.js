import { toZonedTime } from 'date-fns-tz';

import User from './../model/user.js';
import { emailTransportProvider } from '../utils/emailTransportProvider.js';
import { EUROPE_ZONE, HTTP_RESPONSE_STATUS, OTP_PUSH_TYPE } from '../defines.js';
import { createEmailTemplate } from '../utils/emailTemplateLoader.js';
import { TEMPLATE_TYPES } from '../templates/defines.js';
import { CORP_EMAIL_ADDRESS } from '../config/env.js';

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
    const mailTemplate = await createEmailTemplate(
        TEMPLATE_TYPES.REGISTRATION_OTP,
        'Account Verification',
        {  email: email, otpCode: otpCode}
    );
    const {status, statusCode, message} = mailTemplate;

    if (
        status === false &&
        (statusCode === HTTP_RESPONSE_STATUS.BAD_REQUEST ||
        statusCode === HTTP_RESPONSE_STATUS.UNAUTHORIZED)
    ) {
        return { status, statusCode, message };
    }

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

            const mailTemplate = await createEmailTemplate(
                TEMPLATE_TYPES.REGISTRATION_WELCOME,
                "Congratulations !",
                { userEmail: email, email: email }
            );

            const result = await emailTransportProvider.sendMail(mailTemplate);

            if (
                result.accepted.length > 0 &&
                result.rejected.length === 0 &&
                result.response.startsWith("250")
            ) {
                return { 
                    status: true,
                    statusCode: HTTP_RESPONSE_STATUS.OK,
                    otpMethod: OTP_PUSH_TYPE,
                    message: "User verified successfully"
                };
            }

            return { 
                status: false, 
                statusCode: HTTP_RESPONSE_STATUS.NOT_ACCEPTABLE, 
                message: "Failed to send email message."
            };
        } else if (otpExpiration <= timestamp) {
            // TODO: Add Logs to track the expiration
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
 * @param {String} email - User's request
 * @param {Number} otpCode - User's OOTP
 * @returns {Object} - Returns status, statusCode, token and message 
 */
export async function sendEmailVerification(email, otpCode) {    
    if (!CORP_EMAIL_ADDRESS) {
        console.error("Missing Corp. Email Address");
        
        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.UNAUTHORIZED, 
            message: "Internal Server Error" 
        };
    }

    try {
        const emailConfirmationTemplate = await createEmailTemplate(
            TEMPLATE_TYPES.EMAIL_CONFIRMATION,
            "Forgotten Password Confirmation",
            { email, otpCode }  
        );

        const transportProvider = await emailTransportProvider.sendMail(emailConfirmationTemplate);

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

/**
 * Confirm both criteria and remove User information to prevent reuse.
 * 
 * @param {String} email - provided User Email
 * @param {Number} otpCode - provided OTP 
 * @returns {Object} Return status, statusCode and message
 */
export async function verifiyEmailConfirmation(email, otpCode) {
    try {
        const findUser = await User.findOne({ email: email });

        if (!findUser) {
            return {
                status: false,
                statusCode: HTTP_RESPONSE_STATUS.NOT_FOUND,
                message: "User not Found",
            };
        }

        const date = Date.now();

        if (!(findUser.otpExpiration instanceof Date)) {
            return {
                status: false,
                statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
                message: "OTP Expirated. Please contact support.",
            };
        }

        const otpExpiration = findUser.otpExpiration.getTime();

        if (findUser.otpCode === otpCode && otpExpiration > date) {
            findUser.verified = true;
            findUser.otpCode = undefined;
            findUser.otpExpiration = undefined;

            await findUser.save();

            // Maybe send Email Template
            return {
                status: true,
                statusCode: HTTP_RESPONSE_STATUS.OK,
                message: "Email and OTP successfully confirmed.",
            };
        } else if (otpExpiration <= date) {
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
        console.error(`Fatal Error: ${error}`);
    
        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, 
            message:"Internal Server Error"
        };
    }
};

/**
 * Return a zoned expiration Time
 * 
 * @param {Number} minutes - The number for minutes until otpExpiration. Default is 5
 * @param {String} timezone - User's timezone. Default is Europe/Sofia
 * @param {Date} currentDate - Optional, Default is now.
 * @returns {Date} The expiration time converted to the user's current timezone.
 */
export const setOtpExpirationTime = (
    minutes = 5,
    timezone = EUROPE_ZONE,
    currentDate = new Date(),
) => {
    const expirationUtc = new Date(currentDate.getTime() * minutes * 60 * 1000);

    return toZonedTime(expirationUtc, timezone);
}