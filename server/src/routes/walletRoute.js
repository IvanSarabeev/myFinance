import { Router } from 'express';

import { addWallet, deleteWallet, getWallets } from '../controller/walletController.js';
import { authorize } from './../middleware/authMiddleware.js';
import { validateWalletCreate, validateRequest, validateWalletDelete } from './../middleware/walletMiddleware.js';
import rateLimitMiddleware from "../middleware/rateLimitMiddleware.js";

const router = Router();

router.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, must-revalidate");

    next();
});

/**
 * @route POST /api/v1/wallet/list
 * @summary Get all wallets for the authenticated user
 * @description Retrieve a list of wallet objects
 * @description Retrieve a list of wallet objects with rate limiting (5 requests per minute)
 * @access Private
 *
 * @returns {Object} 200 - An array of wallet objects
 * @returns {Object} 401 - Unauthorized access
 * @returns {Object} 429 - Too many requests
 * @returns {Object} 500 - Internal server error
 */
router.post("/list", authorize, rateLimitMiddleware({ keyType: "user" }), getWallets);

// Get All Wallets
// router.get("/all/user/:walledId", (req, res) => {res.send("All Wallets")});

// Share Wallet
router.post("/share", (req, res) => {res.send("Share Walled")});

// Get Wallet by ID
// router.get("/user/:id", (req, res) => {res.send("Wallet by ID")});

/**
 * @route POST /api/v1/wallet/create
 * @summary Create a new wallet for the authenticated user
 * @description Create a new wallet object
 * @description Create a wallet object with rate limiting (5 requests per minute)
 * @access Private
 *
 * @returns {Object} 201 - Created
 * @returns {Object} 400 - Bad request
 * @returns {Object} 401 - Unauthorized access
 * @returns {Object} 406 - Not acceptable
 * @returns {Object} 429 - Too many requests
 * @returns {Object} 500 - Internal server error
 */
router.post("/create", authorize, rateLimitMiddleware({ keyType: "user" }), validateWalletCreate, validateRequest, addWallet);

// Update Wallet
router.put("/update", (req, res) => {res.send("Update Wallet")});

/**
 * @route DELETE /api/v1/wallet/delete
 * @summary Delete a wallet for the authenticated user
 * @description Delete a wallet object with rate limiting (5 requests per minute)
 * @access Private
 *
 * @returns {Object} 204 - No content
 * @returns {Object} 401 - Unauthorized access
 * @returns {Object} 404 - Not found
 * @returns {Object} 429 - Too many requests
 * @returns {Object} 500 - Internal server error
 */
router.delete("/delete", authorize, rateLimitMiddleware({ keyType: "user" }),  validateWalletDelete, validateRequest, deleteWallet);

export default router;