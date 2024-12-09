import express from 'express';
import { securityValidation, validateUserRegistration } from '../middleware/authMiddleware.js';
import { logoutUser, registerUser } from '../controller/securityController.js';

const router = express.Router();

const SecurityHeaders = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for specific origins in production
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.status(204).end(); // Preflight success with no content
      } else {
        next();
      }
};

router.use(SecurityHeaders);
router.post("/register", validateUserRegistration(), securityValidation, registerUser);
router.post("/logout", logoutUser);

export default router;