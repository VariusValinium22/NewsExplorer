import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ isDark, onLogout }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  return (
    <header className={`header ${isDark ? "header-dark" : ""}`}>
      <div className="header__top">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          userName={currentUser?.name}
          isDark={isDark}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}

export default Header;
