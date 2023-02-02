import SearchForm from '../components/SearchForm';
import MoviesCardList from '../components/MoviesCardList';

function Movies(props) {
  return (
    <>
      <SearchForm
        handleSearch={props.handleSearch}
        defaultValue={props.defaultSearchValue}
      />
      <main className="movies">
        <MoviesCardList
          cards={props.cards}
          handleShowMore={props.handleShowMore}
          isSaved={props.isSaved}
          isOnlySaved={false}
          onCardSave={props.onCardSave}
          onCardDelete={props.onCardDelete}
          serverError={props.serverError}
          loading={props.loading}
        />
        <button className="elements__button" onClick={props.handleShowMore} type="button">Ещё</button>
      </main>
    </>
  )
}

export default Movies