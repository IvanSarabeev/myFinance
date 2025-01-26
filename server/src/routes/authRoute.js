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
    confirmPassword,
    forgottenPassword, 
    github, 
    google, 
    loginUser, 
    logoutUser, 
    registerUser
} from '../controller/securityController.js';

const router = express.Router();

const disableCache = (req, res, next) => {
    res.setHeader("Cache-Control", "no-store");

    next();
};

// Disable Cache Header
router.use(disableCache);
router.post(
    "/register",
    validateUserRegistration(),
    securityValidation,
    registerUser
);
router.post(
    "/login",
    validateUserLogin(),
    securityValidation,
    loginUser
);
router.post(
    "/forgotten-password",
    validateUserForgottenPassword(),
    securityValidation,
    forgottenPassword
);
router.post(
    "/confirm-password",
    validatePasswords(),
    securityValidation,
    confirmPassword
);
router.post(
    "/logout",
    logoutUser
);

// Thirt Party APIs
router.post(
    "/google-login", 
    validateProviders(), 
    securityValidation, 
    google
);
router.post(
    "/github-login", 
    validateProviders(), 
    securityValidation, 
    github
);

export default router;