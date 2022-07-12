import { useSelector } from 'react-redux';
import ProductCartCard from '../../components/product/ProductCartCard';

function CartShow() {
  const { productsInCart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);

  return (
    <div>
      <h1 className="uppercase ff-primary fs-700 text-center">Mon panier</h1>
      <div className="row">
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
      </div>
    </div>
  );
}

export default CartShow;
