import SearchForm from '../components/SearchForm';
import MoviesCardList from '../components/MoviesCardList';

function Movies({
  cards,
  handleSearch,
  defaultValue,
  handleShowMore,
  isSaved,
  onCardSave,
  onCardDelete,
  serverError,
  loading,
}) {
  return (
    <>
      <SearchForm handleSearch={handleSearch} defaultValue={defaultValue} />
      <main className="movies">
        <MoviesCardList
          cards={cards}
          handleShowMore={handleShowMore}
          isSaved={isSaved}
          isOnlySaved={false}
          onCardSave={onCardSave}
          onCardDelete={onCardDelete}
          serverError={serverError}
          loading={loading}
        />
        <button
          className="elements__button"
          onClick={handleShowMore}
          type="button"
        >
          Ещё
        </button>
      </main>
    </>
  );
}

export default Movies