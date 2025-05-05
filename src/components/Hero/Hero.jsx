import './Hero.css';
import SearchForm from '../SearchForm/SearchForm.jsx';

function Hero({
  onSearch, isLoading, query, setQuery,
}) {
  return (
    <section className="hero">
      <h1 className="hero__title">What&apos;s going on in the world?</h1>
      <p className="hero__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm
        onSearch={onSearch}
        isLoading={isLoading}
        query={query}
        setQuery={setQuery}
      />
    </section>
  );
}
export default Hero;
