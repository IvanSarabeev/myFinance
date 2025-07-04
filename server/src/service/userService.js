import { HTTP_RESPONSE_STATUS } from "../defines.js";
import UserRepository from "../repositories/UserRepository.js";
import { logMessage } from "../utils/helpers.js";

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = HTTP_RESPONSE_STATUS;

/**
 * Retrieves user details based on the provided email.
 *
 * @param {string} email - The email address of the user to retrieve details for.
 * @return {Promise<Object>} - A promise that resolves to an object containing the user details if found,
 * or an error response object if the user is not found or there is an internal error.
 */
export async function getUserDetails(email) {
    if (email.length === 0 || typeof email !== "string") {
        return {
            status: false,
            statusCode: NOT_FOUND,
            message: "Error User Not Found!"
        }
    }

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
        logMessage(error, 'Error getting user details');

        return {
            status: false,
            statusCode: INTERNAL_SERVER_ERROR,
            message: "Internal Error. Please try again later.",
        }
    }
}