import express from 'express';
import { securityValidation, validateUserRegistration } from '../middleware/authMiddleware.js';
import { logoutUser, registerUser } from '../controller/securityController.js';

const router = express.Router();

router.post("/register", validateUserRegistration(), securityValidation, registerUser);
router.post("/logout", logoutUser);

export default router;