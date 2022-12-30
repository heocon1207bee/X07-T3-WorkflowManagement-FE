import { DatePicker, Form, Input, Select } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { FcBriefcase, FcHighPriority, FcLowPriority, FcMediumPriority, FcVlc } from 'react-icons/fc';
import JoditEditor from '../JoditEditor/JoditEditor';

import { CARD_ISSUE, CARD_TASK } from '../../configs/CARD_TYPES';
import {
    CARD_ISSUE_VN,
    CARD_TASK_VN,
    PRIORITY_HIGHEST_VN,
    PRIORITY_HIGH_VN,
    PRIORITY_LOWEST_VN,
    PRIORITY_LOW_VN,
    PRIORITY_MEDIUM_VN,
} from '../../configs/i18n/VietNamese';
import {
    PRIORITY_HIGH,
    PRIORITY_HIGHEST,
    PRIORITY_LOW,
    PRIORITY_LOWEST,
    PRIORITY_MEDIUM,
} from '../../configs/PRIORITIES';
import { ACCEPTED } from '../../configs/MEMBER_STATUS';
import useNotification from '../../hooks/Notification/useNotification';
import CardServices from '../../services/Project/Card/CardServices';

const { Option } = Select;

const CardForm = ({ form, members, setCloseModal, loadingAnimate }) => {
    const [content, setContent] = useState('');
    const { setLoading } = loadingAnimate;
    const { contextHolder, setNotificationWithIcon } = useNotification();
    const { projectId } = useParams();

    const assignee = members.reduce((assignee, item) => {
        if (item.status === ACCEPTED) assignee.push(item.member);
        return assignee;
    }, []);
    const [priority] = useState([
        {
            label: PRIORITY_HIGHEST_VN,
            value: PRIORITY_HIGHEST,
            icon: <FcHighPriority />,
        },
        {
            label: PRIORITY_HIGH_VN,
            value: PRIORITY_HIGH,
            icon: <FcHighPriority />,
        },
        {
            label: PRIORITY_MEDIUM_VN,
            value: PRIORITY_MEDIUM,
            icon: <FcMediumPriority />,
        },
        {
            label: PRIORITY_LOW_VN,
            value: PRIORITY_LOW,
            icon: <FcLowPriority />,
        },
        {
            label: PRIORITY_LOWEST_VN,
            value: PRIORITY_LOWEST,
            icon: <FcLowPriority />,
        },
    ]);

    const [cardType] = useState([
        {
            label: CARD_TASK_VN,
            value: CARD_TASK,
            icon: <FcBriefcase />,
        },
        {
            label: CARD_ISSUE_VN,
            value: CARD_ISSUE,
            icon: <FcVlc />,
        },
    ]);

    const handleFinish = async (values) => {
        const deadline = values.deadline.format('YYYY-MM-DD');
        const card = { ...values, deadline };
        console.log(values);
        return;
        try {
            setLoading(true);
            const cardCreated = await CardServices.create(projectId, card);
            setNotificationWithIcon({ type: 'success', message: cardCreated.data.msg });
        } catch (err) {
            if (Array.isArray(err.response.data)) {
                setNotificationWithIcon({ type: 'error', message: err.response.data[0].message });
            } else {
                setNotificationWithIcon({ type: 'error', message: err.response.data.msg });
            }
        } finally {
            setLoading(false);
            setCloseModal();
        }

        form.resetFields();
    };

    return (
        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{
                type: CARD_TASK,
                priority: PRIORITY_LOW,
            }}
            onFinish={handleFinish}
        >
            <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập Tiêu đề',
                    },

                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('title').trim().length !== 0) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Vui lòng nhập Tiêu đề'));
                        },
                    }),
                ]}
                validateTrigger={false}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Loại công việc" name="type">
                <Select>
                    {cardType.map((item, index) => (
                        <Option key={`${item.value}-${index}`} value={item.value}>
                            {item.icon}
                            <span style={{ paddingLeft: '10px' }}>{item.label}</span>
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Độ ưu tiên" name="priority">
                <Select>
                    {priority.map((item, index) => (
                        <Option key={`${item.value}-${index}`} value={item.value}>
                            {item.icon}
                            <span style={{ paddingLeft: '10px' }}>{item.label}</span>
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Người thực hiện"
                name="assignee"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng giao việc cho thành viên',
                    },
                ]}
                validateTrigger={false}
            >
                <Select>
                    {assignee &&
                        assignee.map((item) => (
                            <Option key={`${item._id}`} value={item._id}>
                                {item.fullname}
                            </Option>
                        ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Thời hạn"
                name="deadline"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập Thời hạn hoàn thành',
                    },
                ]}
                validateTrigger={false}
            >
                <DatePicker
                    format={'DD-MM-YYYY'}
                    disabledDate={(current) => {
                        let customDate = moment().format('DD-MM-YYYY');
                        return current && current < moment(customDate, 'DD-MM-YYYY');
                    }}
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item
                label="Mô tả công việc"
                name="description"
                rules={[
                    { required: true },
                    () => ({
                        validator(_, value) {
                            if (value !== '<p><br></p>') {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Vui lòng nhập Mô tả công việc'));
                        },
                    }),
                ]}
                validateTrigger={false}
            >
                <JoditEditor value={content} onChange={setContent} />
            </Form.Item>
            {contextHolder}
        </Form>
    );
};

export default CardForm;
