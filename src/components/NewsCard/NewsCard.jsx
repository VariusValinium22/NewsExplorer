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
    <li className="card">
      {isSavedPage && article.keyword && (
        <div className="card__keyword">{article.keyword}</div>
      )}
      <div className="card__button-wrapper">
        {!currentUser && !isSavedPage && (
          <p className="card__message">Sign in to save articles</p>
        )}

        {isSavedPage && currentUser && (
          <p className="card__message">Remove from saved</p>
        )}
        <button
          className={`card__button 
          ${isSavedPage ? 'card__button_deleted' : ''} 
          ${isSaved ? 'card__button_saved' : ''}
          `}
          onClick={handleIconClick}
          aria-label={getButtonLabel()}
        />
      </div>
      <img
        src={article.urlToImage}
        alt={article.title}
        className="card__image"
      />
      <div className="card__info">
        <p className="card__date">
          {new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <h3 className="card__title">{article.title}</h3>
        <p className="card__text">{article.description}</p>
        <p className="card__source">{article.source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
