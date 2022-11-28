import React from 'react';
import { Tooltip } from 'antd';
import {
    UsergroupAddOutlined,
    UserSwitchOutlined,
    EditOutlined
} from '@ant-design/icons'

const ProjectItem = () => {
    return (
        <div className='project-item'>
            <h4>Tên dự án</h4>
            <p>Người tạo: Tên Người Tạo</p>
            <div className='project-option-button'>
                <Tooltip title='Thành viên' placement='bottom'>
                    <button><UsergroupAddOutlined /></button>
                </Tooltip>
                <Tooltip title='Vai trò' placement='bottom'>
                    <button><UserSwitchOutlined /></button>
                </Tooltip>
                <Tooltip title='Cập nhật' placement='bottom'>
                    <button><EditOutlined /></button>
                </Tooltip>
            </div>
        </div>
    );
};

export default ProjectItem;