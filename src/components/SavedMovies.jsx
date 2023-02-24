import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import MoviesCardList from "../components/MoviesCardList";

const SavedMovies = ({ cards, isSaved, onCardDelete, serverError, loading }) => {
  const [savedMovie, setSavedMovie] = useState([]);

  const handleSerch = (movieName, isShortFilms) => {
    const savedMovie = cards.filter((item) =>
      item.nameRU.toLowerCase().includes(movieName.toLowerCase())
    );
    if (isShortFilms) {
      setSavedMovie(savedMovie.filter((item) => item.duration <= 40));
    } else {
      setSavedMovie(savedMovie);
    }
  }

  const initFilteredMovies = () => {
    setSavedMovie(cards);
  }

  useEffect(() => {
    setSavedMovie(
      savedMovie.filter((movie) =>
        cards.some((card) => movie.id === card.id)
      )
    );
  }, [cards]);

  useEffect(() => {
    initFilteredMovies();
  }, [cards.lenght]);

  return (
    <>
      <SearchForm handleSearch={handleSerch} defaultValue="" />
      <main className="saved-movies">
        <MoviesCardList
          cards={savedMovie}
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
