import express from 'express';
import { codeValidation, validateOtpCode } from './../middleware/otpMiddleware.js';
import { verifyEmail } from '../controller/otpController.js';

const router = express.Router();

const securityHeaders = (req, res, next) => {
    res.setHeader("Cache-Control", "no-store");

    next();
};

router.use(securityHeaders);
router.post("/validate-email", validateOtpCode(), codeValidation, verifyEmail);

export default router;