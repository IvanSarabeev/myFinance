// OTP Define's
export const OTP_EMAIL_TYPE = "001";
export const OTP_PHONE_TYPE = "002";
export const OTP_DEFAULT_TYPE = "003";

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

// O_Auth Type's
export const AUTH_OPERATION_TYPES = {
    SIGN_IN: "signIn",
    SIGN_UP: "signUp",
    LOGOUT: "logout",
} as const;
// End of O_Auth Type's

// Redirect Routes
export const REDIRECT_ROUTES = {
    LOGIN: "/login",
    REGISTER: "/",
    // Account Routes
    DASHBOARD: "/account/dashboard",
} as const;

export const MODAL_TYPES = {
   EMAIL_VERIFICATION: "email-verification",
   FORGOTTEN_PASSWORD: "forgotten-password",
   // TODO: Add new MODAL -> openWallet
} as const;