import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useModal } from "../../contexts/ModalContext";

function Navigation() {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const { openModal } = useModal();
  return (
    <nav className="nav">
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
        <button className="nav__button nav__button--user">
          {currentUser?.name}
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
