import React, {useState, useEffect} from "react";
import { Button, Form, Input, Select, Space } from 'antd';
import './CardFilter.style.scss'
import { useSelector, useDispatch } from 'react-redux';
import { BiFilterAlt } from 'react-icons/bi';


export default function CardFilter({members, formClose}){
    const themeStore = useSelector(state => state.theme)
    const filterStore = useSelector(state => state.filterValue);
    const dispatch = useDispatch();

    useEffect(()=>{},[filterStore])

    const handleFinish = (values) => {
        dispatch({type: 'filterInput', value: values});
    }

    const handleCancel = () => {
        dispatch({type: 'filterInput', value: {title: '', member: [], priority:[], type:''}});
        formClose();
    }

    return(
        <Form className={`${themeStore.theme}-mode filter-form`} style={{padding: '1rem 2rem'}} initialValues={{title: '', member: [], priority:[], type:''}} onFinish={handleFinish}>
            <Form.Item name={'title'} label={'Tên dự án'} className={`${themeStore.theme}-mode`}>
                <Input placeholder={'Nhập từ khóa tìm kiếm'}></Input>
            </Form.Item>
            <Space direction={'horizontal'} style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                <Form.Item name={'member'} label={'Thành viên'} className={`${themeStore.theme}-mode`}>
                    <Select mode={'multiple'} style={{minWidth: '150px', width: '300px'}}>
                        {members.map(m => {
                            return (
                                <Select.Option key={m._id} value={m.user._id}>{m.user.fullname}</Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name={'priority'} label={'Độ ưu tiên'} className={`${themeStore.theme}-mode`}>
                    <Select mode={'multiple'} style={{minWidth: '150px', width: '300px'}}>
                        <Select.Option value={'VERY_HIGH'} >Cao nhất</Select.Option>
                        <Select.Option value={'HIGH'} >Cao</Select.Option>
                        <Select.Option value={'NORMAL'} >Bình thường</Select.Option>
                        <Select.Option value={'LOW'} >Thấp</Select.Option>
                        <Select.Option value={'VERY_LOW'} >Rất thấp</Select.Option>
                    </Select>
                </Form.Item>
                <Space direction={'horizontal'}>
                    <Form.Item name={'type'} label={'Loại công việc'} className={`${themeStore.theme}-mode`}>
                        <Select placeholder={'Loại công việc'}>
                            <Select.Option value={''}>Không lọc</Select.Option>
                            <Select.Option value={'TASK'}>Công việc</Select.Option>
                            <Select.Option value={'ISSUE'}>Vấn đề</Select.Option>
                        </Select>
                    </Form.Item>
                </Space>
            </Space>
            <Space direction={'horizontal'}>
                <Form.Item>
                    <Button className='cancel-filter-button' onClick={handleCancel}>Bỏ lọc</Button>
                </Form.Item>
                <Form.Item>
                    <Button className='filter-button' type={'primary'} htmlType={'submit'}>Lọc kết quả <span style={{width: '5px'}}></span> <BiFilterAlt /></Button>
                </Form.Item>
            </Space>
        </Form>
    )
}