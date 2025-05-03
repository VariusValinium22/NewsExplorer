import "./Main.css";
import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import notFound from "../../assets/not-found.svg";

function Main({
  articles,
  hasSearched,
  onSaveArticle,
  onDeleteArticle,
  savedArticles = [],
  isSavedPage,
  isLoading,
}) {
  const hasResults = articles.length > 0;
  const [visibleCount, setVisibleCount] = useState(3);
  const displayedArticles = Array.isArray(articles)
    ? articles.slice(0, visibleCount)
    : [];
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="cards">
      {hasResults && <h2 className="cards__title">Search Results</h2>}

      <div className="news-cards_section">
        <ul className="news-cards">
          {isLoading ? (
            <Preloader />
          ) : hasResults ? (
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
            ))
          ) : hasSearched ? (
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
          ) : null}
        </ul>
      </div>

      {hasResults && visibleCount < articles.length && (
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
