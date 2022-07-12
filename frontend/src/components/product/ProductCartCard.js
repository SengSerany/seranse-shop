import { useDispatch } from 'react-redux';
import { changeInCart } from '../../features/cart/cartSlice';
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';

function ProductCartCard({ link = null, product = null, quantity = 0 }) {
  const dispatch = useDispatch();
  const add = 'add';
  const remove = 'remove';

  const handleChange = (e, action) => {
    if (link && quantity > 0) {
      let updateLink = { ...link };
      if (action === 'remove') {
        updateLink.quantity = link.quantity - 1;
      }
      if (action === 'add') {
        updateLink.quantity = link.quantity + 1;
      }

      if (updateLink.quantity !== quantity) {
        dispatch(changeInCart(updateLink));
      }
    }
  };

  return (
    <div className="product-cart-card">
      <h5 className="uppercase ff-sans_cond fs-500 letter-spacing-3">
        {product ? product.productName : 'Nom du produit'}
      </h5>
      <div className="product-cart-card_infos">
        <p className="uppercase ff-sans_cond fs-200 letter-spacing-2">
          Quantité:
          <span className="cart-quantity-form">
            <button onClick={(e) => handleChange(e, remove)}>
              <AiFillMinusSquare className="cart-quantity-btn" />
            </button>
            <span className="cart-quantity-number fs-400 fw-semi_bold">
              {quantity}
            </span>
            <button onClick={(e) => handleChange(e, add)}>
              <AiFillPlusSquare className="cart-quantity-btn" />
            </button>
          </span>
        </p>
        <div className="cart-unitary-price">
          <p className="uppercase ff-sans_cond fs-200 letter-spacing-2">
            Prix unitaire:
          </p>
          <p>
            <span className="unitary-price-text fs-400 fw-semi_bold">
              {product ? `${product.price}` : 'XX.XX'}
            </span>
            €
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCartCard;
