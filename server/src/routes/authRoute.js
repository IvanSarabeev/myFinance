import express from 'express';
import { 
    securityValidation, 
    validateUserForgottenPassword, 
    validateUserLogin, 
    validateUserRegistration,
} from '../middleware/authMiddleware.js';
import { 
    forgottenPassword, 
    loginUser, 
    logoutUser, 
    registerUser
} from '../controller/securityController.js';

const router = express.Router();

const disableCache = (req, res, next) => {
    res.setHeader("Cache-Control", "no-store");

    next();
};

router.use(disableCache);
router.post("/register", validateUserRegistration(), securityValidation, registerUser);
router.post("/login", validateUserLogin(), securityValidation, loginUser);
router.post("/forgotten-password", validateUserForgottenPassword(), securityValidation, forgottenPassword);
router.post("/logout", logoutUser);

export default router;