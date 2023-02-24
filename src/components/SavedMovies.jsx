import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import MoviesCardList from "../components/MoviesCardList";

const SavedMovies = ({ cards, isSaved, onCardDelete, serverError, loading }) => {
  const [savedMovies, setSavedMovies] = useState([]);

  const handleSerch = (movieName, isShortFilms) => {
    const savedMovie = cards.filter((item) =>
      item.nameRU.toLowerCase().includes(movieName.toLowerCase())
    );
    if (isShortFilms) {
      setSavedMovies(savedMovie.filter((item) => item.duration <= 40));
    } else {
      setSavedMovies(savedMovie);
    }
  }

  const initFilteredMovies = () => {
    setSavedMovies(cards);
  }

  useEffect(() => {
    setSavedMovies(
      savedMovies.filter((movie) =>
        cards.some((card) => movie.id === card.id)
      )
    );
  }, [cards.length]);

  useEffect(() => {
    initFilteredMovies();
  }, [cards.length]);

  return (
    <>
      <SearchForm handleSearch={handleSerch} defaultValue="" />
      <main className="saved-movies">
        <MoviesCardList
          cards={savedMovies}
          isSaved={isSaved}
          isOnlySaved={true}
          onCardDelete={onCardDelete}
          serverError={serverError}
          loading={loading}
        />
      </main>
    </>
  );
}

export default SavedMovies;
