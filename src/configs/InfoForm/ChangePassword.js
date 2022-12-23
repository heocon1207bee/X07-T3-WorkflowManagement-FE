import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 21,
    },
  },
};


export default function ChangePassword() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

    return (
      <Form
        {... layout}
        form={form}
        onFinish={onFinish}
        style={{}}
      >
        <h3>Thay Đổi Mật Khẩu</h3>
        <Form.Item
          name="password"
          label="Mật Khẩu Hiện Tại"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền đầy đủ thông tin !!!',
            },
          ]}
        >
          <Input type='password'/>
        </Form.Item>
        <Form.Item
          name="newpassword"
          label="Mật Khẩu Mới"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền đầy đủ thông tin !!!',
            },
          ]}
        >
          <Input type='password'/>
        </Form.Item>
        <Form.Item
          name="confirmpassword"
          label="Xác Nhận Lại Mật Khẩu"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền đầy đủ thông tin !!!',
            },
          ]}
        >
          <Input type='password'/>
        </Form.Item>
        
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Hoàn Tất
          </Button>
        </Form.Item>
      </Form>
    );
  };