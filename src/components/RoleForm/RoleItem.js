import React from 'react';

const RoleItem = ({roleName='Chưa có tên'}) => {
    return (
        <div className='role-item'>
            <p>{roleName}</p>
            <button>Chỉnh sửa</button>
        </div>
    );
};

export default RoleItem;