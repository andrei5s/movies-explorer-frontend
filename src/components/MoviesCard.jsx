import React from 'react';
import flag from "../images/flag1.svg"

function MoviesCard(props) {
  const nameRu = props.card.nameRU
  const poster = props.isOnlySaved ? props.card.image : `https://api.nomoreparties.co/${props.card.image.url}`
  const trailerLink = props.card.trailerLink

  const duration = () => {
    if (props.card.duration > 60) {
      return (props.card.duration / 60 | 0) + "ч" + props.card.duration % 60 + "м"
    }
    if (props.card.duration === 60) {
      return (props.card.duration / 60) + "ч"
    } else {
      return props.card.duration + "м"
    }
  }

  function handleCardSave() {
    props.onCardSave(props.card)
  }

  function handleCardDelete() {
    props.onCardDelete(props.card)
  }

  return (
    <>
    <div className="element">
        <div className="element__group">
            <div className="element__spicific">
                <h2 className="element__title">{nameRu}</h2>
                <p className="element__duration">{duration()}</p>
            </div>
        {props.isOnlySaved ? <button className="element__delete" onClick={handleCardDelete} type="button"><img src="/images/icon-delete.svg" className="element__delete-image" alt="крестик" /></button> :
        (props.isSaved(props.card) ? <button className="element__favourit-save" onClick={handleCardDelete} type="button"><img src={flag} className="element__favorit-image" alt="флажек" /></button> :
            <button className="element__favourit" onClick={handleCardSave} type="button"><img src={flag} className="element__favorit-image" alt="флажек" /></button>)}
                </div>
                <a className="element__movie" href={trailerLink} rel="noreferrer" target="_blank">
                <img src={poster} alt="Постер" className="element__image" />
                </a>
    </div>
    </>
  )
}

export default MoviesCard