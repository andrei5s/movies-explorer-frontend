import MoviesCard from '../components/MoviesCard'
import Preloader from '../components/Preloader'

function MoviesCardList({ loading, cards, isSaved, isOnlySaved, onCardSave, onCardDelete }) {
  if (loading) return <Preloader />

  return (
    <>
      <section className="elements">
      {
       cards.map(card => {
        return (
          <li className="movie-item">
          <MoviesCard
            card={card}
            key={isOnlySaved ? card.movieId : card.id}
           // key={card.id || card._id}
            isSaved={isSaved}
            isOnlySaved={isOnlySaved}
            onCardSave={onCardSave}
            onCardDelete={onCardDelete}
          />
          </li>
        )        
      })
        }
      </section>
     </>
  )

}

export default MoviesCardList