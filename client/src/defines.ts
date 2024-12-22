// OTP Define's

export const OTP_EMAIL_TYPE = "01";
export const OTP_PHONE_TYPE = "02";
export const OTP_DEFAULT_TYPE = "03";

export const MAX_OTP_SLOTS = 6;
export const MIN_OTP_SLOTS = 4;

// End of OTP Define's

// Default HTTP Response Status Codes

export const HTTP_RESPONSE_STATUS = Object.freeze({
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
});

// End of HTTP Response Status Codes