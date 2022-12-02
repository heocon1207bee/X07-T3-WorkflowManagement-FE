
import React from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
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
      <Form form={form} onFinish={onFinish}>
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
              message: 'Vui lòng định dạng Email!!!',
            },
            {
              required: true,
              message: 'Vui lòng điền đầy đủ thông tin !!!',
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
          <Select placeholder="Chọn giới tính">
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
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
          <Button type="primary" htmlType="submit" style={{}}>
            Hoàn Tất
          </Button>
        </Form.Item>
      </Form>     
    );
  };
