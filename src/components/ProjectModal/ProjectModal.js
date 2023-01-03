import { Button, Modal, Form } from 'antd';
import { useState, useCallback } from 'react';
import { FORM_EDIT } from '../../configs/FORM_STATUS';

import ProjectForm from '../ProjectForm/ProjectForm';

import './ProjectModal.style.scss';

const ProjectModal = ({ modal, type }) => {
    const { openProject, setOpenProject, currentProject } = modal;

    const isUpdate = useCallback(() => {
        return type === FORM_EDIT;
    }, [type]);

    const [header, setHeader] = useState(() => {
        if (isUpdate()) {
            return 'Tạo mới dự án';
        }
    });

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
            <ProjectForm
                form={form}
                setCloseModal={setOpenProject}
                currentProject={currentProject}
                isUpdate={isUpdate}
            />
        </Modal>
    );
};

export default ProjectModal;
