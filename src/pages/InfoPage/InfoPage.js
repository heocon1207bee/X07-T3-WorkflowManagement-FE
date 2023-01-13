import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InfoPageLayout from '../../Layout/InfoPageLayout/InfoPageLayout';
import './InfoPage.style.scss';
import { Form, Input, Select, Button, Spin, notification } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import userServices from '../../services/User/userServices';

const InfoPage = () => {
    const [edit, setEdit] = useState(false);
    const themeStore = useSelector(state => state.theme);
    const [userData, setUserData] = useState([]);
    const [statusUpdate, setStatusUpdate] = useState('');
    const [gError, setGError] = useState();
    const [uError, setUError] = useState();
    const [loading, setLoading] = useState(false);

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mes, des) => {
        api[type]({
            message: mes,
            description: des,
        });
    };

    useEffect(() => {
        !edit && getUserServices(setGError);
    }, [edit, statusUpdate]);

    const getUserServices = async (setError) => {
        try {
            const getUserData = await userServices.getUserData();
            setUserData(getUserData.data.data);
        } catch (err) {
            if (err.response && Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setError(errorValue);
            } else if (err.response) {
                setError(err.response.data.msg);
            } else {
                setError(err.message);
            }
        }
    };

    const postUserDataServices = async (setError, data) => {
        try {
            await userServices.updateUserData(data);
        } catch (err) {
            if (err.response && Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setError(errorValue);
            } else if (err.response) {
                setError(err.response.data.msg);
            } else {
                setError(err.message);
            }
        }
    };

    const handleUpdate = async (data) => {
        setUError();
        setLoading(true);
        await postUserDataServices(setUError, data);
        uError ? openNotificationWithIcon('error', 'Chưa thể cập nhật', uError) : openNotificationWithIcon('success', 'Đã cập nhật', 'Bạn đã thay đổi thông tin');
        setStatusUpdate(`cập nhật xong lúc ${new Date().getTime()}`);
        setLoading(false);
    };

    return (
        <InfoPageLayout>
            <div className='user-info-container'>
                <div className='user-info-avatar'>
                    <img
                        src='https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg' />
                </div>
                <div className='user-info'>
                    <button className='edit-info-button' onClick={() => {
                        setEdit(!edit);
                    }}><AiOutlineEdit /></button>
                    {loading && <Spin />}
                    {edit ? <UserInfoModal data={userData} handleUpdate={handleUpdate} setEdit={setEdit} /> :
                        <UserInfoInf data={userData} />}
                </div>
            </div>
        </InfoPageLayout>
    );
};

export const UserInfoInf = ({ data }) => {
    return (
        <div className='user-info-info'>
            <h1>Họ và tên: {data.fullname}</h1>
            <p>Tuổi: {data.age}</p>
            <p>Giới tính: {data.gender}</p>
            <p>Email: {data.email}</p>
            <p>Số điện thoại: {data.phone}</p>
            <p>Địa chỉ: {data.address}</p>
            <p>Mô tả bản thân: {data.bio}</p>
        </div>
    );
};

export const UserInfoModal = ({ data, handleUpdate, setEdit }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldValue({});
    }, []);

    const handleFinish = (values) => {
        console.log(values);
        let sendValue = {};
        if (values.fullname.trim() !== '') sendValue = { ...sendValue, fullname: values.fullname };
        if (values.age.trim() !== '' && values.age !== null) sendValue = {
            ...sendValue,
            age: Number.parseInt(values.age),
        };
        if (values.gender !== '') sendValue = { ...sendValue, gender: values.gender };
        if (values.phone.trim() !== '') sendValue = { ...sendValue, phone: values.phone };
        if (values.address.trim() !== '') sendValue = { ...sendValue, address: values.address };
        if (values.bio.trim() !== '') sendValue = { ...sendValue, bio: values.bio };
        handleUpdate(sendValue);
        setEdit(false);
    };


    return (
        <Form name={'basic'} form={form} initialValues={{ ...data, age: data.age ? data.age.toString() : '8' }}
              layout={'horizontal'}
              labelCol={{ span: 5 }}
              onFinish={handleFinish}>
            <Form.Item name={'fullname'} label='Họ và tên'
                       rules={[{ required: true, message: 'Không được bỏ trống' }, { type: 'string' }]} required>
                <Input placeholder='Nhập họ và tên' />
            </Form.Item>
            <Form.Item name={'age'} label='Tuổi'
                       rules={[{
                           pattern: /^(?:\d*)$/,
                           message: 'Nhập đúng số tuổi',
                       }, { type: null }, {
                           pattern: /^(?:1[01][0-9]|120|1[0-9]|[2-9][0-9]|[8-9])$/,
                           message: 'Tuổi từ 8 đến 120',
                       }, {
                           type: 'string',
                       }]}>
                <Input placeholder='Nhập tuổi' />
            </Form.Item>
            <Form.Item name={'gender'} label='Giới tính'>
                <Select placeholder='Giới tính'>
                    <Select.Option value='male'>Nam</Select.Option>
                    <Select.Option value='female'>Nữ</Select.Option>
                </Select>
            </Form.Item>
            {/*<Form.Item name={'email'} label='Email' rules={[{ type: 'email', message: 'Hãy nhập đúng định dạng' }, {*/}
            {/*    required: true,*/}
            {/*    message: 'Không được để trống',*/}
            {/*}]} required>*/}
            {/*    <Input placeholder='Email' />*/}
            {/*</Form.Item>*/}
            <Form.Item name={'phone'} label='Số điện thoại'
                       rules={[{
                           pattern: /^[\d]{0,15}$/,
                           message: 'Vui lòng nhập dưới 15 ký tự',
                       }, {
                           pattern: /^(?:\d*)$/,
                           message: 'Vui lòng nhập đúng số điện thoại',
                       }, {
                           pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                           message: 'Vui lòng nhập đúng số điện thoại Việt Nam',
                       }]}>
                <Input type='phonenumber' placeholder='Nhập số điện thoại' />
            </Form.Item>
            <Form.Item name={'address'} label='Địa chỉ' rules={[{ type: 'string' }]}>
                <Input placeholder='Nhập địa chỉ' />
            </Form.Item>
            <Form.Item name={'bio'} label='Mô tả bản thân' rules={[{ type: 'string' }]}>
                <Input.TextArea placeholder='Nhập mô tả bản thân' />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                <Button type='primary' htmlType='submit'>Lưu</Button>
            </Form.Item>
        </Form>
    );
};

export default InfoPage;