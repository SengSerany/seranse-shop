const asyncHandler = require('express-async-handler');

// Index
const indexProducts = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'Index products' });
});

// Show
const showProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'Show product' });
});

// New
const newProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'New product' });
});

// Create
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    res.status(400).json({ error: 'Please provide all fields' });
  }
  res.status(200).json({ entre_point: 'Create product' });
});

// Edit
const editProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'Edit product' });
});

// Update
const updateProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'Update product' });
});

// Delete
const deleteProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ entre_point: 'Delete product' });
});

module.exports = {
  indexProducts,
  showProduct,
  newProduct,
  createProduct,
  editProduct,
  updateProduct,
  deleteProduct,
};
