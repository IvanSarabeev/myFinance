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
        return { statusCode: 403, message: "Forbidden: Your IP is not allowed to access this resource" };
    }

    return { statusCode: 200, message: "Access Granted" };
}