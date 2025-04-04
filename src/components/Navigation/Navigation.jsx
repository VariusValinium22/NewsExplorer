import React from 'react';
import './Navigation.css';

function Navigation({ isLoggedIn, userName }) {
  return (
    <nav className="nav">
      <a href="/" className="nav__link">Home</a>
      <a href="/saved-news" className="nav__link">Saved articles</a>
      {isLoggedIn ? (
        <button className="nav__button nav__button--user">{userName}</button>
      ) : (
        <button className="nav__button">Sign in</button>
      )}
    </nav>
  );
}

export default Navigation;
