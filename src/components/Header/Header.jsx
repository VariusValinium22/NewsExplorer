import { React, useState, useEffect, useRef, useContext } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import menuIconWhite from "../../assets/menu-white.svg";
import menuIconBlack from "../../assets/menu-black.svg";
import MobileMenu from "../MobileMenu/MobileMenu";

function Header({ isDark, onLogout }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  const isDarkHeader = isSavedNewsPage;
  const isLightTheme = !isSavedNewsPage;
  const menuIcon = isSavedNewsPage ? menuIconBlack : menuIconWhite;
  const wasMenuOpenRef = useRef(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth > 768 && windowWidth <= 768) {
        wasMenuOpenRef.current = isMenuOpen;
        setIsMenuOpen(false);
      }
      if (newWidth <= 768 && windowWidth > 768) {
        if (wasMenuOpenRef.current) {
          setIsMenuOpen(true);
        }
      }
      setWindowWidth(newWidth); 
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, windowWidth]);

  return (
    <header className={`header ${isDarkHeader ? "header-dark" : "header-light"}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        <button
          className="header__menu-button"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <img src={menuIcon} alt="Menu" className="header__menu-icon" />
        </button>
        <Navigation
          isLoggedIn={isLoggedIn}
          userName={currentUser?.name}
          isDark={isDark}
          onLogout={onLogout}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
        {isMenuOpen && (
          <>
            <div className="header__overlay" onClick={toggleMenu}></div>
            <MobileMenu
              onClose={toggleMenu}
              isLightTheme={isLightTheme}
              onLogout={onLogout}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
