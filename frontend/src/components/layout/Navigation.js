import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
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
                to="#"
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
              <Link
                to="/login"
                className="menu-btn uppercase text-white ff-primary fs-700 letter-spacing-1 title-hover-effect"
                onClick={switchNavState}
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="menu-btn uppercase text-white ff-primary fs-700 letter-spacing-1 title-hover-effect"
                onClick={switchNavState}
              >
                S'inscrire
              </Link>
            </nav>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
