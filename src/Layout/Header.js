import React, { useState } from 'react';
import './Header.style.scss';
import logo from '../assets/images/pumanager-logo.png';
import { Link } from 'react-router-dom';

import ToggleTheme from '../components/ToggleTheme/ToggleTheme';
import { useSelector } from 'react-redux';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const themeStore = useSelector((state) => state.theme);

    const userName =
        localStorage.getItem('worlflow_store') && JSON.parse(localStorage.getItem('worlflow_store')).user.fullname;
    const handleShowModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };
    const handleHideModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    };
    const handleModal = (e) => {
        e.preventDefault();
        setShowModal(!showModal);
    };

    const showStyles = {
        visibility: 'visible',
        transform: 'scale(1,1)',
    };

    const handleLogOut = () => {
        localStorage.removeItem('worlflow_store');
        window.location.reload();
    };

    return (
        <div className={`header ${themeStore.theme}-mode`}>
            <div className="header-logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="header-button">
                <ToggleTheme />
                <span className={`${themeStore.theme}-mode`}>
                    Xin chào,{' '}
                    <Link to="/user" className={`${themeStore.theme}-mode`}>
                        {userName}
                    </Link>
                </span>
                <span
                    className="user-avatar"
                    onMouseEnter={(e) => handleShowModal(e)}
                    onMouseLeave={(e) => handleHideModal(e)}
                    onClick={(e) => handleModal(e)}
                >
                    <img src="https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg" />
                    <div className="nav-modal" style={showModal ? showStyles : null}>
                        <div className="modal-user-info">
                            <img src="https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg" />
                            <p>{userName}</p>
                        </div>
                        <div className="modal-user-actions">
                            <button onClick={handleLogOut}>Đăng xuất</button>
                        </div>
                    </div>
                </span>
            </div>
        </div>
    );
};

export default Header;
