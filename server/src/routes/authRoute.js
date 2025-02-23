import { Router } from 'express';
import { 
    securityValidation, 
    validatePasswords, 
    validateProviders,
    validateUserForgottenPassword,
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

const router = Router();

router.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, must-revalidate");

    next();
});

// Authentication Routes
router.post("/register", validateUserRegistration(), securityValidation, registerUser);

router.post("/login", validateUserLogin(), securityValidation, loginUser);

router.post("/logout", logoutUser);

// Forgotten Password
router.post("/forgotten-password", validateUserForgottenPassword(), securityValidation, forgottenPassword);

router.post("/confirm-password", validatePasswords(), securityValidation, confirmPassword);

// Thirt Party APIs
router.post("/google-login", validateProviders(), securityValidation, google);

router.post("/github-login", validateProviders(), securityValidation, github);

export default router;