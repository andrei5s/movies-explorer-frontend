import MoviesCard from "../components/MoviesCard";
import Preloader from "../components/Preloader";

function MoviesCardList({
  loading,
  cards,
  isSaved,
  isOnlySaved,
  onCardSave,
  onCardDelete,
  serverError,
  handleShowMore,
}) {
  if (loading) return <Preloader />;

  if (serverError)
    return (
      <span className="movies__search-error">
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </span>
    );

  const foundMovies = JSON.parse(localStorage.getItem("foundMovies"));

  if (foundMovies === null)
    return (
      <span className="movies__search-error">
        Вы ещё ни чего не искали. Начните поиск
      </span>
    );

  if (foundMovies.length === 0)
    return <span className="movies__search-error">Ничего не найдено</span>;

  return (
    <>
      <section className="elements">
        {cards.map((card) => {
          return (
            <li className="movie-item">
              <MoviesCard
                card={card}
                key={card.id}
                isSaved={isSaved}
                isOnlySaved={isOnlySaved}
                onCardSave={onCardSave}
                onCardDelete={onCardDelete}
              />
            </li>
          );
        })}
      </section>

      {isOnlySaved ? (
        ""
      ) : cards.length < foundMovies.length ? (
        <button
          className="elements__button"
          onClick={handleShowMore}
          type="button"
        >
          Ещё
        </button>
      ) : (
        ""
      )}
    </>
  );
}

export default MoviesCardList;
