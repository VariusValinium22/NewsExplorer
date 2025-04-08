import React from "react";
import "./Hero.css";
import SearchForm from "../SearchForm/SearchForm";

function Hero({ onSearch }) {
  return (
    <section className="hero">
      <h1 className="hero__title">What's going on in the world?</h1>
      <p className="hero__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm onSearch={onSearch} />
    </section>
  );
}
export default Hero;
