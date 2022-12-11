import React from 'react';
import RoleItem from './RoleItem';
import {PlusOutlined} from '@ant-design/icons'
import CreateNewRole from './CreateNewRole'

const RoleForm = () => {

    return (
        <div className='role-container'>
            <div className='role-label'>
                <h4>Vai trò trong dự án</h4>
                <CreateNewRole/>
            </div>
            <div className='role-list'>
                <RoleItem/>
                <RoleItem/>
            </div>
        </div>
    );
};

export default RoleForm;