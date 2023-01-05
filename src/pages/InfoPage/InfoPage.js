import React from 'react';
import { useSelector } from 'react-redux';
import InfoPageLayout from '../../Layout/InfoPageLayout/InfoPageLayout'
import './InfoPage.style.scss'

const InfoPage = (props) => {
    const themeStore = useSelector(state => state.theme);
    return (
        <InfoPageLayout>
            <div className='user-info-container'>
                <div className='user-info-avatar'>
                    <img src='https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg'/>
                </div>
                <div className='user-info-inf'>
                    <UserInfoInf/>
                </div>
            </div>
        </InfoPageLayout>
    );
};

const UserInfoInf = () => {
    return (
        <div>
            <h1>Họ và tên: </h1>
            <p>Tuổi: </p>
            <p>Giới tính: </p>
            <p>Email: </p>
            <p>Số điện thoại: </p>
            <p>Địa chỉ: </p>
            <p>Mô tả bản thân: </p>
        </div>
    )
}

export default InfoPage;