import express from 'express';
import { getAllProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, getProductsByCategory, getTotalProducts } from '../controllers/products.js';
import { validateToken } from '../middleware/validateToken.js';

const router = express.Router();


router.get('/', getAllProducts);
router.get('/product/:slug', getProductBySlug);
router.get('/category/:category', getProductsByCategory);
router.get('/total', getTotalProducts);

router.post('/', validateToken, createProduct);

router.patch('/:id', validateToken, updateProduct);

router.delete('/:id', validateToken, deleteProduct);


export default router;