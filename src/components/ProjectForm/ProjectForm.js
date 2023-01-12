import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import './ProjectForm.style.scss';
import { Form, Input, DatePicker, Select } from 'antd';
import { FcSynchronize, FcCheckmark, FcCancel } from 'react-icons/fc';
import TextArea from 'antd/es/input/TextArea';

import projectOwnerServices from '../../services/Project/ProjectOwnerServices';
import useNotification from '../../hooks/Notification/useNotification';
import { PROJECT_IN_PROGRESS, PROJECT_DONE, PROJECT_CANCEL } from '../../configs/PROJECT_STATUS';
import { PROJECT_CANCEL_VN, PROJECT_DONE_VN, PROJECT_IN_PROGRESS_VN } from '../../configs/i18n/VietNamese';
const { Option } = Select;

const ProjectForm = ({ form, setCloseModal, currentProject, isUpdate, loadingAnimate }) => {
    const { contextHolder, setNotificationWithIcon } = useNotification();
    const status = useRef([
        {
            label: PROJECT_IN_PROGRESS_VN,
            value: PROJECT_IN_PROGRESS,
            icon: <FcSynchronize />,
        },
        {
            label: PROJECT_DONE_VN,
            value: PROJECT_DONE,
            icon: <FcCheckmark />,
        },
        {
            label: PROJECT_CANCEL_VN,
            value: PROJECT_CANCEL,
            icon: <FcCancel />,
        },
    ]);
    const dateFormat = useRef('DD-MM-YYYY');

    useEffect(() => {
        if (currentProject) {
            form.setFieldsValue({
                title: currentProject.title,
                target: currentProject.target,
                status: currentProject.status,
                deadline: dayjs(currentProject.deadline),
            });
        }
    }, [form, currentProject]);

    const handleSubmit = async (values) => {
        const deadline = values.deadline.format('YYYY-MM-DD');
        const project = { ...values, deadline };
        let projectApi;
        try {
            loadingAnimate.setLoading(true);
            if (isUpdate()) {
                projectApi = await projectOwnerServices.update(currentProject.id, project);
            } else {
                projectApi = await projectOwnerServices.create(project);
            }

            setNotificationWithIcon({ type: 'success', message: projectApi.data.msg });
        } catch (err) {
            if (Array.isArray(err.response.data)) {
                setNotificationWithIcon({ type: 'error', message: err.response.data[0].message });
            } else {
                setNotificationWithIcon({ type: 'error', message: err.response.data.msg });
            }
        } finally {
            loadingAnimate.setLoading(false);
            setCloseModal(false);
        }

        form.resetFields();
    };

    return (
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 20 }} onFinish={handleSubmit}>
            {contextHolder}
            <Form.Item
                label="Tiêu đề dự án"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập Tiêu đề dự án',
                    },

                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('title').trim().length !== 0) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Vui lòng nhập Tiêu đề dự án'));
                        },
                    }),
                ]}
                validateTrigger={false}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Mục tiêu"
                name="target"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập Mục tiêu',
                    },

                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('target').trim().length !== 0) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Vui lòng nhập Mục tiêu'));
                        },
                    }),
                ]}
            >
                <TextArea />
            </Form.Item>
            <Form.Item
                label="Thời hạn dự kiến"
                name="deadline"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập Thời hạn dự kiến',
                    },
                ]}
            >
                <DatePicker
                    format={dateFormat.current}
                    disabledDate={(current) => {
                        return current && dayjs().isAfter(current, 'day');
                    }}
                    style={{ width: '60%' }}
                />
            </Form.Item>
            {isUpdate() && (
                <Form.Item label="Trạng thái dự án" name="status">
                    <Select style={{ width: '60%' }}>
                        {status.current.map((item, index) => (
                            <Option key={`${item.value}-${index}`} value={item.value}>
                                {item.icon}
                                <span style={{ paddingLeft: '10px' }}>{item.label}</span>
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
        </Form>
    );
};

export default ProjectForm;
