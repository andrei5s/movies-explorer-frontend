import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import useFormValidation from '../hooks/useFormValidator'

const initValues = {
  email: "",
  password: "",
  message: "",
};

const Login = (props) => {
  const [state, setState] = React.useState(initValues);
  const { errors } = useFormValidation;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;

    props.onLogin(email, password);
  };

  return (
    <>
    <section className="register">
            <Logo />
            <h1 className="title">Рады видеть!</h1>
            <form className="form" onSubmit={handleSubmit}>
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
                {errors?.name && <span className="error form__input-error">{errors.name}</span>}
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
                {errors?.name && <span className="error form__input-error">{errors.name}</span>}
            </form>
            <button
            className="button"
            id="button-reg"
            type="submit"
            aria-label="вход"
          ><Link to="/movies" className="form__link">
          Вход
          </Link>
          </button>
            <p className="subtitle">Ещё не зарегистрированы?<Link to="/signup" className="link">Регистрация</Link></p>
        </section>
        </>
  );
};

export default Login;
