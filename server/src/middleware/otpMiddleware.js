import xssFilters from 'xss-filters';
import { body, validationResult } from "express-validator";

export const validateOtpCode = () => {
    return [
        body('email')
            .trim()
            .isLength({ min: 3, max: 60 }).withMessage("Incorrect email address")
            .bail()
            .isEmail().withMessage("Invalid email address")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('otpCode')
            .isNumeric()
            .isLength({ min: 5, max: 6}).withMessage("Invalid Code")
            .customSanitizer(value => xssFilters.inHTMLData(value))
    ];
}

export const codeValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
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