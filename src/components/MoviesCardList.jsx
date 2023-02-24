import MoviesCard from '../components/MoviesCard'
import Preloader from '../components/Preloader'

function MoviesCardList({
  loading,
  cards,
  isSaved,
  isOnlySaved,
  onCardSave,
  onCardDelete,
  serverError
}) {
  if (loading) return <Preloader />;
  if (cards.length === 0)
    return <span className="movies__search-error">Ничего не найдено</span>;
  if (serverError)
    return (
      <span className="movies__search-error">
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </span>
    );

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
    </>
  );
}

export default MoviesCardList