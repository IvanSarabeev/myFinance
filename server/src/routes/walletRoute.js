import { Router } from 'express';

import {addWallet, deleteWallet, getWallets} from '../controller/walletController.js';
import { authorize } from './../middleware/authMiddleware.js';
import { validateWalletCreate, validateRequest, validateWalletDelete } from './../middleware/walletMiddleware.js';

const router = Router();

router.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, must-revalidate");

    next();
});

// Get User Wallet's
router.post("/list", authorize, getWallets);

// Get All Wallets
// router.get("/all/user/:walledId", (req, res) => {res.send("All Wallets")});

// Share Wallet
router.post("/share", (req, res) => {res.send("Share Walled")});

// Get Wallet by ID
// router.get("/user/:id", (req, res) => {res.send("Wallet by ID")});

// Create a new Wallet
router.post("/create", authorize, validateWalletCreate, validateRequest, addWallet);

// Update Wallet
router.put("/update", (req, res) => {res.send("Update Wallet")});

// Delete Wallet
router.delete("/delete", authorize, validateWalletDelete, validateRequest, deleteWallet);

export default router;