import React from 'react';
import './InfoPageLayout.style.scss';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const { Sider, Content } = Layout;

const InfoPageLayout = (props) => {
    const themeStore = useSelector((state) => state.theme);
    const activeClassName = `info-page-nav ${themeStore.theme}-mode info-page-nav-active`;
    const unActiveClassName = `info-page-nav ${themeStore.theme}-mode`;
    console.log('info page layout loaded')
    return (
        <div className={`user-info-page ${themeStore.theme}-mode`}>
            <Layout className={`${themeStore.theme}-mode`}>
               <Sider width='15rem' theme={themeStore.theme}
                       className={`user-info-page-sider ${themeStore.theme}-mode`}>
                    <NavLink to='/user/info' className={({ isActive }) => isActive ? activeClassName : unActiveClassName}>
                        Thông tin người dùng
                    </NavLink>
                    <NavLink to='/user/change-password'
                             className={({ isActive }) => isActive ? activeClassName : unActiveClassName}
                             activeClassName='info-page-nav-active'>
                        Đổi mật khẩu
                    </NavLink>
                </Sider>
                <Content className='user-info-page-content'>
                    {props.children}
                </Content>
            </Layout>
        </div>
    );
};

export default InfoPageLayout;