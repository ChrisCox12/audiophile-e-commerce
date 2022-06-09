import express from 'express';
import { getAllProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, getProductsByCategory, getTotalProducts } from '../controllers/products.js';

const router = express.Router();


router.get('/' , getAllProducts);
router.get('/product/:slug', getProductBySlug);
router.get('/category/:category', getProductsByCategory);
router.get('/total', getTotalProducts);

router.post('/', createProduct);

router.patch('/:id', updateProduct);

router.delete('/:id', deleteProduct);


export default router;