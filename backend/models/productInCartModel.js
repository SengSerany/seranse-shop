const mongoose = require('mongoose');

const ProductInCartSchema = new mongoose.Schema(
  {
    cartID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Cart',
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProductInCart', ProductInCartSchema);
