// Index
const indexProducts = (req, res) => {
  res.status(200).json({ entre_point: 'Index products' });
};

// Show
const showProduct = (req, res) => {
  res.status(200).json({ entre_point: 'Show product' });
};

// New
const newProduct = (req, res) => {
  res.status(200).json({ entre_point: 'New product' });
};

// Create
const createProduct = (req, res) => {
  res.status(200).json({ entre_point: 'Create product' });
};

// Edit
const editProduct = (req, res) => {
  res.status(200).json({ entre_point: 'Edit product' });
};

// Update
const updateProduct = (req, res) => {
  res.status(200).json({ entre_point: 'Update product' });
};

// Delete
const deleteProduct = (req, res) => {
  res.status(200).json({ entre_point: 'Delete product' });
};

module.exports = {
  indexProducts,
  showProduct,
  newProduct,
  createProduct,
  editProduct,
  updateProduct,
  deleteProduct,
};
