import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="header__logo">NewsExplorer</Link>
        <Navigation />
      </div>

      <div className="header__hero">
        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm />
      </div>
    </header>
  );
}

export default Header;
