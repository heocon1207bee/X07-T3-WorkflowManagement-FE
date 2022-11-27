
import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
const { Option } = Select;


const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function UpdateUsers() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

    return (
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Họ và Tên"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền đầy đủ thông tin !!!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        
        <Form.Item
          name="age"
          label="Ngày Sinh"
          rules={[
            {
              required: true,
              message: 'Vui vòng điền đầy đủ thông tin !!!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Giới Tính"
          rules={[
            {
              required: true,
              message: 'Vui vòng điền đầy đủ thông tin !!!',
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
  
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Vui vòng điền đầy đủ thông tin !!!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name="introduce"
          label="Giới Thiệu Bản Thân"
          rules={[
            {
              required: true,
              message: 'Vui vòng điền đầy đủ thông tin !!!',
            },
          ]}
        >
          <Input.TextArea showCount maxLength={500} />
        </Form.Item>
  
        
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Hoàn Tất
          </Button>
        </Form.Item>
      </Form>
    );
  };
