import { useState, useEffect } from "react";
import searchButton from "../images/icon.svg";

const SearchForm = ({ handleSearch, defaultValue }) => {
  const [movieName, setMovieName] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const handleChangeMovieName = (e) => {
    setMovieName(e.target.value);
  }

  const handleChangeCheckbox = (e) => {
    const isShortFilms = e.target.checked;
    setCheckbox(isShortFilms);
    handleSearch(movieName, isShortFilms);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(movieName, checkbox);
  }

  useEffect(() => {
    setMovieName(defaultValue);
    setCheckbox(JSON.parse(localStorage.getItem("shortFilms")) || false);
  }, []);

  return (
    <section className="serch" onSubmit={handleSubmit}>
      <form className="serch__form">
        <div className="serch__input-form">
          <input
            className="serch__input"
            onChange={handleChangeMovieName}
            value={movieName}
            type="text"
            name="movie"
            placeholder="Фильм"
            required
          />
          <button
            className="serch__button"
            onSubmit={handleSubmit}
            type="submit"
          >
            <img src={searchButton} alt="поиск" className="serch__leble" />
          </button>
        </div>
        <div className="serch__short">
          <label className="serch__subtitle">Короткометражки</label>
          <input
            className="serch__switch-btn"
            checked={checkbox}
            onChange={handleChangeCheckbox}
            type="checkbox"
            name="shortFilms"
          />
        </div>
      </form>
      <div className="serch__line"></div>
    </section>
  );
}

export default SearchForm;