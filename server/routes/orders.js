import express from 'express';
import { getAllOrders, createOrder, editOrder } from '../controllers/orders.js';


const router = express.Router();

router.get('/', getAllOrders);

router.post('/', createOrder);

router.patch('/:id', editOrder);


export default router;