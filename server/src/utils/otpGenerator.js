import { randomInt } from "crypto";

/**
 * Generate random number based on provided length 
 * 
 * @param {Number} length - desired otp length
 * @returns {String} - Return random 6 digit otp code
 */
export function generateOtp(length) {
    if (length <= 0) throw new Error("Length must be a positive number!");

    let otpCode = randomInt(1, 10).toString();

    for (let i = 1; i < length; i++) {
        otpCode += randomInt(0, 10).toString();
    }

    return Number(otpCode);
}