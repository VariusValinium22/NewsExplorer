import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useModal } from "../../contexts/ModalContext";

import logoutBlack from "../../assets/logout-black.svg";
import logoutWhite from "../../assets/logout-white.svg";

function Navigation({ isDark, onLogout }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const { openModal } = useModal();
  return (
    <nav className={`nav ${isDark ? "nav-dark" : ""}`}>
      <NavLink to="/" className={getLinkClass}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/saved-news"
          className={({ isActive }) =>
            `nav__link ${isActive ? "nav__link_active" : ""}`
          }
        >
          Saved articles
        </NavLink>
      )}
      {isLoggedIn ? (
        <button className="nav__button nav__button-user" onClick={onLogout} >
          {currentUser?.name}
          <img
            src={isDark ? logoutBlack : logoutWhite}
            alt="log out"
            className="header__logout-icon"
          />
        </button>
      ) : (
        <button className="nav__button" onClick={() => openModal("login")}>
          Sign in
        </button>
      )}
    </nav>
  );
}

const getLinkClass = ({ isActive }) =>
  "nav__link" + (isActive ? " nav__link_active" : "");

export default Navigation;
