import mongoose from 'mongoose';

import { 
    registerUserService,
    loginUserService, 
    forgottenPasswordService
} from '../service/securityService.js';
import { HTTP_RESPONSE_STATUS } from '../defines.js';
import { cookieOption } from '../config/cookie.js';
import { googleService, githubService } from '../service/authManager.js';
import { TOKEN_ID } from '../config/env.js';


/**
 * Proceeding the User Registration workflow
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function registerUser(req, res, next){
    const session = await mongoose.startSession(); // Begin Transaction
    session.startTransaction();

    try {   
        const { name, email, password, terms, fingerPrint } = req.body;

        const result = await registerUserService({ name, email, password, terms, fingerPrint }, session);

        const { status, statusCode, showOtpModal, message, errorFields } = result;

        if (statusCode !== HTTP_RESPONSE_STATUS.CREATED) {
            await session.abortTransaction(); // Abort Transaction

            res.status(statusCode).json(result);
        } else {
            await session.commitTransaction(); // Persist Transaction

            res.status(statusCode).json({
                status: status,
                showModal: showOtpModal,
                message: message,
                errorFields: errorFields
            });
        }
    } catch (error) {
        await session.abortTransaction(); // Abort Transaction
        session.endSession();

        console.error(`Unexpected Server Error: ${error}`);

        next();
        res.status(HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Proceed User to their account
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;

        const result = await loginUserService({ email, password });
        
        if (result) {
            const { status, message, token, statusCode, data } = result;
            
            if (status && statusCode === HTTP_RESPONSE_STATUS.OK) {
                res.cookie(TOKEN_ID, token, cookieOption).status(statusCode).json({
                    status: true,
                    message: message,
                    token: token,
                    data: data,
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
        console.error(`Unexpected Server Error: ${error}`);

        next();
        res.status(HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Sent the User a email with the new password
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @returns {Object}
 */
export async function forgottenPassword(req, res, next) {
    const { email } = req.body;

    try {
        const result = await forgottenPasswordService(email);

        console.log("Controller Result: ", result);
        
        if (result) {
            const { status, statusCode, message } = result;
            
            if (status && statusCode === HTTP_RESPONSE_STATUS.CREATED) {
                return {
                    status: true,
                    message: message,
                }
            } 
        } else {
            const { statusCode, message } = result;

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
 * Clear a User, their Cookie Token 
 * 
 * @param {Request} req 
 * @param {Respons} res 
 * @param {NextFunction} next 
 * @returns {Object}
 */
export function logoutUser(req, res, next){
    try {
        res.clearCookie(TOKEN_ID);
        res.status(HTTP_RESPONSE_STATUS.OK).json({
            status: true, 
            message: "User Succesfully Loged Out"
        });
    } catch (error) {
        console.error(`Unexpected Logout Error: ${error}`);

        next(error);
    }
}

/**
 * Authenticate/Register User through 3-th party API
 * 
 * @param {Request} req 
 * @param {Respons} res 
 * @param {NextFunction} next 
 * @returns {Object}
 */
export async function google(req, res, next) {
    const { email, name, photo, fingerPrint } = req.body;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    try {
        const result = await googleService({ email, name, photo, fingerPrint });

        const {status, statusCode, data, token, message } = result;

        if (
            status &&
            statusCode === HTTP_RESPONSE_STATUS.OK ||
            statusCode === HTTP_RESPONSE_STATUS.CREATED
        ) {
            res.cookie(TOKEN_ID, token, {
                ...cookieOption,
                path: "/", // Across all routes
            }).status(statusCode).json({
                status: true,
                token: token,
                data: data,
                message: message,
            });
        } else {
            return {
                status: false,
                statusCode: statusCode,
                message: message,
            }
        }
    } catch (error) {
        console.error(`Unexpected Server Error: ${error}`);

        next();
        res.status(HTTP_RESPONSE_STATUS.SERVICE_UNAVAILABLE).json({
            status: false,
            message: "Current service is unavailable, Please contanct our support center!"
        });
    }
};

/**
 * Authentica/Register User thorugh 3-th party API
 * 
 * @param {Request} req 
 * @param {Respons} res 
 * @param {NextFunction} next 
 * @returns {Object}
 */
export async function github(req, res, next) {
    const { email, name, photo, fingerPrint } = req.body;

    try {
        const result = await githubService({ email, name, photo, fingerPrint });

        console.log("Controller Result:", result);

        const {status, statusCode, message, token } = result;

        if (result) {
            if (status && statusCode === HTTP_RESPONSE_STATUS.CREATED) {   
                res.cookie(TOKEN_ID, token, cookieOption).status(statusCode).json({
                    status: true,
                    token: token,
                    message: message,
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
        console.error(`Unexpected Server Error: ${error}`);

        next();
        res.status(HTTP_RESPONSE_STATUS.SERVICE_UNAVAILABLE).json({
            status: false,
            message: "Current service is unavailable, Please contanct our support center!"
        });
    }
};

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