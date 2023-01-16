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
          <li className="movieItem">
          <MoviesCard
            card={card}
            key={props.isOnlySaved ? card.movieId : card.id}
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