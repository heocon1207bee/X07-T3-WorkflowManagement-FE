import { useEffect, useState } from 'react';
import moment from 'moment';
import './ProjectForm.style.scss';
import { Form, Input, DatePicker, Select } from 'antd';
import { FcSynchronize, FcCheckmark, FcCancel } from 'react-icons/fc';
import TextArea from 'antd/es/input/TextArea';

import projectOwnerServices from '../../services/Project/ProjectOwnerServices';
import useNotification from '../../hooks/Notification/useNotification';
import { PROJECT_IN_PROGRESS, PROJECT_DONE, PROJECT_CANCEL } from '../../configs/PROJECT_STATUS';
import { PROJECT_CANCEL_VN, PROJECT_DONE_VN, PROJECT_IN_PROGRESS_VN } from '../../configs/i18n/VietNamese';
const { Option } = Select;

const ProjectForm = ({ form, setCloseModal, currentProject, isUpdate }) => {
    const { contextHolder, setNotificationWithIcon } = useNotification();
    const [status, setStatus] = useState([
        {
            label: PROJECT_IN_PROGRESS_VN,
            value: PROJECT_IN_PROGRESS,
            icon: <FcSynchronize />,
            disable: false,
        },
        {
            label: PROJECT_DONE_VN,
            value: PROJECT_DONE,
            icon: <FcCheckmark />,
            disable: true,
        },
        {
            label: PROJECT_CANCEL_VN,
            value: PROJECT_CANCEL,
            icon: <FcCancel />,
            disable: true,
        },
    ]);

    useEffect(() => {
        if (currentProject) {
            form.setFieldsValue({
                title: currentProject.title,
                target: currentProject.target,
                deadline: moment(currentProject.deadline, 'DD-MM-YYYY'),
            });
        }
    }, [form, currentProject]);

    useEffect(() => {
        if (isUpdate()) {
            setStatus((prev) => prev.map((item) => ({ ...item, disable: false })));
        } else {
            setStatus([
                {
                    label: PROJECT_IN_PROGRESS_VN,
                    value: PROJECT_IN_PROGRESS,
                    icon: <FcSynchronize />,
                    disable: false,
                },
                {
                    label: PROJECT_DONE_VN,
                    value: PROJECT_DONE,
                    icon: <FcCheckmark />,
                    disable: true,
                },
                {
                    label: PROJECT_CANCEL_VN,
                    value: PROJECT_CANCEL,
                    icon: <FcCancel />,
                    disable: true,
                },
            ]);
            form.resetFields();
        }
    }, [isUpdate, form]);

    const handleSubmit = async (values) => {
        const deadline = values.deadline.format('YYYY-MM-DD');
        const project = { ...values, deadline };
        const createProject = await projectOwnerServices.create(project);
        const updateProject = null;

        try {
            let projectApi;
            if (isUpdate()) {
                projectApi = updateProject;
            } else {
                projectApi = createProject;
            }

            setNotificationWithIcon({ type: 'success', message: projectApi.data.msg });
        } catch (err) {
            if (Array.isArray(err.response.data)) {
                setNotificationWithIcon({ type: 'error', message: err.response.data[0].message });
            } else {
                setNotificationWithIcon({ type: 'error', message: err.response.data.msg });
            }
        } finally {
            setCloseModal(false);
        }

        form.resetFields();
    };

    return (
        <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            onFinish={handleSubmit}
            initialValues={{
                status: status[0].value,
            }}
        >
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
                    format={'DD-MM-YYYY'}
                    disabledDate={(current) => {
                        let customDate = moment().format('DD-MM-YYYY');
                        return current && current < moment(customDate, 'DD-MM-YYYY');
                    }}
                    style={{ width: '60%' }}
                />
            </Form.Item>
            <Form.Item label="Trạng thái dự án" name="status">
                <Select style={{ width: '60%' }}>
                    {status.map((item, index) => (
                        <Option key={`${item.value}-${index}`} value={item.value} disabled={item.disable}>
                            {item.icon}
                            <span style={{ paddingLeft: '10px' }}>{item.label}</span>
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default ProjectForm;
