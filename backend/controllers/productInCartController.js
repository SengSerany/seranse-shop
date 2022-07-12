const asyncHandler = require('express-async-handler');
const ProductInCart = require('../models/productInCartModel');

const changeProductInCart = asyncHandler(async (req, res) => {
  const { cartID, productID, quantity } = req.body;
  const productInCartExist = await ProductInCart.findOne({ cartID, productID });

  /* Check if the product is already in the cart
    if it is,
        if the quantity is 0 then it's remove
        if the quantity is > 1 then it's update his quantity, 
    if no, it's create the product in the cart with his quantity */
  if (productInCartExist) {
    let updatedProductInCart;
    if (quantity === 0) {
      updatedProductInCart = productInCartExist;
      updatedProductInCart.quantity = 0;
      await ProductInCart.findByIdAndDelete(productInCartExist._id);
    } else {
      updatedProductInCart = await ProductInCart.findByIdAndUpdate(
        productInCartExist._id,
        { quantity },
        { new: true }
      );
    }
    res.status(200).json({
      end_point: 'Change products in cart',
      success: true,
      data: updatedProductInCart,
    });
  } else {
    const newProductInCart = await ProductInCart.create({
      cartID,
      productID,
      quantity,
    });

    res.status(200).json({
      end_point: 'Change products in cart',
      success: true,
      data: newProductInCart,
    });
  }
});

module.exports = {
  changeProductInCart,
};
