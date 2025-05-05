import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import closeIcon from '../../assets/close.svg';

import './MobileMenu.css';

function MobileMenu({
  onClose, isDark, onLogout, isLoggedIn, currentUser,
}) {
  return (
    <div className="mobile-menu">
      <div className="mobile-menu__header">
        <Link
          to="/"
          className="header__logo mobile-menu__link-white"
          onClick={onClose}
        >
          NewsExplorer
        </Link>
        <button className="header__menu-button" onClick={onClose}>
          <img src={closeIcon} alt="Close menu" className="header__menu-icon" />
        </button>
      </div>
      <div className="mobile-menu__content">
        <Navigation
          isDark={isDark}
          onLogout={onLogout}
          isLoggedIn={isLoggedIn}
          userName={currentUser?.name}
          isMenuOpen={true}
          toggleMenu={onClose}
        />
      </div>
    </div>
  );
}

export default MobileMenu;
