import { Button, Modal } from 'antd';
import { Form } from 'antd';

import ProjectForm from '../ProjectForm/ProjectForm';

import './ProjectModal.style.scss';

const ProjectModal = ({ modal, type }) => {
    const { openProject, setOpenProject } = modal;
    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        setOpenProject(false);
    };
    return (
        <Modal
            open={openProject}
            title="Tạo mới / chỉnh sửa dự án"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel} className="btn-cancel">
                    Hủy bỏ
                </Button>,
                <Button key="submit" onClick={handleOk} className="btn-ok">
                    Đồng ý
                </Button>,
            ]}
        >
            <ProjectForm form={form} setCloseModal={setOpenProject} type={type} />
        </Modal>
    );
};

export default ProjectModal;
