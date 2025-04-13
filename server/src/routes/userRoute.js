import { Router } from "express";
import { authorize } from './../middleware/authMiddleware.js';

const router = Router();

// # Region Common User CRUD

// Get User Details
router.get("/details", authorize);

// Update by User - ID
router.put("/update/:id", (req, res) => {res.send("User Update Route")});

// Delete by User - ID
router.delete("/delete/:id", (req, res) => {res.send("Delete User by ID")});

// # End of Region Common User CRUD

// # Wallet Region

// Get small Information about User's available Wallets
router.get("wallets", (req, res) => {res.send("Get User Wallets")});

// Get detailed Information about User's wallet by ID
router.get("/wallet/:id/details", (req, res) => {res.send("Get User's Wallet Details")});

// # End of Wallet Region

export default router;