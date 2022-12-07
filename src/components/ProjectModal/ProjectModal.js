import { Modal } from 'antd';

const ProjectForm = ({ modal }) => {
    const { openProject, setOpenProject } = modal;
    const handleOk = () => {
        setOpenProject(false);
    };
    const handleCancel = () => {
        setOpenProject(false);
    };
    return (
        <Modal open={openProject} title="Tạo mới / chỉnh sửa dự án" onOk={handleOk} onCancel={handleCancel}>
            <p>Some content</p>
        </Modal>
    );
};

export default ProjectForm;
