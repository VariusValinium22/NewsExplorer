import './Main.css';
import { useState, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import NewsCard from '../NewsCard/NewsCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import notFound from '../../assets/not-found.svg';

function Main({
  articles,
  hasSearched,
  onSaveArticle,
  onDeleteArticle,
  savedArticles = [],
  isSavedPage,
  isLoading,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  // Count keywords and sort them by frequency
  const countMap = {};
  articles.forEach((a) => {
    if (!a.keyword) return;
    countMap[a.keyword] = (countMap[a.keyword] || 0) + 1;
  });

  const sortedKeywords = Object.entries(countMap)
    .sort((a, b) => b[1] - a[1])
    .map(([keyword]) => keyword);

  const getKeywordSummary = () => {
    if (sortedKeywords.length === 0) return '';
    if (sortedKeywords.length === 1) return `By keywords: ${sortedKeywords[0]}`;
    if (sortedKeywords.length === 2) return `By keywords: ${sortedKeywords[0]}, ${sortedKeywords[1]}`;
    const othersCount = sortedKeywords.length - 2;
    return `By keywords: ${sortedKeywords[0]}, ${
      sortedKeywords[1]
    }, and ${othersCount} other${othersCount > 1 ? 's' : ''}`;
  };

  // Sort articles by keyword frequency order
  const keywordOrder = sortedKeywords.reduce((acc, keyword, index) => {
    acc[keyword] = index;
    return acc;
  }, {});

  const sortedArticles = [...articles].sort((a, b) => {
    const aOrder = keywordOrder[a.keyword] ?? Number.MAX_SAFE_INTEGER;
    const bOrder = keywordOrder[b.keyword] ?? Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder;
  });

  const [visibleCount, setVisibleCount] = useState(3);
  const displayedArticles = Array.isArray(sortedArticles)
    ? sortedArticles.slice(0, visibleCount)
    : [];

  const hasResults = sortedArticles.length > 0;

  return (
    <section className="cards">
      {isSavedPage && currentUser && (
        <div className="saved-header">
          <h2 className="saved-header__title">
            {`${currentUser.name}, you have ${
              sortedArticles.length
            } saved article${sortedArticles.length !== 1 ? 's' : ''}`}
          </h2>
          <p className="saved-header__keywords">{getKeywordSummary()}</p>
        </div>
      )}

      {!isSavedPage && hasResults && (
        <h2 className="cards__title">Search Results</h2>
      )}

      <div className="news-cards_section">
        <ul className="news-cards">
          {isLoading && <Preloader />}
          {!isLoading &&
            hasResults &&
            displayedArticles.map((article, i) => (
              <NewsCard
                key={i}
                article={article}
                onSave={onSaveArticle}
                onDelete={onDeleteArticle}
                isSavedPage={isSavedPage}
                isSaved={
                  !!currentUser &&
                  savedArticles.some((a) => a.title === article.title)
                }
              />
            ))}

          {!isLoading && !hasResults && hasSearched && (
            <div className="no-results">
              <img
                src={notFound}
                alt="Not found icon"
                className="no-results__icon"
              />
              <h3 className="no-results__title">Nothing found</h3>
              <p className="no-results__text">
                Sorry, but nothing matched your search terms.
              </p>
            </div>
          )}
        </ul>
      </div>

      {hasResults && visibleCount < sortedArticles.length && (
        <button
          className="cards__show-more"
          onClick={() => setVisibleCount(visibleCount + 3)}
        >
          Show more
        </button>
      )}
    </section>
  );
}

export default Main;
