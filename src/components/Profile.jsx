import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../context/currentUserContext";
import Navigation from "./Navigation";

  function Profile(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const currentUser = useContext(CurrentUserContext);
    const [errors, setErrors] = useState()
  
    useEffect(
      () => {
          setName(String(currentUser.name));
          setEmail(String(currentUser.email));
      },
      [currentUser]
    );
  
    function handleChangeName(evt) {
      const { name } = evt.target;
      setName(evt.target.value);
      setErrors({...errors, [name] : evt.target.validationMessage});
    }
  
    function handleChangeEmail(evt) {
      const { name } = evt.target;
      setEmail(evt.target.value);
      setErrors({...errors, [name] : evt.target.validationMessage})
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      props.onEditProfile({ name, email });
    }

  return (
    <>
      <Navigation />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" id="edit" onSubmit={handleSubmit}>
          <label className="form__indicator">Имя</label>
          <input
            className="form__input"
            value={name}
            onChange={handleChangeName}
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
            value={email}
            onChange={handleChangeEmail}
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
