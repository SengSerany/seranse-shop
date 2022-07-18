const asyncHandler = require('express-async-handler');
const Adress = require('../models/adressModel');
const Order = require('../models/orderModel');
const ProductInCart = require('../models/productInCartModel');
const Cart = require('../models/cartModel');

// Index Orders
const getAllOrders = asyncHandler(async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    throw new Error('Not authorized');
  }
  const orders = await Order.find({ user: req.user.id });
  const adresses = await Adress.find({ user: req.user.id });

  res.status(200).json({ orders, adresses });
});

// Create an order
const createOrder = asyncHandler(async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const { clientName, adress, products, total } = req.body;
  let newAdress;

  /* Checking if the adress already exists in the database. If it does not exist, it creates a new
  adress. */
  const selectedAdress = await Adress.findOne({
    adressName: adress.adressName,
    user: adress.user,
  });
  if (!selectedAdress) {
    newAdress = await Adress.create({ ...adress, user: req.user.id });
  }

  // Create new order
  const newOrder = await Order.create({
    user: req.user.id,
    clientName: clientName,
    adressID: newAdress ? newAdress._id : selectedAdress._id,
    products,
    total,
  });

  // Delete product in cart
  const userCart = await Cart.findOne({ user: req.user.id });
  products.map(async (productObject) => {
    const productInCart = await ProductInCart.findOne({
      cartID: userCart._id,
      productID: productObject.productID,
    });
    productInCart && (await productInCart.remove());
  });

  // Response
  res
    .status(200)
    .json({ order: newOrder, adress: newAdress ? newAdress : selectedAdress });
});

// Update an order
const updateOrder = asyncHandler(async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  let order;

  const { orderID, state } = req.body;
  if (state === 'Livré') {
    order = await Order.findByIdAndUpdate(
      orderID,
      { state, finishAt: new Date() },
      { new: true }
    );
  } else {
    order = await Order.findByIdAndUpdate(orderID, { state }, { new: true });
  }
  res.status(200).json(order);
});

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
};
