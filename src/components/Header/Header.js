import React from 'react';
import logo from '../../images/mesto.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="текстовый логтип Место Раша" />
        </header>
    );
}

export default Header;