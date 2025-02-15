import express from 'express';
import { errorValidation, validateOtpCode, validateUserEmail } from './../middleware/otpMiddleware.js';
import { verifyEmail } from '../controller/otpController.js';

const router = express.Router();

const securityHeaders = (req, res, next) => {
    res.setHeader("Cache-Control", "no-store");

    next();
};

// Prevent cache storing
router.use(securityHeaders);

// Validate User email after succesful registration
router.post("/validate-email", validateOtpCode(), errorValidation, verifyEmail);

// Validate User email in order to change their password
router.post("/forgotten-password", validateUserEmail(), errorValidation);

export default router;