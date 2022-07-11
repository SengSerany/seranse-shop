const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { cloudinary } = require('../config/cloudinary');

// Index
const indexProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    end_point: 'Index products',
    success: true,
    data: products,
  });
});

// Show
const showProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    end_point: 'Show product',
    success: true,
    data: product,
  });
});

// New
const newProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ end_point: 'New product' });
});

// Create
const createProduct = asyncHandler(async (req, res) => {
  const { productName, price, description, image } = req.body;

  /* This is a validation to check if the user has provided all the fields. */
  if (!productName || !price || !description || !image) {
    res
      .status(400)
      .json({ error: 'Please provide all fields', data: req.body });
  }

  /* This is uploading the image to cloudinary. */
  const uploadResponse = await cloudinary.uploader.upload(image, {
    upload_preset: 'seranse-shop_products',
  });

  /* Creating a new product with the information provided by the user. */
  const product = await Product.create({
    image: uploadResponse.url,
    productName,
    price,
    description,
  });

  res.status(201).json({
    end_point: 'Create product',
    success: true,
    data: product,
  });
});

// Edit
const editProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ end_point: 'Edit product' });
});

// Update
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { productName, price, description, image } = req.body;

  /* This is a validation to check if the product exists. */
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  }

  /* This is checking if the image is already uploaded to cloudinary. If it is, it will not upload it
again. */
  let uploadResponse;
  if (!image.startsWith('http')) {
    uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: 'seranse-shop_products',
    });
  }

  /* Updating the product with the new information provided by the user. */
  const updatedProduct = await Product.findByIdAndUpdate(
    product._id,
    {
      image: uploadResponse ? uploadResponse.url : image,
      productName,
      price,
      description,
    },
    { new: true }
  );

  res.status(200).json({
    end_point: 'Edit product',
    success: true,
    data: updatedProduct,
  });
});

// Delete
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.remove();
  res.status(200).json({
    end_point: 'Delete product',
    success: true,
    data: product,
  });
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
