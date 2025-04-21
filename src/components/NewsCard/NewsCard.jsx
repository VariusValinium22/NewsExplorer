import "./NewsCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function NewsCard({ article, onSave, onDelete, isSaved, isSavedPage }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!article) {
    return null;
  }

  const handleIconClick = () => {
    if (!currentUser) {
      return;
    }

    if (isSavedPage) {
      onDelete && onDelete(article);
    } else {
      onSave && onSave(article);
    }
  };

  return (
    <li className="news-card">
      <div className="news-card__button-wrapper">
        {!currentUser && !isSavedPage && (
          <p className="news-card__message">Sign in to save articles</p>
        )}
        <button
          className={`news-card__button 
          ${isSavedPage ? "news-card__button_deleted" : ""} 
          ${isSaved ? "news-card__button_saved" : ""}
          `}
          onClick={handleIconClick}
          aria-label={
            isSavedPage
              ? "Delete article"
              : isSaved
              ? "Unsave article"
              : "Save Article"
          }
        />
      </div>
      <img
        src={article.image}
        alt={article.title}
        className="news-card__image"
      />
      <div className="news-card__info">
        <p className="news-card__date">{article.date}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{article.text}</p>
        <p className="news-card__source">{article.source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
