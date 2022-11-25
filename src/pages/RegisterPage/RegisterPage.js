import { LockOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import './ResiterPage.style.scss';

const { Title, Text } = Typography;

export default function RegisterPage() {
    const onFinish = (value) => {
        console.log(value);
    };
    return (
        <Row className="wrapper">
            <Col span={20} className="text-center" md={{ span: 6 }}>
                <Form name="register" className="form-wrapper" initialValues={{ remember: false }} onFinish={onFinish}>
                    <Title level={2} style={{ fontWeight: 400 }}>
                        Đăng ký tài khoản
                    </Title>
                    <Form.Item name="fullname" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                        <Input placeholder="Họ và tên *" className="input" />
                    </Form.Item>
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
                        <Input placeholder="Email *" className="input" type="email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                        <Input.Password placeholder="Mật khẩu" className="input" prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập xác nhận mật khẩu',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Xác nhận mật khẩu không đúng!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Xác nhận mật khẩu" className="input" />
                    </Form.Item>
                    <Form.Item className="text-require">
                        <Text className="text-red">(*) Bắt buộc</Text>
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" htmlType="submit" className="form-button">
                            Đăng ký
                        </Button>
                    </Form.Item>
                    <Text>
                        Đã có tài khoản?
                        <Link to="/login" component={Typography.Link}>
                            {' '}
                            Đăng nhập ngay
                        </Link>
                    </Text>
                </Form>
            </Col>
        </Row>
    );
}
