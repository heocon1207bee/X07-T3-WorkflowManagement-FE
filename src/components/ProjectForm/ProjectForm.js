import moment from 'moment';
import { Form, Input, DatePicker, Select } from 'antd';
import { FcSynchronize, FcCheckmark, FcCancel } from 'react-icons/fc';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { FORM_EDIT, FORM_CREATE } from '../../configs/FORM_STATUS';
const { Option } = Select;

const ProjectForm = ({ form, setCloseModal, type }) => {
    const [status, setStatus] = useState([
        {
            label: 'Đang thực hiện',
            value: 'in_process',
            icon: <FcSynchronize />,
            disable: false,
        },
        {
            label: 'Hoàn thành',
            value: 'done',
            icon: <FcCheckmark />,
            disable: true,
        },
        {
            label: 'Đã hủy',
            value: 'cancel',
            icon: <FcCancel />,
            disable: true,
        },
    ]);

    useEffect(() => {
        if (type === FORM_EDIT) {
            setStatus((prev) => prev.map((item) => ({ ...item, disable: false })));
        }
    }, [type]);

    const handleSubmit = (values) => {
        setCloseModal(false);
        console.log(values);
    };
    const handleFinishFailed = () => {};

    return (
        <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            onFinish={handleSubmit}
            onFinishFailed={handleFinishFailed}
            initialValues={{
                status: status[0].value,
            }}
        >
            <Form.Item
                label="Tiêu đề dự án"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập Tiêu đề dự án',
                    },
                ]}
                validateTrigger={false}
            >
                <Input className="input" />
            </Form.Item>
            <Form.Item
                label="Mục tiêu"
                name="target"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập Mục tiêu',
                    },
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
