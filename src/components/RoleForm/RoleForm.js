import React from 'react';
import RoleItem from './RoleItem';
import {PlusOutlined} from '@ant-design/icons'

const RoleForm = () => {

    return (
        <div className='role-container' onClick={e => e.stopPropagation()}>
            <div className='role-label'>
                <h4>Vai trò trong dự án</h4>
                <button>Thêm vai trò mới <PlusOutlined /></button>
            </div>
            <div className='role-list'>
                <RoleItem/>
                <RoleItem/>
            </div>
        </div>
    );
};

export default RoleForm;