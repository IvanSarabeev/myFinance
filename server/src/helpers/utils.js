import { HTTP_RESPONSE_STATUS } from "../defines.js";

/**
 * Restrict Access to specific Endpoint/s
 * 
 * @param {Array} allowedIps - List of allowed IPs
 * @param {String} clientIp - Client's IP
 * 
 * @returns {Object} - Status code and message
 */
export function allowedIpLists(allowedIps, clientIp) {
    if (!allowedIps.includes(clientIp)) {
        return { statusCode: HTTP_RESPONSE_STATUS.FORBIDDEN, message: "Forbidden: Access Denied!" };
    }

    return { statusCode: HTTP_RESPONSE_STATUS.OK, message: "Access Granted" };
};

/**
 * Remove trailing slashes and spaces
 * 
 * @param {String} url 
 */
export function cleanUrl(url) {
    if (!url) {
        return null;
    }

    return url.replace(/\/+$/, "").trim();
}