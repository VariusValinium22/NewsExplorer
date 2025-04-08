import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Navigation() {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  return (
    <nav className="nav">
      <NavLink to="/" className={getLinkClass}>
        Home
      </NavLink>
      <NavLink to="/saved-news" className={getLinkClass}>
        Saved articles
      </NavLink>
      {isLoggedIn ? (
        <button className="nav__button nav__button--user">
          {currentUser?.name}
        </button>
      ) : (
        <button className="nav__button">Sign in</button>
      )}
    </nav>
  );
}

const getLinkClass = ({ isActive }) =>
  "nav__link" + (isActive ? " nav__link_active" : "");

export default Navigation;
