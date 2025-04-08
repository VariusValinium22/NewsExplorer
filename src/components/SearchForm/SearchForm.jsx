// src/components/SearchForm/SearchForm.jsx

import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return; // prevent empty search
    console.log(`Searching for: ${query}`);
    onSearch(query); // pass query up to App.jsx
  };

  return (
    <section className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-form__input"
          placeholder="Search for news..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
