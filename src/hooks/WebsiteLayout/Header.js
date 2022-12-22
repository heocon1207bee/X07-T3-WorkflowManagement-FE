import React from 'react';
import './Header.style.scss'
import logo from '../../assets/images/pumanager-logo.png'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-logo'>
                <Link to='/'><img src={logo} alt='logo' /></Link>
            </div>
            <div className='header-button'>

            </div>
        </div>
    );
};

export default Header;