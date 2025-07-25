export const EUROPE_ZONE = "Europe/Sofia";

// OTP 
export const OTP_PUSH_TYPE = "001";
export const OTP_SMS_TYPE = "002";
// End of OTP 

export const HTTP_RESPONSE_STATUS = Object.freeze({
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    RESOURCE_GONE: 410,
    LOCKED: 423,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503, 
});

export const COOKIE_SITE = Object.freeze({
    STRICT: "Strict",
    LAX: "Lax",
    NONE: "None",
    SELF: "Self",
});

/**
 * An object containing predefined message types for logging purposes.
 * The object is immutable to ensure the integrity of the log message types.
 */
export const LOG_MESSAGE_TYPES = Object.freeze({
   'Error': 'error',
   'Info': 'info',
   'Warning': 'warn',
   'Debug': 'debug',
   'Success': 'success',
});