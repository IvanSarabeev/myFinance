import express from 'express';
import { codeValidation, validateOtpCode } from './../middleware/otpMiddleware.js';
import { verifyOtp } from '../controller/otpController.js';

const router = express.Router();

const securityHeaders = (req, res, next) => {
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");

    // Set X-XSS-Protection header (though modern browsers have built-in protection)
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE");

    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/json");

    next();
};

router.use(securityHeaders);
router.post("/validate", validateOtpCode(), codeValidation, verifyOtp);

export default router;