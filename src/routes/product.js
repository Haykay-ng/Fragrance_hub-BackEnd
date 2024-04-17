import express from 'express';
import { createProduct, deleteProduct, getAllProduct, getBySlug, getProductById, processPayment, relatedProduct, searchProduct, updateProduct} from '../controllers/product.js';
import { upload } from '../helper/multer.js';
import { isLoggedIn } from '../middleware/auth.js';
// import { deleteOrder, getAllOrders, getOrderById, orderStatus } from '../controllers/order.js';

const router = express.Router();

router.post('/create', upload.array('images', 5), createProduct);
router.get('/all',  getAllProduct);
router.get('/:productId',  getProductById);
router.put("/update/:productId", upload.array('images', 5), updateProduct)
router.delete("/:productId", deleteProduct)
router.post("/search", searchProduct)
router.get("/related/:productId", relatedProduct)
router.get("/slug/:slug", getBySlug)
// router.post("/user/role",   updateUserRole)


 /// payment
router.post("/payment",isLoggedIn, processPayment)


/// Order 
// router.put("/order-status/:orderId", orderStatus)
// router.get('/all',  getAllOrders);
// router.get('/:orderId',  getOrderById);
// router.delete("/:orderId", deleteOrder)


export default router;