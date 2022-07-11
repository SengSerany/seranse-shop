const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      Trim: true,
      required: [true, 'You must add an image'],
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', ProductSchema);
