import express from 'express';
import { securityValidation, validateUserRegistration } from '../middleware/authMiddleware.js';
import { logoutUser, registerUser } from '../controller/securityController.js';

const router = express.Router();

const SecurityHeaders = (req, res, next) => {
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");

    // Set X-XSS-Protection header (though modern browsers have built-in protection)
    res.setHeader("X-XSS-Protection", "1; mode=block");

    res.setHeader("Access-Control-Allow-Origin", "*"); // Replace '*' with specific domains in production
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    // Cache control headers
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/json");

    next();
};

router.use(SecurityHeaders);
router.post("/register", validateUserRegistration(), securityValidation, registerUser);
router.post("/logout", logoutUser);

export default router;