import "./NewsCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import flagIconWhite from "../../assets/flag-white.svg";
import flagIconBlack from "../../assets/flag-black.svg";
import flagIconBlue from "../../assets/flag-blue.svg";
import deleteWhite from "../../assets/trash-white.svg";

function NewsCard({ article, onSave, onDelete, isSaved, isSavedPage }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!article) {
    return null;
  }

  const handleCardClick = () => {
    onCardClick(article.url || "#", "_blank");
  };

  const handleSaveClick = () => {
    onSave(article);
  };

  const handleIconClick = () => {
    if (isSavedPage) {
      onDelete && onDelete(article);
    } else {
      onSave && onSave(article);
    }
  };

  return (
    <li className="news-card">
      <button
        className={`news-card__save-button${isSavedPage ? " saved" : ""}`}
        onClick={handleIconClick}
        aria-label={
          isSavedPage
            ? "Delete article"
            : isSaved
            ? "Unsave article"
            : "Save Article"
        }
      >
        <img
          src={
            isSavedPage
              ? deleteWhite
              : isSaved
              ? flagIconBlue
              : flagIconWhite
          }
          alt="Save article image"
          className={`news-card__save-icon ${isSaved ? "saved" : ""}`}
        />
      </button>
      <img
        src={article.image}
        alt={article.title}
        className="news-card__image"
        onClick={handleCardClick}
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
