import React, { useState } from 'react';
import { Button, Input, Modal, Space, Checkbox, Row, Col } from 'antd';
//import Checkbox from 'antd/es/checkbox/Checkbox';
import type {CheckboxValueType} from 'antd/es/checkbox/Group'
import './CreateNewRole.style.scss'
import roleForm from './RoleForm';
import ProjectServices from '../../services/Project/projectServices';
import projectList from '../ProjectList/ProjectList';
import {Spin} from 'antd';

export default function CreateNewRole(props) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState()

    // const showModal = () => {
    //   setOpen(true);
    // };
    const handleOk = (e) => {
        setLoading(true);
        const promise = new Promise(()=>{
            postRole(props.projectId, inputValue, checkboxValue);
        }).then(
            props.submit()
        ).finally(()=>{
            setLoading(false);
        })
    };
    // const handleCancel = () => {
    //   setOpen(false);
    // };

    const postRole = async (projectId, roleName, capabilities) => {
        try {
            const postRoleResponse = await ProjectServices.addRole(projectId, roleName, capabilities);
        } catch (err) {
            if (err.response && Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setError(errorValue);
            } else if (err.response) {
                setError(err.response.data.msg);
            } else {
                setError(err.message);
            }
        } finally {
            console.log('end role post')
        }
    }

    const onChange = (checkedValues: CheckboxValueType[]) => {
        console.log('radio checked', checkedValues);
        setCheckboxValue([...checkedValues]);
    }
    return (
      <>
        <Modal
          open={props.open}
          title="Thêm vai trò mới/chỉnh sửa"
          onOk={handleOk}
          onCancel={e => {
              props.close();
            }
          }
          className='role-modal'
          footer={[
            <Button className='close-role-btn' key="back" onClick={e=>{ props.close()}} >
                Hủy
            </Button>,
            <Button className='submit-role-btn' key="submit" type="primary" loading={loading} onClick={e=>{handleOk(e)}}>
              Tạo
            </Button>,
          ]}
        >
         <Input placeholder='Tên Vai Trò Mới' value={inputValue} onChange={e=>{e.preventDefault(); setInputValue(e.target.value)}}></Input>
         <Checkbox.Group onChange={onChange} >
            <Space direction="vertical" style={{marginTop:'10px'}}>
                <Checkbox value={'6396f45d5ddd6db8260440c9'}>Quyền P1: Cập nhật dự án</Checkbox>
                <Checkbox value={'6396f45d5ddd6db8260440c4'}>Quyền P2: Quản lý thành viên</Checkbox>
                <Checkbox value={'6396f45d5ddd6db8260440c2'}>Quyền P3: Tạo mới công việc</Checkbox>
                <Checkbox value={'6396f45d5ddd6db8260440c7'}>Quyền P4: Cập nhật thông tin chung công việc</Checkbox>
                <Checkbox value={'6396f45d5ddd6db8260440c8'}>Quyền P5: Cập nhật trạng thái công việc</Checkbox>
                <Checkbox value={'6396f45d5ddd6db8260440c6'}>Quyền P6: Cập nhật người thực hiện công việc</Checkbox>
                <Checkbox value={'6396f45d5ddd6db8260440c3'}>Quyền P7: Hủy bỏ công việc</Checkbox>
                <Checkbox value={'6396f45d5ddd6db8260440c5'}>Quyền P8: Quản lý vai trò</Checkbox>
            </Space>
         </Checkbox.Group>
        </Modal>
      </>
    );
  };
