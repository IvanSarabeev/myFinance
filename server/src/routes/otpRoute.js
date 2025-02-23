import { Router } from 'express';
import { errorValidation, validateOtpCode, validateUserEmail } from './../middleware/otpMiddleware.js';
import { verifyEmail, emailConfirmation } from '../controller/otpController.js';

const router = Router();

router.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, must-revalidate");
    next();
});

// Validate User email after succesful registration
router.post("/validate-email", validateOtpCode(), errorValidation, verifyEmail);

// Confirm the User's email in order to change their password
router.post("/email-confirmation", validateUserEmail(), errorValidation, emailConfirmation);

export default router;