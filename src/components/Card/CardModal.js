import { Button, Modal, Form } from 'antd';
import { useState } from 'react';
import CardForm from './CardForm';

import './Card.style.scss'

const CardModal = ({ modal, members }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        modal.setOpenModal(false);
    };

    return (
        <Modal
            open={modal.openModal}
            title="Tạo mới công việc"
            footer={[
                <Button key="back" onClick={handleCancel} className="btn-cancel">
                    Hủy bỏ
                </Button>,
                <Button key="submit" onClick={handleOk} className="btn-ok" loading={loading}>
                    Đồng ý
                </Button>,
            ]}
            closable={false}
            className='modal-card'
        >
            <CardForm
                form={form}
                members={members}
                setCloseModal={() => modal.setOpenModal(false)}
                loadingAnimate={{ loading, setLoading }}
            />
        </Modal>
    );
};

export default CardModal;
