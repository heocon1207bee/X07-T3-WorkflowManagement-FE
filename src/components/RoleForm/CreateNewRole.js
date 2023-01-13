import React, { useState } from 'react';
import { Button, Input, Modal, Space, Checkbox } from 'antd';
//import Checkbox from 'antd/es/checkbox/Checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import './CreateNewRole.style.scss';
import ProjectServices from '../../services/Project/projectServices';

import {
    CREATE_CARD_ID,
    DELETE_CARD_ID,
    MANAGE_MEMBER_ID,
    MANAGE_ROLE_ID,
    UPDATE_ASSIGNEE_ID,
    UPDATE_CARD_STATUS_ID,
    UPDATE_CARD_ID,
    UPDATE_PROJECT_ID,
} from '../../configs/CAPABILITIES';

export default function CreateNewRole(props) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState();

    // const showModal = () => {
    //   setOpen(true);
    // };
    const handleOk = (e) => {
        setLoading(true);
        const promise = new Promise(() => {
            postRole(props.projectId, inputValue, checkboxValue);
        })
            .then(props.submit())
            .finally(() => {
                setLoading(false);
            });
    };

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
            console.log('end role post');
        }
    };

    const onChange = (checkedValues) => {
        console.log('radio checked', checkedValues);
        setCheckboxValue([...checkedValues]);
    };

    return (
        <>
            <Modal
                open={props.open}
                title='Thêm vai trò mới/chỉnh sửa'
                onOk={handleOk}
                onCancel={props.close}
                className='role-modal'
                footer={[
                    <Button className='close-role-btn' key='back' onClick={props.close}>
                        Hủy
                    </Button>,
                    <Button
                        className='submit-role-btn'
                        key='submit'
                        type='primary'
                        loading={loading}
                        onClick={(e) => {
                            handleOk(e);
                        }}
                    >
                        Tạo
                    </Button>,
                ]}
            >
                <Input
                    placeholder='Tên Vai Trò Mới'
                    value={inputValue}
                    onChange={(e) => {
                        e.preventDefault();
                        setInputValue(e.target.value);
                    }}
                ></Input>
                <Checkbox.Group onChange={onChange} value={checkboxValue}>
                    <Space direction='vertical' style={{ marginTop: '10px' }}>
                        <Checkbox value={UPDATE_PROJECT_ID}>Quyền P1: Cập nhật dự án</Checkbox>
                        <Checkbox value={MANAGE_MEMBER_ID}>Quyền P2: Quản lý thành viên</Checkbox>
                        <Checkbox value={CREATE_CARD_ID}>Quyền P3: Tạo mới công việc</Checkbox>
                        <Checkbox value={UPDATE_CARD_ID}>Quyền P4: Cập nhật thông tin chung công việc</Checkbox>
                        <Checkbox value={UPDATE_CARD_STATUS_ID}>Quyền P5: Cập nhật trạng thái công việc</Checkbox>
                        <Checkbox value={UPDATE_ASSIGNEE_ID}>Quyền P6: Cập nhật người thực hiện công việc</Checkbox>
                        <Checkbox value={DELETE_CARD_ID}>Quyền P7: Hủy bỏ công việc</Checkbox>
                        <Checkbox value={MANAGE_ROLE_ID}>Quyền P8: Quản lý vai trò</Checkbox>
                    </Space>
                </Checkbox.Group>
            </Modal>
        </>
    );
}
