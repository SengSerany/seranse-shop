const express = require('express');
const productRouter = express.Router();
const { adminHandler } = require('../middleware/adminMiddleware');
const {
  indexProducts,
  showProduct,
  newProduct,
  createProduct,
  editProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

productRouter.get('/', indexProducts);
productRouter.get('/new', adminHandler, newProduct);
productRouter.post('/new', adminHandler, createProduct);
productRouter.get('/:id/edit', adminHandler, editProduct);
productRouter.patch('/:id/edit', adminHandler, updateProduct);
productRouter.delete('/:id', adminHandler, deleteProduct);
productRouter.get('/:id', showProduct);

module.exports = productRouter;
