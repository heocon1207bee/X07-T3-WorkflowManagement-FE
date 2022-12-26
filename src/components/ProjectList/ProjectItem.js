import React, {useRef} from 'react';
import { Tooltip } from 'antd';
import {
    UsergroupAddOutlined,
    UserSwitchOutlined,
    EditOutlined
} from '@ant-design/icons'
import {NavLink} from 'react-router-dom'

const ProjectItem = ({projectId = '', title='Không có tiêu đề', owner='Không có thông tin', dadProps}) => {
    return (
        <NavLink to={`/user/project/${projectId}`} className={({isActive}) => isActive?'project-nav-active':'project-nav-unactive'}>
        <div className='project-item'>
            <h4>{title}</h4>
            <p>Người tạo: {owner}</p>
            <div className='project-option-button'>
                <Tooltip title='Thành viên' placement='bottom'>
                    <button onClick={e=>e.preventDefault()}><UsergroupAddOutlined /></button>
                </Tooltip>
                <Tooltip title='Vai trò' placement='bottom'>
                    <button onClick={e=>{e.preventDefault(); dadProps.handleRoleButton()}}><UserSwitchOutlined /></button>
                </Tooltip>
                <Tooltip title='Cập nhật' placement='bottom'>
                    <button onClick={e=>e.preventDefault()}><EditOutlined /></button>
                </Tooltip>
            </div>
        </div>
        </NavLink>
    );
};

export default ProjectItem;