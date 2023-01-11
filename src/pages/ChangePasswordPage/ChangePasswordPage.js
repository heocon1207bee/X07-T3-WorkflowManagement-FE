import React from 'react';
import { useSelector } from 'react-redux';
import InfoPageLayout from '../../Layout/InfoPageLayout/InfoPageLayout'
import './ChangePasswordPage.style.scss'
import { Form, Input, Button } from 'antd';

const ChangePasswordPage = (props) => {
    const themeStore = useSelector(state => state.theme);
    console.log('change password page loaded')
    return (
        <InfoPageLayout>
            <div className='change-password-container'>
                <h1>Đổi mật khẩu</h1>
                <Form labelCol={{span: 5}} autoComplete='off' onFinish={(values)=>console.log(values)}>
                    <Form.Item name={'old_password'} label='Old Password' required>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item name={'new_password'} label='New Password' required>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item name={'confirm'} label='Confirm New Password' required>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 22, span: 22 }}>
                        <Button type="primary" htmlType="submit">
                            Đồng ý
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </InfoPageLayout>
    );
};

export default ChangePasswordPage;