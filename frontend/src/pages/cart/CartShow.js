import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCartCard from '../../components/product/ProductCartCard';

function CartShow() {
  const { productsInCart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);

  const [cartTotal, setCartTotal] = useState(0);
  const calcCartTotal = () => {
    let total = 0;
    productsInCart.forEach((linkProduct) => {
      const currentProduct = products.find(
        (product) => product._id === linkProduct.productID
      );
      total += currentProduct.price * linkProduct.quantity;
    });
    setCartTotal(total);
  };

  const createProductButtonStyle1 = {
    '--btn-width': '16rem',
    margin: 'auto 0.1rem',
  };

  useEffect(
    () => {
      if (productsInCart.length > 0) {
        calcCartTotal();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productsInCart]
  );

  return (
    <div>
      <h1 className="h1-title uppercase ff-primary fs-700 text-center">
        Mon panier
      </h1>
      <div className="cart-show">
        <section className="cart-section cart-index_product_in_cart">
          {productsInCart && productsInCart.length > 0 && (
            <h2 className="uppercase ff-primary fs-600">
              Produits selectionnés
            </h2>
          )}
          {productsInCart ? (
            productsInCart.length > 0 ? (
              productsInCart.map((linkProduct) => {
                const currentProduct = products.find(
                  (product) => product._id === linkProduct.productID
                );
                return (
                  <ProductCartCard
                    key={currentProduct._id}
                    link={linkProduct}
                    product={currentProduct}
                    quantity={linkProduct.quantity}
                  />
                );
              })
            ) : (
              <p className="text-center">Votre panier est vide</p>
            )
          ) : null}
        </section>
        {productsInCart && productsInCart.length > 0 && (
          <>
            <section className="cart-section cart-total">
              <h2 className="uppercase ff-primary fs-600">Total:</h2>
              <h5 className="ff-primary fs-500">{cartTotal} €</h5>
            </section>

            <div className="flex justify-content-center">
              <button
                className="button-type bg-strong_blue text-white uppercase ff-sans_cond fs-200 letter-spacing-3 text-center"
                style={createProductButtonStyle1}
              >
                Commander
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartShow;
