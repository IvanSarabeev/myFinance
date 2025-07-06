import express from "express";
import {
    getIncomeDataOverview,
    getExpenseDataOverview
} from '../controller/dashboardController.js';
import { authorize } from './../middleware/authMiddleware.js';
import rateLimitMiddleware from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

/**
 * @access Private
 * @route GET /api/v1/dashboard/income/transactions
 * @summary Display every income transaction that the User have made
 * @description Show the User their transaction history with rate limiting (5 requests per minute)
*/
router.get('/income/transactions', authorize, rateLimitMiddleware({ keyType: 'user' }), getIncomeDataOverview);

/**
 * @access Private
 * @route GET /api/v1/dashboard/expense/transactions
 * @summary Display every expense transaction that the User have made
 * @description Show the User their transaction history with rate limiting (5 requests per minute)
*/
router.get('/expense/transactions', authorize, rateLimitMiddleware({ keyType: 'user' }), getExpenseDataOverview);


export default router;