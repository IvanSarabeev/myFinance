import bcryptjs from 'bcryptjs';
import User from './../model/user.js';
import { emailVerification } from "./otpService.js";
import { generateOtp } from '../utils/otpGenerator.js';

/**
 * Create a new User instance, in which the User
 * receives an OTP Code via their email address
 * @param {Object} userRegistrationData 
 * @returns {Object}
 */
export async function registerUserService(userRegistrationData) {
    try {
        const { name, email, password, terms, fingerPrint } = userRegistrationData;

        console.log(userRegistrationData);

        const hashPassword = await bcryptjs.hash(password, 12);
        
        const otpCode = generateOtp(6);
        const otpExpiration = Date.now() + 5 * 60 * 100; // 5min

        const existingUser = await User.findOne({
            $or: [
                { email: email },
                { name: name }
            ]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return { success: false, message: "Error: Existing User" };
            }

            if (existingUser.name === name) {
                return { success: false, message: "Error: Existing User" };
            } 
        }

        const userDocument = new User({
            name: name,
            email: email,
            password: hashPassword,
            terms: terms,
            otpCode, // provide the OTP pass to the User email
            otpExpiration,
            device: fingerPrint
        });

        // Send OTP Verification email
        const emailResponse = await emailVerification(email, otpCode);

        if (emailResponse.status && emailResponse.statusCode === 200) {
            try {
                
                await userDocument.save();

                return { status: true, statusCode: 201, message: "Created OTP message" };
            } catch (error) {
                console.error(`Error saving User: ${error}`);

                return { status: false, statusCode: 400, message: "Failed to send verification email" };
            }
        }
    } catch (error) {
        console.error(`Fatal Error: ${error}`);

        return { status: false, statusCode: 500, message: "Invalid Credentials" };
    }
};