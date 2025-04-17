import React, { useState } from "react";
import "./Main.css";
import NewsCard from "../NewsCard/NewsCard";

function Main({ articles, hasSearched, onSaveArticle, onDeleteArticle, savedArticles = [], isSavedPage }) {
  const hasResults = articles.length > 0;
  const [visibleCount, setVisibleCount] = useState(3);
  const displayedArticles = articles.slice(0, visibleCount);

  return (
    <section className="cards">
      {hasResults && <h2 className="cards__title">Search Results</h2>}
      <div className="news-cards_section">
        <ul className="news-cards">
          {hasResults ? (
            displayedArticles.map((article, i) => (
              <NewsCard 
                key={i} 
                article={article} 
                onSave={onSaveArticle}
                onDelete={onDeleteArticle}
                isSavedPage={isSavedPage}
                isSaved={savedArticles.some((a) => a.title === article.title)}
              />
            ))
          ) : hasSearched ? (
            <p>No articles available.</p>
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
