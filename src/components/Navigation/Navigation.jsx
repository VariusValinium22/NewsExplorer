import { useContext } from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useModal } from '../../contexts/ModalContext.jsx';

import logoutBlack from '../../assets/logout-black.svg';
import logoutWhite from '../../assets/logout-white.svg';

function Navigation({
  isDark, onLogout, isMenuOpen, toggleMenu,
}) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const { openModal } = useModal();

  const handleNavClick = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };
  const getLinkClass = ({ isActive }) => `nav__link${isActive ? ' nav__link_active' : ''}`;

  return (
    <nav
      className={`nav ${isDark ? 'nav-dark' : ''} 
                      ${isMenuOpen ? 'nav_open' : ''}`}
    >
      <NavLink to="/" className={getLinkClass} onClick={handleNavClick}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/saved-news"
          className={({ isActive }) => `nav__link ${isActive ? 'nav__link_active' : ''}`
          }
          onClick={handleNavClick}
        >
          Saved articles
        </NavLink>
      )}
      {isLoggedIn ? (
        <button
          className="nav__button nav__button-user"
          onClick={() => {
            onLogout();
            handleNavClick();
          }}
        >
          {currentUser?.name}
          <img
            src={isDark ? logoutBlack : logoutWhite}
            alt="log out"
            className="header__logout-icon"
          />
        </button>
      ) : (
        <button
          className="nav__button"
          onClick={() => {
            openModal('login');
            handleNavClick();
          }}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
