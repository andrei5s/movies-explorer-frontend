import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import MoviesCardList from '../components/MoviesCardList';

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
      <SearchForm
        handleSearch={handleSerch}
        defaultValue=""
      />
      <main className="saved-movies">
        <MoviesCardList
          cards={filteredMovies}
          isSaved={props.isSaved}
          isOnlySaved={true}
          onCardDelete={props.onCardDelete}
          serverError={props.serverError}
          loading={props.loading}
        />
      </main>
    </>
  )
}

export default SavedMovies