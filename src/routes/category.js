import express from 'express';
import { createCategory } from '../controllers/category.js';
import { isAdmin, isLoggedIn } from '../middleware/auth.js';


const router = express.Router();

router.post('/create',isLoggedIn,isAdmin, createCategory);


export default router;