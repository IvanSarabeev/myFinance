import { HTTP_RESPONSE_STATUS } from "../defines.js";
import { getUserDetails } from "../service/userService.js";

const {INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

// TODO: add Service from userService.js

/**
 * Get User Details
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns {Object} - contains status, data
 */
export async function userDetails(req, res, next) {
    const { email } = req.body;
    
    try {
        const response = await getUserDetails(email);  
        const {status, statusCode, data} = response;

        return res.status(statusCode).json({ status, data});
    } catch (error) {
        console.error(`Fatal Error: ${error}`);

        next();
        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}