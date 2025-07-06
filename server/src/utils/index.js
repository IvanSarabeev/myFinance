import { Types } from "mongoose";
import fs from "node:fs/promises";
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

/**
 * Check if the given ID OR IDs are a valid MongoDB ObjectId
 * 
 * @param {String|Array<string>} id - The ID to validate 
 * @returns {Boolean} - True if valid ObjectId, otherwise false
 */
export function isValidObjectId(id) {
    if (Array.isArray(id)) {
        return id.every((idItem) => Types.ObjectId.isValid(idItem));
    }

    return typeof id === 'string' && Types.ObjectId.isValid(id); 
}

/**
 * Check if the file exists
 * 
 * @param {String} filePath - The file path to validate
 * @returns {Boolean} - True if file exists, otherwise false  
 */
export async function isFileExisting(filePath) {
    return await fs.stat(filePath).then(() => true).catch(() => false);
}