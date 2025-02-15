import express from 'express';
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

const router = express.Router();

const disableCache = (req, res, next) => {
    res.setHeader("Cache-Control", "no-store");

    next();
};

// Disable Cache Header
router.use(disableCache);

router.post("/register", validateUserRegistration(), securityValidation, registerUser);

router.post("/login", validateUserLogin(), securityValidation, loginUser);

router.post("/logout", logoutUser);

// Forgotten Password
router.post("/forgotten-password", validateUserForgottenPassword(), securityValidation, forgottenPassword);

router.post("/confirm-password", validatePasswords(), securityValidation, confirmPassword);

// Thirt Party APIs

// Authenticate or Register via Google Provider
router.post("/google-login", validateProviders(), securityValidation, google);

// Authenticate or Register via GitHub Provider
router.post("/github-login", validateProviders(), securityValidation, github);

export default router;