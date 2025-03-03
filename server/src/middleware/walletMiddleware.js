import { body, validationResult } from "express-validator";

import { HTTP_RESPONSE_STATUS } from "../defines.js";

const { BAD_REQUEST } = HTTP_RESPONSE_STATUS;

export const validateWalletCreate = [
    body('name')
        .trim()
        .isString().withMessage("Wallet name must be a string.")
        .notEmpty().withMessage("Wallet name is required."),
];

export const validateWalletDelete = [
    body('walletId')
        .trim()
        .isString().withMessage("Wallet ID must be a valid string")
        .notEmpty().withMessage("Wallet ID is required."),
];

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json({
            status: false,
            errors: errors.array(),
        });
    }

    next(); // Continue to next middleware
}