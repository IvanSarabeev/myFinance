import dotenv from 'dotenv';
import { registerUserService } from '../service/securityService.js';
import { HTTP_RESPONSE_STATUS } from '../defines.js';

dotenv.config();

const tokenId = process.env.TOKEN_ID ?? "";

/**
 * Controller for Proceeding the User Registration workflow
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
        res.status(500).json({ status: false, message: "Internal Server Error" });
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