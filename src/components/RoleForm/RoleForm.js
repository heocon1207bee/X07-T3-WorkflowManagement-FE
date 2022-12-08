import React from 'react';
import RoleItem from './RoleItem';

const RoleForm = () => {

    return (
        <div className='role-container'>
            <div className='role-label'>
                <h4>Vai trò trong dự án</h4>
                <button>Thêm vai trò mới</button>
            </div>
            <div className='role-list'>
                <RoleItem/>
                <RoleItem/>
            </div>
        </div>
    );
};

export default RoleForm;