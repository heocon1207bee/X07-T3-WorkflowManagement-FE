import { LockOutlined, MailFilled } from '@ant-design/icons';
import { Row, Col, Typography, Form, Input, Button, Divider } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './LoginPage.style.scss';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const onFinish = (values) => {
        setLoading(true);
        console.log(values);
        setTimeout(() => setLoading(false), 3000);
    };
    return (
        <Row className="h-full">
            <Col span={16} className="flex-center bg-image">
                <Typography.Title className="welcome-text">Chào mừng đến với X07</Typography.Title>
            </Col>
            <Col span={8} className="flex-center">
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
                        >
                            <Input className="input" placeholder="Email*" prefix={<MailFilled />} />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                            <Input.Password placeholder="Mật khẩu*" prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item>
                            <Button size="large" htmlType="submit" className="button" loading={loading}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
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
