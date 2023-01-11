import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const hendleMenuOpen = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="header">
        <Logo />
            <div className={isMenuOpen ? ["header__overley", "header__overley_active"].join(' ') : ["header__overley"]}>
                <nav className="header__main">
                <Link to="/" className="header__index">Главная</Link>
                <Link to="/movies" className="header__films">Фильмы</Link>
                <div className="header__line"></div>
                <Link to="/saved-movies" className="header__saved">Сохранённые фильмы</Link>
                <Link to="/profile" className="header__accaunt">Аккаунт</Link>
                </nav>
            </div>
            <div onClick={hendleMenuOpen} className="header__menu">
                {isMenuOpen ? <AiOutlineClose className="header__menu-icon" /> : <AiOutlineMenu className="header__menu-icon"/>}
                
            </div>
            
        </header>
    )
}

export default Navigation