import bcryptjs from 'bcryptjs';
import User from './../model/user.js';
import { emailVerification } from "./otpService.js";
import { generateOtp } from '../utils/otpGenerator.js';

/**
 * Create a new User instance, in which the User
 * receives an OTP Code via their email address
 * 
 * @param {Object} userRegistrationData 
 * @returns {Object}
 */
export async function registerUserService(userRegistrationData) {
    try {
        const { name, email } = userRegistrationData;

        const checkUserExistence = await findExistingUser(email, name);

        if (!checkUserExistence.status) {
            return { status: false, statusCode: checkUserExistence.statusCode, message: checkUserExistence.message };
        }

        // Prepare User Data
        const parameters = await prepareUserRegistration(userRegistrationData);

        // Send OTP Verification email
        const emailResponse = await emailVerification(parameters.email, parameters.otpCode);

        if (emailResponse.status && emailResponse.statusCode === 200) {
            try {
                // Persist New User to DB
                await parameters.save();

                return { status: true, statusCode: 201, message: emailResponse.message, showOtpModal: true };
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

/**
 * prepare data before creating User instance
 * 
 * @param {Object} parameters 
 */
async function prepareUserRegistration(parameters) {
    const hashPassword = await bcryptjs.hash(parameters.password, 12);
        
    const otpCode = generateOtp(6);
    const otpExpiration = Date.now() + 5 * 60 * 100; // 5min

    // otpExpiration should be via the Europe/Sofia Timezone...

    return new User({
        name: parameters.name,
        email: parameters.email,
        password: hashPassword,
        terms: parameters.terms,
        otpCode, // provide the OTP pass to the User email
        otpExpiration,
        device: parameters.fingerPrint
    });
};

/**
 * Query the User Table for an existing user instance
 * 
 * @param {string} email 
 * @param {string} name 
 * @returns {Object}
 */
async function findExistingUser(email, name) {
    try {
        const user = await User.findOne({
            $or: [
                { email },
                { name }
            ]
        });

        if (user !== null) {
            const errorField = user.email === email ? "email" : "name";

            return { success: false, statusCode: 403, message: `Error: Invalid ${errorField}` };
        } else {
            return { status: true, statusCode: 200, message: "Proceed User Flow" };
        }
    } catch (error) {
        console.error(`Error found existing User: ${error}`);

        return { success: false, statusCode: 500, message: "Internal Server Error" };
    }
};