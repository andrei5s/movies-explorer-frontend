import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo';

function Header() {
    return (
        <header className='header'>
        <Logo />
       
            <div className="header__navigation">
              <Link to="/signup" className="header__link">Регистрация</Link>
              <button type='button' className='header__button'><Link to="/signin" className="header__button-text">Войти</Link></button>
            </div>
        
            </header>
    )
}

export default Header