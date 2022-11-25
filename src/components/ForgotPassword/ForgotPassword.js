import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import './ForgotPassword.style.scss';

export default function ForgotPassword({ isShowModal, handleOk, handleCancel }) {
    const [loading, setLoading] = useState(false);
    const onFinish = (values) => {
        setLoading(true);
        console.log(values);

        setTimeout(() => {
            setLoading(false);
            handleOk();
        }, 3000);
    };
    return (
        <Form name="forgot-password" onFinish={onFinish}>
            <Modal
                title="Bạn quên mật khẩu?"
                open={isShowModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel} className="btn-cancel" size="large">
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        htmlType="submit"
                        className="btn-ok"
                        size="large"
                        form="forgot-password"
                        loading={loading}
                    >
                        Xác nhận
                    </Button>,
                ]}
            >
                <Form.Item
                    name="forgotPassword"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email' },
                        {
                            type: 'email',
                            message: 'Email không đúng định dạng',
                        },
                    ]}
                >
                    <Input className="input" placeholder="Email" />
                </Form.Item>
                <p className="text-require">Bắt buộc(*)</p>
            </Modal>
        </Form>
    );
}
