import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { changeInCart } from '../../features/cart/cartSlice';
import { deleteProduct } from '../../features/product/productSlice';
import { toast } from 'react-toastify';

function ProductShow() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const { cart, productsInCart } = useSelector((state) => state.cart);
  const currentProduct = products.find((product) => product._id === id);
  const [formData, setFormData] = useState({
    cartID: cart,
    productID: currentProduct._id,
    quantity: 1,
  });

  const createProductButtonStyle1 = {
    '--btn-width': '16rem',
    margin: 'auto 0.1rem',
  };

  const createProductButtonStyle2 = {
    '--btn-width': '16rem',
    '--btn-shadow-clr-custom': 'var(--clr-strong_blue)',
    margin: 'auto 0.1rem',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      productsInCart.find(
        (currentLink) =>
          currentLink.productID === formData.productID &&
          currentLink.cartID === formData.cartID
      )
    ) {
      toast.error(
        'Le produit est déja dans le panier. pour modifier la quantité, rendez-vous dans le panier.'
      );
    } else {
      dispatch(changeInCart(formData));
      toast.success('Le produit a été ajouté au panier');
    }
  };

  return (
    <div className="product-show-page flex-column justify-content-center text-center">
      <h1 className="h1-title uppercase ff-primary fs-700 text-center">
        {currentProduct && currentProduct.productName}
      </h1>
      {user.id !== null && (
        <div className="flex justify-content-center">
          <Link
            to={`/products/${id}/edit`}
            className="button-type bg-strong_blue text-white uppercase ff-sans_cond fs-200 letter-spacing-3 text-center"
            style={createProductButtonStyle1}
          >
            Modifier le produit
          </Link>
          <button
            className="button-type bg-red text-white uppercase ff-sans_cond fs-200 letter-spacing-3 text-center"
            onClick={() => {
              dispatch(deleteProduct(id));
            }}
            style={createProductButtonStyle2}
          >
            Supprimer le produit
          </button>
        </div>
      )}
      <a href={currentProduct ? currentProduct.image : '#'}>
        <img
          src={currentProduct && currentProduct.image}
          alt="product"
          className="product-img-show"
        />
      </a>
      <p>{currentProduct && currentProduct.description}</p>
      <p className="uppercase ff-sans_cond fs-400 fw-semi_bold">
        {currentProduct && currentProduct.price}€
      </p>
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-fields">
          <label htmlFor="quantity" className="ff-primary">
            Quantité
          </label>
          <input
            className="form-control"
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
        </div>
        <button
          className="button-type bg-strong_blue text-white uppercase ff-sans_cond fs-200 letter-spacing-3 text-center"
          style={createProductButtonStyle1}
        >
          Ajouter à mon panier
        </button>
      </form>
    </div>
  );
}

export default ProductShow;
