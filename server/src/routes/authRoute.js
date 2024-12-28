import express from 'express';
import { securityValidation, validateUserLogin, validateUserRegistration } from '../middleware/authMiddleware.js';
import { loginUser, logoutUser, registerUser } from '../controller/securityController.js';

const router = express.Router();

const disableCache = (req, res, next) => {
    res.setHeader("Cache-Control", "no-store");

    next();
};

router.use(disableCache);
router.post("/register", validateUserRegistration(), securityValidation, registerUser);
router.post("/login", validateUserLogin(), securityValidation, loginUser);
router.post("/logout", logoutUser);

export default router;