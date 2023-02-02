import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const initValues = {
  email: "",
  password: "",
  message: "",
};

const Login = (props) => {
  const [state, setState] = React.useState(initValues);
  const [errors, setErrors] = React.useState()

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
            <button
            className="button"
            type="submit"
            aria-label="вход"
          >
          Вход
          </button>
            <p className="subtitle">Ещё не зарегистрированы?<Link to="/signup" className="link">Регистрация</Link></p>
            </form>
        </section>
        </>
  );
};

export default Login;
