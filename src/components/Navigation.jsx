import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navigation = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const hendleMenuOpen = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
        {!props.loggedIn ? (
            <div className="header__navigation">
            <Link to="/signup" className="header__link">Регистрация</Link>
            <button type='button' className='header__button'><Link to="/signin" className="header__button-text">Войти</Link></button>
          </div>) : (
            <>
            <div className={isMenuOpen ? ["header__overley", "header__overley_active"].join(' ') : ["header__overley"]}>
                <nav className="header__main">
                <Link to="/" className="header__index">Главная</Link>
                <Link to="/movies" className="header__films">Фильмы</Link>
                <div className="header__line"></div>
                <Link to="/saved-movies" className="header__saved">Сохранённые фильмы</Link>
                <button type="button" className="header__button-accaunt"><Link to="/profile" className="header__accaunt">Аккаунт</Link></button>
                </nav>
            </div>
            <div onClick={hendleMenuOpen} className="header__menu">
                {isMenuOpen ? <AiOutlineClose className="header__menu-icon" /> : <AiOutlineMenu className="header__menu-icon"/>}
                
            </div>
            </>)
}
        </>
    )
}

export default Navigation