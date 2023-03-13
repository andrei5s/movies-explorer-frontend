import React from 'react';
import flag from "../images/heat.svg";
import cross from "../images/icon-delete.svg";
import { CurrentUserContext } from "../context/currentUserContext";

function MoviesCard({ card, onCardSave, onCardDelete, isOnlySaved, isSaved }) {
  const nameRu = card.nameRU;
  const poster = isOnlySaved
    ? card.image
    : `https://api.nomoreparties.co/${card.image.url}`;
  const trailerLink = card.trailerLink;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const deleteButtonClassName = `element__delete ${
    isOwn ? "element__delete_visible" : "element__delete_hidden"
  }`;

  const duration = () => {
    if (card.duration > 60) {
      return ((card.duration / 60) | 0) + "ч" + (card.duration % 60) + "м";
    }
    if (card.duration === 60) {
      return card.duration / 60 + "ч";
    } else {
      return card.duration + "м";
    }
  };

  function handleCardSave() {
    onCardSave(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <>
      <div className="element">
        <a
          className="element__movie"
          href={trailerLink}
          rel="noreferrer"
          target="_blank"
        >
          <img src={poster} alt="Постер" className="element__image" />
        </a>
        <div className="element__group">
          <div className="element__spicific">
            <h2 className="element__title">{nameRu}</h2>
            <p className="element__duration">{duration()}</p>
          </div>
          {isOnlySaved ? (
            <button
              className={deleteButtonClassName}
              onClick={handleCardDelete}
              type="button"
            >
              <img
                src={cross}
                className="element__delete-image"
                alt="крестик"
              />
            </button>
          ) : isSaved(card) ? (
            <button
              className="element__favourit-save"
              onClick={handleCardDelete}
              type="button"
            >
              <img src={flag} className="element__favorit-image" alt="флажек" />
            </button>
          ) : (
            <button
              className="element__favourit"
              onClick={handleCardSave}
              type="button"
            >
              <img src={flag} className="element__favorit-image" alt="флажек" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default MoviesCard