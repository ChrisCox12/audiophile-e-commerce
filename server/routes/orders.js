import express from 'express';
import { getAllOrders, getOrderById, getTotalOrders, getTotalSales, createOrder, editOrder, getLatestOrders, getPastYearOrders, editDeliveryStatus } from '../controllers/orders.js';
import { validateToken } from '../middleware/validateToken.js';


const router = express.Router();

router.get('/', validateToken, getAllOrders);
router.get('/id/:id', validateToken, getOrderById);
router.get('/totalOrders', validateToken, getTotalOrders);
router.get('/totalSales', validateToken, getTotalSales);
router.get('/latestOrders', validateToken, getLatestOrders);
router.get('/pastYear', validateToken, getPastYearOrders);

router.post('/', createOrder);

router.patch('/:id', validateToken, editOrder);
router.patch('/delivery/:id', validateToken, editDeliveryStatus);


export default router;