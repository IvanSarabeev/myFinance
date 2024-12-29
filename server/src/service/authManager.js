import dotenv from 'dotenv';
import Jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../model/user.js';
import { HTTP_RESPONSE_STATUS } from '../defines.js';
import { UserRoles } from '../enums/userEnum.js';

dotenv.config();

/**
 * Authenticate/Register User through 3-th party API 
 * 
 * @param {Object} parameters 
 * @returns 
 */
export async function googleService(parameters) {
    const { email, name, photo, fingerPrint } = parameters;

    try {
        const user = await User.findOne({ email: email });

        console.log("User _id:", typeof user._id, user._id);

        if (user) {
            const response = await createUserToken(user._id);
            const {status, statusCode, token, message} = response;
            
            if (status && statusCode === HTTP_RESPONSE_STATUS.CREATED) {
                const { ...data } = user.toObject();

                return {
                    status: status,
                    statusCode: HTTP_RESPONSE_STATUS.OK,
                    data: data,
                    token: token,
                    message: message,
                };
            }

            return response;
        } else {
            return await createUser({ email, name, photo, fingerPrint });
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
 * User has already been registrated to the system
 * 
 * @param {ObjectId} userId - Entity User
 * @returns {Object}
 */
async function createUserToken(userId) {
    try {
        const token = Jwt.sign({ id: userId }, process.env.JWT_OPTION ?? "");

        if (!token) {   
            return {
                status: false,
                statusCode: HTTP_RESPONSE_STATUS.FORBIDDEN,
                token: undefined,
                message: "Unable to authenticate user",
            };
        }

        return {
            status: true,
            statusCode: HTTP_RESPONSE_STATUS.CREATED,
            token: token,
            message: "Authentication via Google Succesful",
        }
    } catch (error) {
        console.error("Unable to create Token", error);

        return {
            status: false,
            statusCode: HTTP_RESPONSE_STATUS.SERVICE_UNAVAILABLE,
            message: "Can't proceed with third party data, Please contact our support center!"
        };
    }
};

/**
 * Register User through the system.
 * 
 * @param {Object} parameters 
 * @returns {Object}
 */
async function createUser(parameters) {
    const { email, name, photo, fingerPrint } = parameters;

    const newPassword = Math.random().toString().slice(8) + Math.random().toString().slice(8);
    const hashPassword = bcryptjs.hashSync(newPassword, 12);

    try {
        const userName = name.trim();
        const findUser = await User.findOne({ username: userName });

        if (findUser) {
            return await createUserToken(findUser._id);
        }

        try {
            const createUser = new User({
                name: userName,
                email: email,
                password: hashPassword,
                terms: true,
                role: UserRoles.DEFAULT_ROLE,
                device: fingerPrint,
                userAvatar: photo,
                verified: true,
                otpCode: NaN,
                otpExpiration: undefined,
            });

            // Option, add step for email verification
            await createUser.save();

            const token = Jwt.sign({ id: createUser._id }, process.env.JWT_OPTION ?? "");

            const { ...data } = createUser.toObject();

            return {
                status: true,
                statusCode: HTTP_RESPONSE_STATUS.CREATED,
                message: "Succesful registration via Google",
                token: token,
                data: data
            };
        } catch (error) {
            console.error("Cannot proceed further", error);

            return {
                status: false,
                statusCode: HTTP_RESPONSE_STATUS.SERVICE_UNAVAILABLE,
                message: "Can't proceed with third party data, Please contact our support center!"
            }
        }

    } catch (error) {
        console.error("Unable to create user", error);

        return {
            status: false,
            statusCode: HTTP_RESPONSE_STATUS.SERVICE_UNAVAILABLE,
            message: "Can't proceed with third party data, Please contact our support center!"
        };
    }
};