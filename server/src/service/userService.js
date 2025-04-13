import { HTTP_RESPONSE_STATUS } from "../defines.js";
import UserRepository from "../repositories/UserRepository.js";

const {NOT_FOUND, INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

/**
 * 
 * @param {string} email
 * @returns {User} - User Model 
 */
export async function getUserDetails(email) {
    try {
        const user = await UserRepository.findByEmail(email);

        if (!user) {
            return {
                status: false,
                statusCode: NOT_FOUND,
                message: "Error User Not Found!"
            };
        }

        return user;
    } catch (error) {
        console.error(`DataBase Fatal Error: ${error}`);

        return {
            status: false,
            statusCode: INTERNAL_SERVER_ERROR,
            message: "",
        }
    }
}