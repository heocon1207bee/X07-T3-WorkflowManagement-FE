import { DatePicker, Form, Input, Select } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { FcBriefcase, FcHighPriority, FcLowPriority, FcMediumPriority, FcVlc } from 'react-icons/fc';
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
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;

const CardForm = ({ form }) => {
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

    const [assignee] = useState([
        {
            name: 'Nguyen Van A',
            user_id: '1234567890',
        },
    ]);

    const handleFinish = (values) => {
        console.log(values);
    };

    return (
        <Form
            form={form}
            labelCol={{ span: 8 }}
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
                    {assignee.map((item) => (
                        <Option key={`${item.user_id}`} value={item.user_id}>
                            {item.name}
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
                    {
                        required: true,
                        message: 'Vui lòng nhập mô tả công việc',
                    },
                ]}
            >
                <TextArea></TextArea>
            </Form.Item>
        </Form>
    );
};

export default CardForm;
