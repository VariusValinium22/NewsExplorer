import React from 'react';
import './Navigation.css';
import { Link } from "react-router-dom";

function Navigation({ isLoggedIn, userName }) {
  return (
    <nav className="nav">
      <Link to="/" className="nav__link">Home</Link>
      <Link to="/saved-news" className="nav__link">Saved articles</Link>
      {isLoggedIn ? (
        <button className="nav__button nav__button--user">{userName}</button>
      ) : (
        <button className="nav__button">Sign in</button>
      )}
    </nav>
  );
}

export default Navigation;
