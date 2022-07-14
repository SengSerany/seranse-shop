const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    products: [
      {
        productID: {
          type: [mongoose.Schema.Types.ObjectId],
          required: true,
          ref: 'Products',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    adressID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Adress',
    },
    state: {
      type: String,
      default: 'En attente',
    },
    finishAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', OrderSchema);
