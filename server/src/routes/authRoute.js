import {Router} from 'express';
import {
    securityValidation,
    validatePasswords,
    validateProviders,
    validateUserLogin,
    validateUserRegistration,
} from '../middleware/authMiddleware.js';
import {
    github,
    google,
    loginUser,
    logoutUser,
    registerUser
} from '../controller/securityController.js';
import {
    forgottenPassword,
    confirmPassword
} from '../controller/forgottenPasswordController.js';
import rateLimitMiddleware from "../middleware/rateLimitMiddleware.js";

const router = Router();

router.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, must-revalidate");

    next();
});

// Authentication Routes
router.post("/register", rateLimitMiddleware(), validateUserRegistration(), securityValidation, registerUser);

router.post("/login", rateLimitMiddleware({ keyType: "ip", maxAttempts: 10 }), validateUserLogin(), securityValidation, loginUser);

router.post("/logout", logoutUser);

// Forgotten Password
// validateUserForgottenPassword(), securityValidation,
router.post("/forgotten-password", rateLimitMiddleware({ keyType: "ip", maxAttempts: 10 }), forgottenPassword);

router.post("/confirm-password", rateLimitMiddleware(), validatePasswords(), securityValidation, confirmPassword);

// External oAuth / APIs
router.post("/google-login", rateLimitMiddleware(), validateProviders(), securityValidation, google);

router.post("/github-login", rateLimitMiddleware(), validateProviders(), securityValidation, github);

export default router;