import { LockOutlined, MailFilled } from '@ant-design/icons';
import { Row, Col, Typography, Form, Input, Button, Divider, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';
import authenServices from '../../services/Authen/authenServices';
import { setAuthentication } from '../../stores/reducers/Auth/authenSlice';

import './LoginPage.style.scss';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const authenResponse = await authenServices.login(values);
            if (authenResponse) dispatch(setAuthentication(authenResponse.data));
            navigate('/');
        } catch (err) {
            if (Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setError(errorValue);
            } else {
                setError(err.response.data.msg);
            }
        } finally {
            setLoading(false);
        }
    };
    const [isShowModal, setIsShowModal] = useState(false);
    const onForgotPassword = () => {
        setIsShowModal(true);
    };
    const handleOk = () => {
        setIsShowModal(false);
    };
    const handleCancel = () => {
        setIsShowModal(false);
    };

    return (
        <Row className="h-full login-wrap">
            <Col span={24} lg={{ span: 16 }} md={{ span: 12 }} className="flex-center bg-image">
                <Typography.Title className="welcome-text">Chào mừng đến với X07</Typography.Title>
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }} className="flex-center">
                <div className="form-content">
                    <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                {
                                    type: 'email',
                                    message: 'Email không đúng định dạng',
                                },
                            ]}
                            validateTrigger={false}
                        >
                            <Input className="input" placeholder="Email*" prefix={<MailFilled />} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                            validateTrigger={false}
                        >
                            <Input.Password placeholder="Mật khẩu*" prefix={<LockOutlined />} />
                        </Form.Item>
                        {error && <Alert className="alert" showIcon description={error} type="error" />}
                        <Form.Item>
                            <Button size="large" htmlType="submit" className="button" loading={loading}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <p className="text-center forgot-password" onClick={onForgotPassword}>
                        Quên mật khẩu?
                    </p>
                    <ForgotPassword handleOk={handleOk} handleCancel={handleCancel} isShowModal={isShowModal} />
                    <Divider className="divider" />
                    <p className="text-center">hoặc</p>
                    <Link component={Typography.Link} to="/register" size="large" className="btn-register text-center">
                        Đăng ký
                    </Link>
                </div>
            </Col>
        </Row>
    );
}
