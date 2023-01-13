import { DatePicker, Form, Input, Select } from 'antd';
import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
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
import { FORM_CREATE, FORM_EDIT } from '../../configs/FORM_STATUS';

const { Option } = Select;

const CardForm = ({ form, members, setCloseModal, loadingAnimate = {}, cardFormType, currentCard }) => {
    const { setLoading } = loadingAnimate;
    const { contextHolder, setNotificationWithIcon } = useNotification();
    const { projectId } = useParams();
    const [content, setContent] = useState('');
    const dateFormat = useRef('DD-MM-YYYY');

    useEffect(() => {
        form.setFieldsValue({
            description: content,
        });
    }, [content, form]);

    useEffect(() => {
        if (currentCard) {
            const { title, priority, status, type, assignee, deadline, description } = currentCard;
            form.setFieldsValue({
                title,
                priority,
                status,
                type,
                assignee: assignee._id,
                deadline: dayjs(deadline),
            });
            setContent(description);
        } else {
            form.resetFields();
            setContent('');
        }
    }, [currentCard, form]);

    const assignee = members.reduce((assignee, item) => {
        if (item.status === ACCEPTED) assignee.push(item.user);
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

    const cardType = useRef([
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
        let cardApi;
        try {
            setLoading(true);
            if (cardFormType === FORM_CREATE) {
                cardApi = await CardServices.create(projectId, card);
            } else {
                cardApi = await CardServices.update(projectId, currentCard._id, card);
            }
            setNotificationWithIcon({ type: 'success', message: cardApi.data.msg });
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
        setContent('');
    };

    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
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
                    {cardType.current.map((item, index) => (
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
                    format={dateFormat.current}
                    disabledDate={(current) => {
                        return current && dayjs().isAfter(current, 'day');
                    }}
                    style={{ width: '50%' }}
                />
            </Form.Item>
            <Form.Item
                label="Mô tả công việc"
                name="description"
                rules={[
                    { required: true, message: 'Vui lòng nhập Mô tả công việc' },
                    () => ({
                        validator(_, value) {
                            if (value !== '<p><br></p>') {
                                return Promise.resolve();
                            }
                        },
                    }),
                ]}
                validateTrigger={'onBlur'}
            >
                <JoditEditor content={content} setContent={setContent} />
            </Form.Item>
            {contextHolder}
        </Form>
    );
};

export default CardForm;
