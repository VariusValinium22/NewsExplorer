// SearchForm.jsx
import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm() {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., fetch news with the query
    console.log(`Searching for: ${query}`);
  };

  return (
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
  );
}

export default SearchForm;
