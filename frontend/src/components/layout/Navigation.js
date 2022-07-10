import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

function Navigation() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const switchNavState = () => {
    setMenuIsOpen(!menuIsOpen);
  };
  return (
    <div>
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
                to="#"
                className="menu-btn uppercase text-white ff-primary fs-700 letter-spacing-1 title-hover-effect"
                onClick={switchNavState}
              >
                à propos
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
                      // dispatch(logoutProductState());
                      // dispatch(logoutCartState());
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
    </div>
  );
}

export default Navigation;
