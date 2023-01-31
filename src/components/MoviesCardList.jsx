import MoviesCard from '../components/MoviesCard'
import Preloader from '../components/Preloader'

function MoviesCardList(props) {
  if (props.loading) return <Preloader />

  return (
    <>
      <section className="elements">
      {
       props.cards.map(card => {
        return (
          <li className="movie-item">
          <MoviesCard
            card={card}
            key={props.isOnlySaved ? card.movieId : card._id}
           // key={card._id}
            isSaved={props.isSaved}
            isOnlySaved={props.isOnlySaved}
            onCardSave={props.onCardSave}
            onCardDelete={props.onCardDelete}
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