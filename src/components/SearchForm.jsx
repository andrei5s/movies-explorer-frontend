import { useState, useEffect } from 'react'
import searchButton from "../images/icon.svg"

function SearchForm(props) {
  const [movieName, setMovieName] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  function handleChangeMovieName(e) {
    setMovieName(e.target.value)
  }

  function handleChangeCheckbox(e) {
    const isShortFilms = e.target.checked
    setCheckbox(isShortFilms)
    props.handleSearch(movieName, isShortFilms)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.handleSearch(movieName, checkbox)
  }
  
  useEffect(() => {
    setMovieName(props.defaultValue)
    setCheckbox(JSON.parse(localStorage.getItem('shortFilms')) || false)
  }, [])

  return (
    <section className="serch" onSubmit={handleSubmit}>
      <form className="serch__form">
        <div className="serch__input-form">
          <input className="serch__input" onChange={handleChangeMovieName} value={movieName} type="text" name="movie" placeholder="Фильм" required />
          <button className="serch__button" onSubmit={handleSubmit} type="submit"><img src={searchButton} alt="поиск" className="serch__leble" /></button>
      
        </div>
        <div className="serch__short">
        <label className="serch__subtitle">Короткометражки</label>
          <input className="serch__switch-btn" checked={checkbox} onChange={handleChangeCheckbox} type="checkbox" name="shortFilms" />
          
        </div>
      </form>
      <div className="serch__line"></div>
    </section>
  )
}

export default SearchForm