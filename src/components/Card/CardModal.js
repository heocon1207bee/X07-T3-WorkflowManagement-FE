import { Button, Modal, Form } from 'antd';
import CardForm from './CardForm';

const CardModal = ({ modal, type }) => {
    const [form] = Form.useForm();

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
                <Button key="submit" onClick={handleOk} className="btn-ok">
                    Đồng ý
                </Button>,
            ]}
        >
            <CardForm form={form} />
        </Modal>
    );
};

export default CardModal;
