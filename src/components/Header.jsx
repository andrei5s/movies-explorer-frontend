import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';

function Header(props) {
 
    return ( 
      <header className='header'>
        <Logo />
       <Navigation loggedIn={props.loggedIn} />
      </header>
      
    )
}

export default Header