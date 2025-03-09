import xssFilters from 'xss-filters';

import { body, validationResult } from "express-validator";
import { HTTP_RESPONSE_STATUS } from '../defines.js';

export const validateOtpCode = () => {
    return [
        body('email')
            .trim()
            .isLength({ min: 3, max: 60 }).withMessage("The provided email address is invalid.")
            .bail()
            .isEmail().withMessage("Invalid email address")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('otpCode')
            .trim()
            .isNumeric().withMessage("Provided code is invalid.")
            .isLength({ min: 5, max: 6}).withMessage("Invalid code length.")
            .customSanitizer(value => {
                const sanitizedValue = xssFilters.inHTMLData(value);

                return parseInt(sanitizedValue);
            })
    ];
}

export const validateUserEmail = () => {
    return [
        body('email')
            .trim()
            .isLength({ min: 3, max: 60 }).withMessage("Incorrect email address")
            .bail()
            .isEmail().withMessage("Invalid email address")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
    ];
};

export const errorValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(HTTP_RESPONSE_STATUS.BAD_REQUEST).json({
            status: false,
            message: "Invalid Credentials",
            errors: errors.array().map(item => ({
                value: item.value,
                message: item.msg,
            })),
        });

        return;
    }

    next();
};