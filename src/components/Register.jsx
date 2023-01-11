import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import useFormValidation from '../hooks/useFormValidator';

const Register = (props) => {
  const { errors } = useFormValidation;
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

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
            <form className="form" onSubmit={handleSubmit} action='#' noValidate>
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
                {errors?.name && <span className="error form__input-error">{errors.name}</span>}
                <div className="form__line"></div>
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
                {errors?.name && <span className="error form__input-error">{errors.name}</span>}
                <div className="form__line"></div>
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
            <button type="submit" className="button" aria-label="Зарегистрироваться">Зарегистрироваться</button>
            <p className="subtitle">
            Уже зарегистрированы? 
            <Link to="/signin" className="link">
              Войти
            </Link>
            </p>
        </section>
        </>
  );
};

export default Register;
