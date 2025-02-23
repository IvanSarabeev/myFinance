import aj from "../config/arcjet.js";
import { HTTP_RESPONSE_STATUS } from "../defines.js";

const {TOO_MANY_REQUESTS, FORBIDDEN} = HTTP_RESPONSE_STATUS;

/**
 * Prevents access to the application if the request is denied
 * when rule is detected return 403 or 429, otherwise continue to the next middleware
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise<any>} return status or next middleware
 */
const arcjectMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit) return res.status(TOO_MANY_REQUESTS).json({ error: 'Rate limit exceeded. Please try again later.'});
            if (decision.reason.isBot) return res.status(FORBIDDEN).json({ error: "Bot detected" });

            return res.status(FORBIDDEN).json({ error: "Access denied" });
        }

        next();
    } catch (error) {
        console.error(`Arcject Middleware Error: ${error}`);
        next();
    }
};

export default arcjectMiddleware;