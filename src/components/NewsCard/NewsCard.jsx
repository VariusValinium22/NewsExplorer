import "./NewsCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import flagIcon from "../../assets/flagIcon.svg";
import flagIconBlack from "../../assets/flagIconBlack.svg"

function NewsCard({ article, onSave }) {
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

  return (
    <li className="news-card">
      <button className="news-card__save-button" onClick={handleSaveClick}>
        <img src={flagIcon} alt="Save article image" className="news-card__save-icon" />
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
