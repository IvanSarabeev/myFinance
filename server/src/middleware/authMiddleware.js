import xssFilters from "xss-filters";
import { body, validationResult } from 'express-validator';
import { CHARACTERS_LENGTH_REGEX } from "../utils/regex.js";
import { HTTP_RESPONSE_STATUS } from "../defines.js";

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
            // .matches(EMAIL_REGEX).withMessage("Invalid email address")
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
    ]
};

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