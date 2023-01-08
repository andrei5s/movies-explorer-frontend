import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import MoviesCardList from '../components/MoviesCardList';
import Navigation from './Navigation';
import Footer from './Footer';
import cross from "../images/icon-delete.svg"
import card from "../images/pic1.png"

function SavedMovies(props) {
  const [filteredMovies, setFilteredMovies] = useState([])

  function handleSerch(movieName, isShortFilms) {
    const filteredMovies = props.cards.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if (isShortFilms) {
      setFilteredMovies(filteredMovies.filter((item) => item.duration <= 40))
    }
    else {
      setFilteredMovies(filteredMovies)
    }
  }

  function initFilteredMovies() {
    setFilteredMovies(props.cards)
  }

  useEffect(() => {
    setFilteredMovies(
      filteredMovies.filter(movie => props.cards.some(card => movie.movieId === card.movieId))
    )
  }, [props.cards])

  useEffect(() => {
    initFilteredMovies()
  }, [])

  return (
    <>
    <Navigation />
      <SearchForm
        onSearch={handleSerch}
        defaultValue=""
      />
      <main className="serch">
        <MoviesCardList
          cards={filteredMovies}
          isSaved={props.isSaved}
          isOnlySaved={true}
          onCardDelete={props.onCardDelete}
          serverError={props.serverError}
          loading={props.loading}
        />
        <section className="elements">
                <div className="element">
                    <div className="element__group">
                        <div className="element__spicific">
                            <h2 className="element__title">33 слова о дизайне</h2>
                            <p className="element__duration">1ч 47м</p>
                        </div>
                        <button type="button" className="element__delete"><img src={cross} className="element__delete-image" alt="крестик" /></button>
                    </div>
                        <img src={card} className="element__image" alt='скриншот' />                
                </div>
                <div className="element">
                    <div className="element__group">
                        <div className="element__spicific">
                            <h2 className="element__title">33 слова о дизайне</h2>
                            <p className="element__duration">1ч 47м</p>
                        </div>
                        <button type="button" className="element__delete"><img src={cross} className="element__delete-image" alt="крестик" /></button>
                    </div>
                        <img src={card} className="element__image" alt='скриншот' />                
                </div>
                <div className="element">
                    <div className="element__group">
                        <div className="element__spicific">
                            <h2 className="element__title">33 слова о дизайне</h2>
                            <p className="element__duration">1ч 47м</p>
                        </div>
                        <button type="button" className="element__delete"><img src={cross} className="element__delete-image" alt="крестик" /></button>
                    </div>
                        <img src={card} className="element__image" alt='скриншот' />                
                </div>
                </section>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies