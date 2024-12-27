import bcryptjs from 'bcryptjs';
import User from './../model/user.js';
import { emailVerification } from "./otpService.js";
import { generateOtp } from '../utils/otpGenerator.js';
import { HTTP_RESPONSE_STATUS } from '../defines.js';

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
            return { 
                status: false,
                statusCode: checkUserExistence.statusCode,
                message: checkUserExistence.message,
                errorFields: checkUserExistence.errorsFields
            };
        }

        // Prepare User Data
        const parameters = await prepareUserRegistration(userRegistrationData);

        // Send OTP Verification email
        const emailResponse = await emailVerification(parameters.email, parameters.otpCode);

        if (emailResponse.status && emailResponse.statusCode === HTTP_RESPONSE_STATUS.OK) {
            try {
                // Persist New User to DB
                await parameters.save();

                return { 
                    status: true, 
                    statusCode: HTTP_RESPONSE_STATUS.CREATED, 
                    message: emailResponse.message, 
                    showOtpModal: true
                };
            } catch (error) {
                console.error(`Error saving User: ${error}`);

                return { 
                    status: false, 
                    statusCode: HTTP_RESPONSE_STATUS.BAD_REQUEST, 
                    message: "Failed to send verification email" 
                };
            }
        }
    } catch (error) {
        console.error(`Fatal Error: ${error}`);

        return { 
            status: false, 
            statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, 
            message: "Invalid Credentials"
        };
    }
};

/**
 * prepare data before creating User instance
 * 
 * @param {Object} parameters
 * 
 * @returns {User} - Returns User Model instance
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
 * @param {string} email - Clinet email address
 * @param {string} name - Client name
 * 
 * @returns {Object} - Returns status, statusCode, Optional:errorFields and message
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

            return { 
                success: false,
                statusCode: HTTP_RESPONSE_STATUS.FORBIDDEN,
                errorsFields: [errorField],
                message: `Existing ${errorField}. Unable to proceed!`
            };
        } else {
            return { status: true, statusCode: HTTP_RESPONSE_STATUS.OK };
        }
    } catch (error) {
        return { success: false, statusCode: HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR, message: "Internal Server Error" };
    }
};