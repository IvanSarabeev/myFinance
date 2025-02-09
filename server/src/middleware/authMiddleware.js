import xssFilters from "xss-filters";
import { body, validationResult } from 'express-validator';
import { COMMON_REGEXS } from "../utils/regex.js";
import { HTTP_RESPONSE_STATUS } from "../defines.js";

const {CHARACTERS_LENGTH_REGEX} = COMMON_REGEXS;

/**
 * Middleware for the User Registration flow request Data
 * 
 * @returns {Array}
 */
export const validateUserRegistration = () => {
    return [
        body("name")
            .trim()
            .isString()
            .isLength({ min: 3, max: 40 }).withMessage("Name is invalid")
            .bail()
            .matches(CHARACTERS_LENGTH_REGEX).withMessage("Invalid Name Credentials")
            .customSanitizer(value => xssFilters.inHTMLData(value))
        ,
        body("email")
            .trim()
            .isLength({ min: 4, max: 60 }).withMessage("Incorrect email address")
            .bail() // Ignore the rest conditions, if the first failed
            .isEmail().withMessage("Invalid email address")
            .customSanitizer(value => xssFilters.inHTMLData(value))
        ,
        body("password")
            .trim()
            .isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
            .withMessage("Weak password provided")
        ,
        body("terms")
            .isBoolean().withMessage("Terms aren't accepted")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body("fingerPrint")
            .isObject().withMessage("Invalid data")
            .customSanitizer(value => {
                if (typeof value === 'object') {
                    return value;
                }

                return xssFilters.inHTMLData(value)
            })
    ];
};

/**
 * Middleware for Authenticating User request Data
 * 
 * @returns {Array}
 */
export const validateUserLogin = () => {
    return [
        body('email')
            .trim()
            .isLength({ min: 4, max: 60 }).withMessage("Incorrect email address")
            .bail() // Ignore the rest conditions, if the first failed
            .isEmail().withMessage("Invalid email address")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('password')
            .trim()
            .isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
            .withMessage("Weak password provided"),
    ];
};

/**
 * Middleware for User forgotten password, request Data
 * 
 * @returns {Array}
 */
export const validateUserForgottenPassword = () => {
    return [
        body('email')
            .trim()
            .isLength({ min: 4, max: 60 }).withMessage("Incorrect email address")
            .bail() // Ignore the rest conditions, if the first failed
            .isEmail().withMessage("Invalid email address")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
    ];
};

export const validatePasswords = () => {
    return [
        body('password')
            .trim()
            .isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
            .withMessage("Weak password provided")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords don't match");
                }

                return true;
            }),
    ];
}

/**
 * Middleware for Authentication via 3-th party API
 * 
 * @returns {Array}
 */
export const validateProviders = () => {
    return [
        body('email')
            .trim()
            .isLength({ min: 4, max: 60 }).withMessage("Invalid email address.")
            .bail() 
            .isEmail().withMessage("Invalid email address")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('name')
            .trim()
            .isString()
            .isLength({ min: 3, max: 40 }).withMessage("Name is invalid")
            .bail()
            .matches(CHARACTERS_LENGTH_REGEX).withMessage("Invalid Name Credentials")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('photo')
            .trim()
            .isLength({ min: 5, max: 100 }).withMessage("Photo must be a valid link")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
            body("fingerPrint")
            .isObject().withMessage("Invalid data")
            .customSanitizer(value => {
                if (typeof value === 'object') {
                    return value;
                }

                return xssFilters.inHTMLData(value)
            }),
    ]
};

/**
 * Middleware Function
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Object}
 */
export const securityValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(HTTP_RESPONSE_STATUS.BAD_REQUEST).json({
            status: false,
            message: "Invalid Credentials",
            errorsFields: errors.array().map(item => ({
                // value: item.value,
                message: item.msg,
            })),
        });

        return;
    }

    next();
};