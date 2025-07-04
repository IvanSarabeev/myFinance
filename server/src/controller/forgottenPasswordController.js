import { confirmPassowrdService, forgottenPasswordService } from "../service/securityService.js";
import { HTTP_RESPONSE_STATUS } from "../defines.js";
import { logMessage } from "../utils/helpers.js";

const {INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

/**
 * Sent the User a Confirmation (email template)
 * If there's a User with the following email, update the User model
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {Function} next - Next Middleware
 *
 * @returns {Object} Return - status, statusCode, message and showRequestedModal
 */
export async function forgottenPassword(req, res, next) {
    const { email } = req.body;

    try {
        const result = await forgottenPasswordService(email);
        const { status, statusCode, message, showRequestedModal } = result;
        
        return res.status(statusCode).json({ status, statusCode, message, showRequestedModal });
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when sending forgotten password email');

        next();
        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

/**
 * Confirm User new password
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {Function} next - Next Middleware
 *
 * @returns {Object} - Response Object with status, statusCode, message and errorFields
 */
export async function confirmPassword(req, res, next) {
    const { email, password, confirm_password } = req.body;

    try {
        const response = await confirmPassowrdService({ email, password, confirm_password });
        const { status, statusCode, message, errorsFields } = response;

        if (Array.isArray(errorsFields) && errorsFields.length > 0) {
            res.status(statusCode).json({ status, statusCode, message, errorsFields });
        }

        return res.status(statusCode).json({ status, statusCode, message });
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when confirming password');

        next();
        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}