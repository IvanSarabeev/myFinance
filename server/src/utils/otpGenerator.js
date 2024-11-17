import { randomInt } from "crypto";

/**
 * Generate random number based on provided length 
 * 
 * @param {Number} length 
 * @returns {Number}
 */
export function generateOtp(length) {
    let otpCode = "";

    for (let i = 0; i < length; i++) {
        otpCode += randomInt(0, 10).toString();
    }

    return Number(otpCode);
};