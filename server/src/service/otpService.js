import { toZonedTime } from 'date-fns-tz';

import User from './../model/user.js';
import { emailTransportProvider } from '../config/nodemailer.js';
import { EUROPE_ZONE, HTTP_RESPONSE_STATUS, OTP_PUSH_TYPE } from '../defines.js';
import { createEmailTemplate } from '../utils/emailTemplateLoader.js';
import { TEMPLATE_TYPES } from '../templates/defines.js';
import { CORP_EMAIL_ADDRESS } from '../config/env.js';
import UserRepository from '../repositories/UserRepository.js';

const {OK, CREATED, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, NOT_ACCEPTABLE, INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

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
        (statusCode === BAD_REQUEST ||
        statusCode === UNAUTHORIZED)
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
                statusCode: OK, 
                message: "Email sent! Use the OTP provided in the email to verify your account."
            };
        }

        return { 
            status: false, 
            statusCode: NOT_ACCEPTABLE, 
            message: "Failed to send email message."
        };
    } catch (error) {
        console.error(`Fatal Error: ${error}`);
    
        return { 
            status: false, 
            statusCode: INTERNAL_SERVER_ERROR, 
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
                statusCode: NOT_FOUND, 
                message: "User not Found" 
            };
        }
        
        const timestamp = Date.now();

        // Validate otpExpiration
        if (!(user.otpExpiration instanceof Date)) {
            return {
                status: false,
                statusCode: INTERNAL_SERVER_ERROR,
                message: "OTP Expirated. Please contact support.",
            };
        }
        
        const otpExpiration = user.otpExpiration.getTime();
        
        if (user.otpCode === otpCode && otpExpiration > timestamp) {
            user.verified = true;
            user.otpCode = null;
            user.otpExpiration = null;
            
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
                    statusCode: OK,
                    otpMethod: OTP_PUSH_TYPE,
                    message: "User verified successfully"
                };
            }

            return { 
                status: false, 
                statusCode: NOT_ACCEPTABLE, 
                message: "Failed to send email message."
            };
        } else if (otpExpiration <= timestamp) {
            // TODO: Add Logs to track the expiration
            return {
                status: false,
                statusCode: BAD_REQUEST,
                message: "Otp code has expired. Please request a new one.",
            }
        } else {
            return { 
                status: false, 
                statusCode: BAD_REQUEST, 
                message: "Invalid or expirated code"
            };
        }
    } catch (error) {
        console.error(`Unexpected error: ${error}`);

        return { 
            status: false, 
            statusCode: INTERNAL_SERVER_ERROR, 
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
            statusCode: UNAUTHORIZED, 
            message: "Internal Server Error" 
        };
    }

    try {
        const emailConfirmationTemplate = await createEmailTemplate(
            TEMPLATE_TYPES.EMAIL_CONFIRMATION,
            "myFinance / Forgotten Password",
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
                statusCode: CREATED, 
                message: "Email sent! Verify your account.",
                showRequestedModal: true,
            };
        }

        return { 
            status: false, 
            statusCode: NOT_ACCEPTABLE, 
            message: "Failed to send email message."
        };
    } catch (error) {
        console.error(`Fatal Error: ${error}`);
    
        return { 
            status: false, 
            statusCode: INTERNAL_SERVER_ERROR, 
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
        const findUser = await UserRepository.findByEmail(email);

        if (!findUser) {
            return {
                status: false,
                statusCode: NOT_FOUND,
                message: "User not Found",
            };
        }

        const date = Date.now();

        if (!(findUser.otpExpiration instanceof Date)) {
            return {
                status: false,
                statusCode: INTERNAL_SERVER_ERROR,
                message: "OTP Expirated. Please contact support.",
            };
        }

        const otpExpiration = findUser.otpExpiration.getTime();

        if (findUser.otpCode === otpCode && otpExpiration > date) {
            await UserRepository.update(findUser._id, {
                verified: true,
                otpCode: null,
                otpExpiration: null,
            });

            return {
                status: true,
                statusCode: OK,
                message: "Email and OTP successfully confirmed.",
            };
        } else if (otpExpiration <= date) {
            return {
                status: false,
                statusCode: BAD_REQUEST,
                message: "Otp code has expired. Please request a new one.",
            }
        } else {
            return { 
                status: false, 
                statusCode: BAD_REQUEST, 
                message: "Invalid or expirated code"
            };
        }

    } catch (error) {
        console.error(`Fatal Error: ${error}`);
    
        return { 
            status: false, 
            statusCode: INTERNAL_SERVER_ERROR, 
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
    const validationMinutes = Math.min(minutes, 10);
    const expirationUtc = new Date(currentDate.getTime() + validationMinutes * 60 * 1000);

    return toZonedTime(expirationUtc, timezone);
}