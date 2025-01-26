import express from 'express';
import { errorValidation, validateOtpCode, validateUserEmail } from './../middleware/otpMiddleware.js';
import { verifyEmail } from '../controller/otpController.js';

const router = express.Router();

const securityHeaders = (req, res, next) => {
    res.setHeader("Cache-Control", "no-store");

    next();
};

router.use(securityHeaders);
router.post("/validate-email", validateOtpCode(), errorValidation, verifyEmail);
router.post("/forgotten-password", validateUserEmail(), errorValidation);

export default router;