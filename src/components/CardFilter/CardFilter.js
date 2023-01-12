import React, {useState, useEffect} from "react";
import { Button, Form, Input, Select, Space } from 'antd';
import './CardFilter.style.scss'


export default function CardFilter(){


    return(
        <Form className={'card-filter'} style={{padding: '1rem 2rem'}} onFinish={values => {console.log(values)}}>
            <Form.Item name={'title'} label={'Tên dự án'}>
                <Input placeholder={'Nhập từ khóa tìm kiếm'}></Input>
            </Form.Item>
            <Space direction={'horizontal'} style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                <Form.Item name={'member'} label={'Thành viên'}>
                    <Select mode={'multiple'} style={{minWidth: '150px'}}>

                    </Select>
                </Form.Item>
                <Form.Item name={'priority'} label={'Độ ưu tiên'}>
                    <Select mode={'multiple'} style={{minWidth: '150px'}}>
                        <Select.Option value={'VERY_HIGH'} >Cao nhất</Select.Option>
                        <Select.Option value={'HIGH'} >Cao</Select.Option>
                        <Select.Option value={'NORMAL'} >Bình thường</Select.Option>
                        <Select.Option value={'LOW'} >Thấp</Select.Option>
                        <Select.Option value={'VERY_LOW'} >Rất thấp</Select.Option>
                    </Select>
                </Form.Item>
                <Space direction={'horizontal'}>
                    <Form.Item name={'type'} label={'Loại công việc'}>
                        <Select placeholder={'Loại công việc'}>
                            <Select.Option value={'TASK'}>Công việc</Select.Option>
                            <Select.Option value={'ISSUE'}>Vấn đề</Select.Option>
                        </Select>
                    </Form.Item>
                </Space>
            </Space>
            <Form.Item>
                <Button type={'primary'} htmlType={'submit'}>Hoàn tất</Button>
            </Form.Item>
        </Form>
    )
}