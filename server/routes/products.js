import express from 'express';
import { getAllProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, getProductsByCategory } from '../controllers/products.js';

const router = express.Router();


router.get('/' , getAllProducts);
router.get('/:slug', getProductBySlug);
router.get('/category/:category', getProductsByCategory);

router.post('/', createProduct);

router.patch('/:id', updateProduct);

router.delete('/:id', deleteProduct);


export default router;