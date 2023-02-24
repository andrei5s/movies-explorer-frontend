import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Register = (props) => {
 const [errors, setErrors] = useState();
 const [isValid , setIsValid] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsValid(e.target.closest('form').checkValidity())
    setErrors({...errors, [name] : e.target.validationMessage})
    setState((old) => ({
      ...old,
      [name]: value,
      
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = state;
    props.onRegister(name, email, password);
  };

  return (
    <>
      <section className="register">
        <Logo />
        <h1 className="title">Добро пожаловать!</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__indicator">Имя</label>
          <input
            type="name"
            name="name"
            placeholder="Имя"
            className="form__input"
            onChange={handleChange}
            value={state.name}
            minLength="2"
            maxLength="30"
            required
          />
          <div className="form__line"></div>
          {errors?.name && (
            <span className="error form__input-error">{errors.name}</span>
          )}
          <label className="form__indicator">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form__input"
            onChange={handleChange}
            value={state.email}
            required
          />
          <div className="form__line"></div>
          {errors?.email && (
            <span className="error form__input-error">{errors.email}</span>
          )}
          <label className="form__indicator">Пароль</label>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__input"
            onChange={handleChange}
            value={state.password}
            required
          />
          <div className="form__line"></div>
          {errors?.password && (
            <span className="error form__input-error">{errors.password}</span>
          )}
          <span className="register__error">{props.errorMessage}</span>
        <button
          type="submit"
          className={isValid ? "button" : "button_disabled"}
          disabled={!isValid}
          aria-label="Зарегистрироваться"
        >
          Зарегистрироваться
        </button>
        <p className="subtitle">
          Уже зарегистрированы?
          <Link to="/signin" className="link">
            Войти
          </Link>
        </p>
        </form>
      </section>
    </>
  );
};

export default Register;
