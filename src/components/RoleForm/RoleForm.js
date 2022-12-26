import React, { useState } from 'react';
import RoleItem from './RoleItem';
import CreateNewRole from './CreateNewRole';
import { Modal, Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons'

const RoleForm = (props) => {
    const [addRole, setAddRole] = useState(false);

    return (
        <Modal title='Vai trò trong dự án'
               className='role-container'
               open={props.opening}
               onCancel={props.handleOpen}
               footer={[<Button onClick={e => {
                   e.preventDefault();
                   setAddRole(true);
               }}>Tạo mới vai trò <PlusOutlined/></Button>]}>
            {/*<div className='role-container' onClick={e => e.stopPropagation()}>*/}
            {/*    <div className='role-label'>*/}
            {/*        <h4>Vai trò trong dự án</h4>*/}
            <CreateNewRole open={addRole} close={e => setAddRole(false)} />
            {/*</div>*/}
            <div className='role-list'>
                <RoleItem />
                <RoleItem />
            </div>
            {/*</div>*/}
        </Modal>

    );
};

export default RoleForm;