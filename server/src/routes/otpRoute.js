import { Router } from 'express';
import { errorValidation, validateOtpCode } from './../middleware/otpMiddleware.js';
import { verifyEmail, emailConfirmation } from '../controller/otpController.js';
import rateLimitMiddleware from "../middleware/rateLimitMiddleware.js";

const router = Router();

router.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, must-revalidate");
    next();
});

// Validate User email after successful registration
router.post("/validate-email", rateLimitMiddleware(), validateOtpCode(), errorValidation, verifyEmail);

// Confirm the User's email to change their password
router.post("/email-confirmation", rateLimitMiddleware(), validateOtpCode(), errorValidation, emailConfirmation);

export default router;