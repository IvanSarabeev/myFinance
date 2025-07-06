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
router.post('/add', authorize, rateLimitMiddleware({ keyType: 'user' }), addExpense);

/**
 * @access Private
 * @route GET /api/v1/expense/get-all
 * @summary Get all expense entries for the authenticated user
 * @description Retrieve a list of all expense entries for the authenticated user
*/
router.get('/get-all', authorize, rateLimitMiddleware({ keyType: 'user' }), getAllExpenses);

/**
 * @access Private
 * @route GET /api/v1/expense/download-report
 * @summary Download expense report for the authenticated user
 * @description Download expense report in CSV format
 */
router.get('/download-report', authorize, rateLimitMiddleware({ keyType: 'user' }), downloadExpenseReport);

/**
 * @route DELETE /api/v1/expense/:id
 * @summary Delete an expense entry by ID for the authenticated user
 * @description Delete an expense entry by ID
 */
router.delete('/:id', authorize, rateLimitMiddleware({ keyType: 'user' }), deleteExpense);


export default router;