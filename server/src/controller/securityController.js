import dotenv from 'dotenv';
import { registerUserService, loginUserService } from '../service/securityService.js';
import { HTTP_RESPONSE_STATUS } from '../defines.js';

dotenv.config();

const tokenId = process.env.TOKEN_ID ?? "";

/**
 * Proceeding the User Registration workflow
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function registerUser(req, res, next){
    try {   
        const { name, email, password, terms, fingerPrint } = req.body;

        const result = await registerUserService({ name, email, password, terms, fingerPrint });
        
        console.log("Controller Response:", result);

        if (result.statusCode !== HTTP_RESPONSE_STATUS.CREATED) {
            res.status(HTTP_RESPONSE_STATUS.BAD_REQUEST).json(result);
        } else {
            res.status(result.statusCode).json({
                status: result.status,
                showModal: result.showOtpModal,
                message: result.message,
                errorFields: result.errorFields
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

        console.log("Controller Result:", result);
        
        if (result) {
            const {status, message, token, statusCode} = result;
            
            console.log("Controller STATUS:", status);
            console.log("Controller Code:", statusCode === HTTP_RESPONSE_STATUS.OK);
            console.log("Controller Token:", token);
            if (status && statusCode === HTTP_RESPONSE_STATUS.OK) {
                res.status(statusCode).json({
                    status: true,
                    token: token,
                    message: message,
                });
            } 
        } else {
            const { statusCode, message, errorFields } = result;
            console.log("Bad Response:", statusCode, message, errorFields);
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
 * Clear a User, their Cookie Token 
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function logoutUser(req, res, next){
    try {
        res.clearCookie(tokenId);
        res.status(HTTP_RESPONSE_STATUS.OK).json({
            status: true, 
            message: "User Logout Succesfully"
        });
    } catch (error) {
        console.error(`Unexpected Logout Error: ${error}`);

        next(error);
    }
}