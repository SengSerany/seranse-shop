const express = require('express');
const orderRouter = express.Router();
const { authHandler } = require('../middleware/authMiddleware');
const { adminHandler } = require('../middleware/adminMiddleware');
const {
  getAllOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orderController');

orderRouter.get('/', adminHandler, getAllOrders);
orderRouter.post('/create', authHandler, createOrder);
orderRouter.patch('/update', adminHandler, updateOrder);

module.exports = orderRouter;
