import express from "express";
import {
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseReport
} from '../controller/expenseController.js';
import { authorize } from './../middleware/authMiddleware.js';
import rateLimitMiddleware from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

/**
 * @access Private
 * @route POST /api/v1/expense/add
 * @summary Add a new expense entry for the authenticated user
 * @description Add a new expense entry with rate limiting (5 requests per minute)
*/
router.post('/add', authorize, rateLimitMiddleware({ keyType: 'user', maxAttempts: 15 }), addExpense);

/**
 * @access Private
 * @route GET /api/v1/expense/list
 * @summary Get all expense entries for the authenticated user
 * @description Retrieve a list of all expense entries for the authenticated user
*/
router.get('/list', authorize, rateLimitMiddleware({ keyType: 'user', maxAttempts: 20 }), getAllExpenses);

/**
 * @access Private
 * @route POST /api/v1/expense/download-report
 * @summary Download expense report for the authenticated user
 * @description Download expense report in CSV format
 */
router.post('/download-report', authorize, rateLimitMiddleware({ keyType: 'user' }), downloadExpenseReport);

/**
 * @route DELETE /api/v1/expense/:id
 * @summary Delete an expense entry by ID for the authenticated user
 * @description Delete an expense entry by ID
 */
router.delete('/:id', authorize, rateLimitMiddleware({ keyType: 'user', maxAttempts: 5 }), deleteExpense);


export default router;