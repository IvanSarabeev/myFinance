import { body, validationResult } from "express-validator";

import { HTTP_RESPONSE_STATUS } from "../defines.js";

const { BAD_REQUEST } = HTTP_RESPONSE_STATUS;

export const validateWalletCreate = [
    body('name')
        .trim()
        .isString().withMessage("Wallet name must be a string.")
        .notEmpty().withMessage("Wallet name is required."),

    body('type') // Account -> Required
        .notEmpty().withMessage("Type is required")
        .isString().withMessage("Type must be string"),

    // The below properties are required by flag -> customEnabled if Truthy

    body('customEnabled')
        .optional()
        .isBoolean().withMessage("Unsupported type"),

    body('accountName')
        .if((value, { req }) => req.body.customEnabled === true)
        .notEmpty().withMessage("Name is required in custom mode")
        .isString().withMessage("Name must be string"),

    body('currency')
        .if((value, { req }) => req.body.customEnabled === true)
        .notEmpty().withMessage("Currency requireed in custom mode")
        .isString().withMessage("Currency not available"),

    body('initialDeposit')
        .if((value, { req }) => req.body.customEnabled === true)
        .isNumeric().withMessage("Deposit must be number"),
    
    body('description')
        .optional()
        .isString().withMessage("Description must be string")
        .trim(),
    
    body('icon')
        .optional()
        .isString().withMessage("Description must be string")
        .trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return validation errors to client
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
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