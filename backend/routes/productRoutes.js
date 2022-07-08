const express = require('express');
const productRouter = express.Router();
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
productRouter.get('/new', newProduct);
productRouter.post('/new', createProduct);
productRouter.get('/:id/edit', editProduct);
productRouter.patch('/:id/edit', updateProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.get('/:id', showProduct);

module.exports = productRouter;
