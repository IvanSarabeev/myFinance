import { confirmPassowrdService, forgottenPasswordService } from "../service/securityService.js";
import { HTTP_RESPONSE_STATUS } from "../defines.js";

/**
 * Sent the User a Confirmation (email template)
 * If there's a User with the following email, update the User model
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @returns {Object} Return - status, message, showRequestedModal
 */
export async function forgottenPassword(req, res, next) {
    const { email } = req.body;

    console.log("Request Params: ", req.body);

    try {
        const result = await forgottenPasswordService(email);

        console.log("Controller Result: ", result);
        const { status, statusCode, message, showRequestedModal } = result;
        
        if (status && statusCode === HTTP_RESPONSE_STATUS.CREATED) {
            return {
                status: true,
                message: message,
                showRequestedModal,
            }
        } else {
            res.status(statusCode).json({
                status: false,
                message: message,
            });
        }
    } catch (error) {
        console.error(`Unexpected Server Error: ${error}`);

        next();
        res.status(HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Confirm User new password
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {Object} - status, statusCode, message, errorFields
 */
export async function confirmPassword(req, res, next) {
    const { email, password, confirmPassword } = req.body;

    try {
        const response = await confirmPassowrdService({ email, password, confirmPassword });

        console.log("Confirm Password Response:", response);

        const { status, statusCode, message, errorsFields } = response;

        if (errorsFields.length > 0) {
            return {
                status: false,
                statusCode: statusCode,
                message: message,
                errorFields: errorsFields
            };
        }

        if (status && statusCode === HTTP_RESPONSE_STATUS.OK) {
            return {
                status: true,
                statusCode: statusCode,
                message: message
            };
        } else {
            return {
                status: false,
                statusCode: statusCode,
                message: message
            };
        }
    } catch (error) {
        console.error(`Unexpected Server Error: ${error}`);

        next();
        res.status(HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};