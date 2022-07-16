import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { logoutCartState } from '../../features/cart/cartSlice';
import { CgShoppingCart } from 'react-icons/cg';
import { BsFillInboxesFill } from 'react-icons/bs';

function Navigation() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productsInCart } = useSelector((state) => state.cart);
  const { orders } = useSelector((state) => state.order);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(0);

  const calculateCartQuantity = () => {
    let cartQuantity = 0;
    if (productsInCart) {
      productsInCart.forEach((product) => {
        cartQuantity += product.quantity;
      });
    }
    setCartQuantity(cartQuantity);
  };

  const calculateOrderQuantity = () => {
    let orderQuantity = 0;
    if (orders) {
      orders.forEach((order) => {
        if (order.state !== 'Livré') {
          orderQuantity += 1;
        }
      });
    }
    setOrderQuantity(orderQuantity);
  };

  const switchNavState = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(
    () => {
      calculateCartQuantity();
      calculateOrderQuantity();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productsInCart, orders]
  );

  return (
    <div className="flex-column">
      <div id="menu">
        <nav className="flex-column title-state-indicator">
          <i
            className="fa-solid fa-bars text-center title-hover-effect"
            onClick={switchNavState}
          ></i>

          <div
            id="nav-menu"
            className={
              menuIsOpen
                ? `flex-column overlay bg-strong_blue menu-open`
                : `flex-column overlay bg-strong_blue menu-close`
            }
          >
            <button
              type="button"
              className="menu-btn menu-closebtn uppercase text-white ff-primary fs-800 letter-spacing-2 title-hover-effect"
              onClick={switchNavState}
            >
              &times;
            </button>
            <nav className="overlay-content">
              <Link
                to="/"
                className="menu-btn uppercase text-white ff-primary fs-700 letter-spacing-1 title-hover-effect"
                onClick={switchNavState}
              >
                Acceuil
              </Link>
              <Link
                to="/about"
                className="menu-btn uppercase text-white ff-primary fs-700 letter-spacing-1 title-hover-effect"
                onClick={switchNavState}
              >
                à propos du shop
              </Link>
              {user.id !== null ? (
                <>
                  <Link
                    to="/profile"
                    className="menu-btn uppercase text-white ff-primary fs-700 letter-spacing-1 title-hover-effect"
                    onClick={switchNavState}
                  >
                    Mon compte
                  </Link>
                  <button
                    className="menu-btn btn-logout uppercase text-white ff-primary fs-700 letter-spacing-1 title-hover-effect"
                    onClick={() => {
                      dispatch(logout());
                      dispatch(logoutCartState());
                      // dispatch(logoutOrderState());
                      switchNavState();
                    }}
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="menu-btn uppercase text-white ff-primary fs-700 letter-spacing-1 title-hover-effect"
                  onClick={switchNavState}
                >
                  Se connecter / S'inscrire
                </Link>
              )}
            </nav>
          </div>
        </nav>
      </div>
      {location.pathname !== '/cart' && user.id !== null ? (
        <div className="subheader">
          <Link to="/cart" className="flex subheader-logo">
            <CgShoppingCart />
            <span className="circle circle1 ff-primary fs-200 fw-semi_bold">
              {cartQuantity}
            </span>
          </Link>
          <Link to="/admin/orders" className="flex subheader-logo sublogo-2">
            <BsFillInboxesFill />
          </Link>
          <span className="circle circle2 ff-primary fs-200 fw-semi_bold">
            {orderQuantity}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default Navigation;
