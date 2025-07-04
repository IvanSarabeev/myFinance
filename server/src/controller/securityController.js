import { registerUserService,loginUserService } from '../service/securityService.js';
import { HTTP_RESPONSE_STATUS } from '../defines.js';
import { cookieOption } from '../config/cookie.js';
import { googleService, githubService } from '../service/authManager.js';
import { TOKEN_ID } from '../config/env.js';
import { logMessage } from "../utils/helpers.js";

const {OK, CREATED, INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE} = HTTP_RESPONSE_STATUS;

/**
 * Processing the User Registration workflow
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {Function} next - Next Middleware
 *
 * @returns {Object} - Response Object with status, statusCode, showOtpModal, message and errorFields
 */
export async function registerUser(req, res, next){
    try {
        const { name, email, password, terms, fingerPrint } = req.body;

        const result = await registerUserService({ name, email, password, terms, fingerPrint});

        const { status, statusCode, showOtpModal, message, errorFields } = result;

        if (statusCode !== CREATED) {
            res.status(statusCode).json(result);
        } else {
            res.status(statusCode).json({
                status: status,
                showModal: showOtpModal,
                message: message,
                errorFields: errorFields
            });
        }
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when Registering User');

        next();
        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

/**
 * Process User to their account
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {Function} next - Next Middleware
 *
 * @returns {Object} - Response Object with status, statusCode, message, token and data
 */
export async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;

        const result = await loginUserService({ email, password });

        if (result) {
            const { status, message, token, statusCode, data } = result;

            if (status && statusCode === OK) {
                res.cookie(TOKEN_ID, token, cookieOption).status(statusCode).json({
                    status, message, token, data,
                });
            }
        } else {
            const { statusCode, message, errorFields } = result;

            res.status(statusCode).json({
                status: false,
                message: message,
                errorFields: errorFields,
            });
        }
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when Logging User in');

        next();
        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

/**
 * Clear a User, their Cookie Token
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {Function} next - Next Middleware
 *
 * @returns {Object} - Response Object with status and message
 */
export function logoutUser(req, res, next){
    try {
        res.clearCookie(TOKEN_ID);
        res.status(OK).json({
            status: true,
            message: "User Successfully Loged Out"
        });
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when Logging User out');

        next(error);
    }
}

/**
 * Authenticate/Register User through 3 party oAuth/API
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {Function} next - Next Middleware
 *
 * @returns {Object} - Response Object with status, statusCode, data, token and message
 */
export async function google(req, res, next) {
    const { email, name, photo, fingerPrint } = req.body;
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    // res.setHeader('Access-Control-Allow-Credentials', 'true');

    try {
        const result = await googleService({ email, name, photo, fingerPrint });
        const {status, statusCode, data, token, message } = result;

        if (
            status &&
            statusCode === OK ||
            statusCode === CREATED
        ) {
            res.cookie(TOKEN_ID, token, {
                ...cookieOption,
                path: "/", // Across all routes
            }).status(statusCode).json({ status, token, data, message });
        } else {
            return {
                status: false,
                statusCode: statusCode,
                message: message,
            }
        }
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when Logging User with Google');

        next();
        res.status(SERVICE_UNAVAILABLE).json({
            status: false,
            message: "Current service is unavailable, Please contact our support center."
        });
    }
}

/**
 * Authenticate/Register User through 3 party oAuth/API
 *
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @param {Function} next - Next Middleware
 *
 * @returns {Object} - Response Object with status, statusCode, message and token
 */
export async function github(req, res, next) {
    const { email, name, photo, fingerPrint } = req.body;

    try {
        const result = await githubService({ email, name, photo, fingerPrint });
        const {status, statusCode, message, token } = result;

        if (result) {
            if (status && statusCode === CREATED) {
                res.cookie(TOKEN_ID, token, cookieOption).status(statusCode).json({
                    status, token, message,
                });
            }
        } else {
            return {
                status: false,
                statusCode: statusCode,
                message: message,
            }
        }
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when Logging User with GitHub');

        next();
        res.status(SERVICE_UNAVAILABLE).json({
            status: false,
            message: "Current service is unavailable, Please contact our support center."
        });
    }
}
