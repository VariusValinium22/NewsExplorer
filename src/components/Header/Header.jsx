import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <h2 href="/" className="header__logo">NewsExplorer</h2>
        <Navigation />
      </div>

      <div className="header__hero">
        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <SearchForm />
      </div>
    </header>
  );
}

export default Header;
