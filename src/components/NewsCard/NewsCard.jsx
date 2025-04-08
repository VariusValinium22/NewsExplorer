import "./NewsCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function NewsCard({ article }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!article) {
    return null;
  }

  const handleCardClick = () => {
    onCardClick(article.url || "#", "_blank");
  };

  return (
    <li className="news-card">
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
