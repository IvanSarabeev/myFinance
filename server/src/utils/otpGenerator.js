import { randomInt } from "crypto";

/**
 * Generate random number based on provided length 
 * 
 * @param {number} length - desired otp length 
 * @returns {string}
 */
export function generateOtp(length) {
    if (length <= 0) throw new Error("Length must be a positive number!");

    let otpCode = randomInt(1, 10).toString();

    for (let i = 1; i < length; i++) {
        otpCode += randomInt(0, 10).toString();
    }

    return Number(otpCode);
};