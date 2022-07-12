const express = require('express');
const productInCartRouter = express.Router();
const {
  changeProductInCart,
} = require('../controllers/productInCartController');

productInCartRouter.post('/update', changeProductInCart);

module.exports = productInCartRouter;
