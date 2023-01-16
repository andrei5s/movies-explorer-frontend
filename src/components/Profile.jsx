import { useContext, useState } from "react";
import { CurrentUserContext } from "../context/currentUserContext";
import Navigation from "./Navigation";

  function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
  
    const [errors, setErrors] = useState()
    const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors({...errors, [name] : e.target.validationMessage})
    setState((old) => ({
      ...old,
      [name]: value,
      
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = state;
    props.onEditProfile(name, email);
  };

  return (
    <>
      <Navigation />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" id="edit" onSubmit={handleSubmit}>
          <label className="form__indicator">Имя</label>
          <input
            className="form__input"
            value={state.name || currentUser.name}
            onChange={handleChange}
            type="name"
            name="name"
            placeholder={currentUser.name}
            minLength="2"
            maxLength="30"
            required
          />
          <div className="form__line"></div>
          {errors?.name && (
            <span className="profile__input-error">{errors.name}</span>
          )}
          <label className="form__indicator">E-mail</label>
          <input
            className="form__input"
            value={state.email || currentUser.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder={currentUser.email}
            required
          />
          <div className="form__line"></div>
          {errors?.email && (
            <span className="profile__input-error">{errors.email}</span>
          )}
            <button
              className="profile__edit"
              type="submit"
            >
              Редактировать
            </button>
            <button
              className="profile__exit"
              onClick={props.handleSignOut}
              type="submit"
            >
              Выйти из аккаунта
            </button>
        </form>
      </section>
    </>
  );
}

export default Profile;
