import {HTTP_RESPONSE_STATUS} from "../defines.js";
import {isRateLimited} from "../service/rateLimiterService.js";

const { BAD_REQUEST, TOO_MANY_REQUESTS } = HTTP_RESPONSE_STATUS;

export default function rateLimitMiddleware({ keyType = "ip", maxAttempts = 10, windowMs = 60000} = {} ) {
    return (req, res, next) => {
        const key = keyType === "ip" ? req.ip : req.user?.id;

        if (!key) {
            // Return error if the key is missing
            return res.status(BAD_REQUEST).json({
                status: false,
                error: "Missing key for rate limiting. Please provide valid key.",
            });
        }

        const { limited } = isRateLimited(key, maxAttempts, windowMs);

        if (limited) {
            // Return error if the rate limit is exceeded
            return res.status(TOO_MANY_REQUESTS).json({
                status: false,
                error: "Too many requests. Please try again later.",
            });
        }

        next(); // Proceed to next middleware
    };
}