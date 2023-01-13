import { Button, Modal, Form } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import { FORM_EDIT } from '../../configs/FORM_STATUS';

import ProjectForm from '../ProjectForm/ProjectForm';

import './ProjectModal.style.scss';

const ProjectModal = ({ modal, type }) => {
    const { openProject, setOpenProject, currentProject } = modal;
    const [loading, setLoading] = useState(false);

    const isUpdate = useCallback(() => {
        return type === FORM_EDIT;
    }, [type]);

    const [header, setHeader] = useState(() => {
        if (isUpdate()) {
            return 'Tạo mới dự án';
        } else {
            return 'Chỉnh sửa dự án';
        }
    });
    useEffect(() => {
        setHeader(() => {
            if (isUpdate()) {
                return 'Chỉnh sửa dự án';
            } else {
                return 'Tạo mới dự án';
            }
        });
    }, [isUpdate]);

    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        setOpenProject(false);
        form.resetFields();
    };

    return (
        <Modal
            open={openProject}
            title={header}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel} className="btn-cancel">
                    Hủy bỏ
                </Button>,
                <Button key="submit" onClick={handleOk} className="btn-ok" loading={loading}>
                    Đồng ý
                </Button>,
            ]}
        >
            <ProjectForm
                form={form}
                setCloseModal={setOpenProject}
                currentProject={currentProject}
                isUpdate={isUpdate}
                loadingAnimate={{ setLoading }}
            />
        </Modal>
    );
};

export default ProjectModal;
