import { Router } from "express";
import { authorize } from './../middleware/authMiddleware.js';
import rateLimitMiddleware from "../middleware/rateLimitMiddleware.js";
import { userDetails } from "../controller/userController.js";

const router = Router();

// # Region Common User CRUD

// Get User Details
router.get("/details", authorize, rateLimitMiddleware({ keyType: "user" }), userDetails);

// Update by User - ID
router.put("/update/:id", (req, res) => {res.send("User Update Route")});

// Delete by User - ID
router.delete("/delete/:id", (req, res) => {res.send("Delete User by ID")});

// # End of Region Common User CRUD

// # Wallet Region

// Get small Information about User's available Wallets
router.get("wallets", (req, res) => {res.send("Get User Wallets")});

// Get detailed Information about the User's wallet by their ID
router.get("/wallet/:id/details", (req, res) => {res.send("Get User's Wallet Details")});

// # End of Wallet Region

export default router;