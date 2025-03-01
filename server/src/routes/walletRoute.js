import { Router } from 'express';

import { addWallet } from '../controller/walletController.js';
import { authorize } from './../middleware/authMiddleware.js';

const router = Router();

router.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, must-revalidate");

    next();
});

// Get Wallet
router.get("/", (req, res) => {res.send("Wallet Route")});

// Get All Wallets
router.get("/all/user/:walledId", (req, res) => {res.send("All Wallets")});

// Share Wallet
router.post("/share", (req, res) => {res.send("Share Walled")});

// Get Wallet by ID
router.get("/user/:id", (req, res) => {res.send("Wallet by ID")});

// Create new Wallet
router.post("/create", authorize, addWallet);

// Update Wallet
router.put("/update", (req, res) => {res.send("Update Wallet")});

// Delete Wallet
router.delete("/delete", (req, res) => {res.send("Delete Wallet")});

export default router;