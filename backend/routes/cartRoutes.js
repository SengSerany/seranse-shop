const express = require('express');
const cartRouter = express.Router();
const { authHandler } = require('../middleware/authMiddleware');
const { getCart } = require('../controllers/cartController');

cartRouter.get('/', authHandler, getCart);

module.exports = cartRouter;
