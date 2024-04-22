import express from "express";
import { isAdmin, isLoggedIn } from "../middleware/auth.js";
import { createRating } from "../controllers/rating.js";

export const router = express.Router();

router.post("/create", isLoggedIn, createRating);


export default router;