import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header() {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        <Navigation isLoggedIn={isLoggedIn} userName={currentUser?.name} />
      </div>
    </header>
  );
}

export default Header;
