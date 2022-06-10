import express from 'express';
import { getAllOrders, getTotalOrders, getTotalSales, createOrder, editOrder, getLatestOrders, getPastYearOrders } from '../controllers/orders.js';


const router = express.Router();

router.get('/', getAllOrders);
router.get('/totalOrders', getTotalOrders);
router.get('/totalSales', getTotalSales);
router.get('/latestOrders', getLatestOrders);
router.get('/pastYear', getPastYearOrders);

router.post('/', createOrder);

router.patch('/:id', editOrder);


export default router;