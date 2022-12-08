import moment from 'moment';
import { Form, Input, DatePicker, Select } from 'antd';
import { FcSynchronize, FcCheckmark, FcCancel } from 'react-icons/fc';
import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;

const ProjectForm = ({ form, setCloseModal }) => {
    const handleSubmit = (values) => {
        setCloseModal(false);
        console.log(values);
    };
    const handleFinishFailed = () => {};
    const items = [
        {
            label: 'Đang thực hiện',
            value: 'in_process',
            icon: <FcSynchronize />,
        },
        {
            label: 'Hoàn thành',
            value: 'done',
            icon: <FcCheckmark />,
        },
        {
            label: 'Đã hủy',
            value: 'cancel',
            icon: <FcCancel />,
        },
    ];

    return (
        <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            onFinish={handleSubmit}
            onFinishFailed={handleFinishFailed}
            initialValues={{
                status: items[0].value,
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
                    {items &&
                        items.map((item, index) => (
                            <Option key={`${item.value}-${index}`} value={item.value}>
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
