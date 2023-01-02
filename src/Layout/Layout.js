import React from 'react';
import Header from './Header'
import {useLocation} from 'react-router-dom';

const Layout = ({children}) => {
    const location = useLocation();
    const header = () => {
        if (location.pathname !== '/login' && location.pathname !== '/register') {
            return (<Header/>);
        }
    }
    return (
        <>
            {header()}
            {/*<Header />*/}
            {children}
        </>
    );
};

export default Layout;