import express from "express";
import {
    addIncome,
    getAllIncomes,
    deleteIncome,
    downloadIncomeReport
} from '../controller/incomeController.js';
import { authorize } from './../middleware/authMiddleware.js';
import rateLimitMiddleware from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

/**
 * @access Private
 * @route POST /api/v1/income/add
 * @summary Add a new income entry for the authenticated user
 * @description Add a new income entry with rate limiting (5 requests per minute)
*/
router.post('/add', authorize, rateLimitMiddleware({ keyType: 'user', maxAttempts: 15 }), addIncome);

/**
 * @access Private
 * @route GET /api/v1/income/list
 * @summary Get all income entries for the authenticated user
 * @description Retrieve a list of all income entries for the authenticated user
*/
router.get('/list', authorize, getAllIncomes);

/**
 * @access Private
 * @route POST /api/v1/income/download-report
 * @summary Download income report for the authenticated user
 * @description Download income report in CSV format
 */
router.post('/download-report', authorize, rateLimitMiddleware({ keyType: 'user' }), downloadIncomeReport);

/**
 * @route DELETE /api/v1/income/:id
 * @summary Delete an income entry by ID for the authenticated user
 * @description Delete an income entry by ID
 */
router.delete('/:id', authorize, rateLimitMiddleware({ keyType: 'user', maxAttempts: 5 }), deleteIncome);


export default router;