import express from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/auth.js';
import { upload } from '../helper/multer.js';
import { deleteUser, getAllUsers,getOneUser, updateUser } from '../controllers/user.js';
import { isLoggedIn } from '../middleware/auth.js';

const router = express.Router();

// routes
router.post('/register', upload.single('image'), register)
router.post('/login', login)
router.get("/user", getAllUsers)
router.get("/user/:userId",getOneUser)
router.put("/user/update",isLoggedIn,upload.single('image'), updateUser)
router.delete("/user/:userId",deleteUser)



// forgot password and reset password 
router.post("/forgotPassword", forgotPassword)
router.post("/resetPassword", resetPassword)




export default router