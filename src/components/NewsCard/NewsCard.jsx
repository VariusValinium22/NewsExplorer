import './NewsCard.css';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function NewsCard({
  article, onSave, onDelete, isSaved, isSavedPage,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!article) {
    return null;
  }

  const handleIconClick = () => {
    if (!currentUser) {
      return;
    }

    if (isSavedPage) {
      if (onDelete) onDelete(article);
    } else if (onSave) {
      onSave(article);
    }
  };

  const getButtonLabel = () => {
    if (isSavedPage) return 'Delete article';
    if (isSaved) return 'Unsave article';
    return 'Save article';
  };
  return (
    <li className="news-card">
      {isSavedPage && article.keyword && (
        <div className="news-card__keyword">{article.keyword}</div>
      )}
      <div className="news-card__button-wrapper">
        {!currentUser && !isSavedPage && (
          <p className="news-card__message">Sign in to save articles</p>
        )}
        <button
          className={`news-card__button 
          ${isSavedPage ? 'news-card__button_deleted' : ''} 
          ${isSaved ? 'news-card__button_saved' : ''}
          `}
          onClick={handleIconClick}
          aria-label={getButtonLabel()}
        />
      </div>
      <img
        src={article.urlToImage}
        alt={article.title}
        className="news-card__image"
      />
      <div className="news-card__info">
        <p className="news-card__date">
          {new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{article.description}</p>
        <p className="news-card__source">{article.source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
