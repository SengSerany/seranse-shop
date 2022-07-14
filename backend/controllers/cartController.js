const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const ProductInCart = require('../models/productInCartModel');

const getCart = asyncHandler(async (req, res) => {
  const currentCart = await Cart.findOne({ user: req.user.id });
  const currentSelectedProds = await ProductInCart.find({
    cart: currentCart._id,
  });
  res.status(200).json({ cart: currentCart._id, data: currentSelectedProds });
});

module.exports = {
  getCart,
};
