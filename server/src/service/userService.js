import User from "./../model/user.js";

/**
 * Create new User Entity
 * 
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * @param {Boolean} terms 
 * @param {Number} otpCode
 * @param {Date} otpExpiration
 * @param {deviceSchema} fingerPrint
 * @returns 
 */
export function createUserDocument({ name, email, password, terms, otpCode, otpExpiration, fingerPrint }) {
    return new User({
        name: name,
        email: email,
        password: password,
        terms: terms,
        otpCode: otpCode,
        otpExpiration: otpExpiration,
        device: fingerPrint
    });
}

/**
 * Persist User Entity
 * 
 * @param {User} userDocument 
 * @returns {void}
 */
export async function persistUser(userDocument) {
    return await userDocument.save();
}