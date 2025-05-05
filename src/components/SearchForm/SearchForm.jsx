import './SearchForm.css';

function SearchForm({
  onSearch, isLoading, query, setQuery,
}) {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
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
        <button
          type="submit"
          className={`search-form__button ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
