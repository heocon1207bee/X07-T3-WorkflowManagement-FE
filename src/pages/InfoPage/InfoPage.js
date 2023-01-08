import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InfoPageLayout from '../../Layout/InfoPageLayout/InfoPageLayout';
import './InfoPage.style.scss';
import { Form, Input, Select, Button } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai'

const InfoPage = () => {
    const [edit, setEdit] = useState(false);
    const themeStore = useSelector(state => state.theme);

    return (
        <InfoPageLayout>
            <div className='user-info-container'>
                <div className='user-info-avatar'>
                    <img
                        src='https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg' />
                </div>
                <div className='user-info'>
                    <button onClick={()=>{setEdit(!edit)}}><AiOutlineEdit/></button>
                    {edit?<UserInfoModal/>:<UserInfoInf />}
                </div>
            </div>
        </InfoPageLayout>
    );
};

export const UserInfoInf = () => {
    const userInfo = localStorage.getItem('worlflow_store') ? JSON.parse(localStorage.getItem('worlflow_store')) : {};
    return (
        <div className='user-info-info'>
            <h1>Họ và tên: {userInfo.user.fullname}</h1>
            <p>Tuổi: </p>
            <p>Giới tính: </p>
            <p>Email: {userInfo.user.email}</p>
            <p>Số điện thoại: </p>
            <p>Địa chỉ: </p>
            <p>Mô tả bản thân: </p>
        </div>
    );
};

export const UserInfoModal = () => {
    return (
        <Form>
            <Form.Item label='Họ và tên' required>
                <Input placeholder='Nhập họ và tên'/>
            </Form.Item>
            <Form.Item label='Tuổi'>
                <Input placeholder='Nhập tuổi'/>
            </Form.Item>
            <Form.Item label='Giới tính'>
                <Select placeholder='Giới tính'>
                    <Select.Option value='Nam'>Nam</Select.Option>
                    <Select.Option value='Nữ'>Nữ</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label='Email' required>
                <Input placeholder='Email'/>
            </Form.Item>
            <Form.Item label='Số điện thoại'>
                <Input type='phonenumber' placeholder='Nhập số điện thoại'/>
            </Form.Item>
            <Form.Item label='Địa chỉ'>
                <Input placeholder='Nhập địa chỉ'/>
            </Form.Item>
            <Form.Item label='Mô tả bản thân'>
                <Input.TextArea placeholder='Nhập mô tả bản thân'/>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>Lưu</Button>
            </Form.Item>
        </Form>
    );
};

export default InfoPage;