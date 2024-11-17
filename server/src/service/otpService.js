import dotenv from 'dotenv';
import { emailTransportProvider } from '../utils/mailProvider.js';
import User from './../model/user.js';

dotenv.config();

/**
 * Create/Send email OTP Code after an
 * User Registration workflow with an Email Template
 * 
 * @param {String} email 
 * @param {Number} otpCode 
 * @returns 
 */
export async function emailVerification(email, otpCode) {
    const corpEmailAddress = process.env.CORP_EMAIL_ADDRESS;

    if (!corpEmailAddress) {
        console.error("Missing Corp. Email Address");
        
        return { status: false, statusCode: 401, message: "Internal Server Error" };
    }

    // TODO Create a Email Template
    const mailTemplate = {
        from: `"myFinance EOOD" ${corpEmailAddress}`,
        to: email,
        subject: "Account Verification",
        text: `Your OTP Verification Code: ${otpCode}`
    };

    try {
        const result = await emailTransportProvider.sendMail(mailTemplate);

        if (result) {
            return { status: true, statusCode: 200, message: "Message delivered." };
        }

        return { status: false, statusCode: 406, message: "Failed to send email message." };
    } catch (error) {
        console.error(`Fatal Error: ${error}`);
    
        return { status: false, statusCode: 500, message:"Internal Server Error" };
    }
}

/**
 * Verify User's email and compare OTP password
 * Then persist the User Entity
 * 
 * @param {String} email 
 * @param {Number} otpCode 
 * @returns {Object}
 */
export async function verifyOtpCode(email, otpCode) {
    try {
        const user = await User.findOne({ email: email });
        
        console.log("User is Found", user);
        if (!user) {
            return { status: false, statusCode: 404, message: "User not Found" };
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
            
            return { status: true, statusCode: 200, message: "User verified successfully" };
        } else {
            console.log("Unable to Proceed");

            return { status: false, statusCode: 400, message: "Invalid or Expirated OTP" };
        }
    } catch (error) {
        console.error(`Unexpected error: ${error}`);

        return { status: false, statusCode: 500, message: "Internal Server Error" };
    }
}