import React, { useRef, useState } from 'react';
import { Tooltip } from 'antd';
import {
    UsergroupAddOutlined,
    UserSwitchOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import RoleForm from '../RoleForm/RoleForm';

const ProjectItem = ({ projectId = '', title = 'Không có tiêu đề', owner = 'Không có thông tin', roles, dadProps }) => {
    const [openRole, setOpenRole] = useState(false);
    const have = (roles, r) => {
        const role = roles.filter(d => d === r);
        if (role.length > 0) {
            return true;
        } else {
            return false;
        }
    };
    const handleRole = () => {
        setOpenRole(!openRole);
    };
    return (
        <NavLink to={`/user/project/${projectId}`}
                 className={({ isActive }) => isActive ? 'project-nav-active' : 'project-nav-unactive'}>
            <div className='project-item'>
                <h4>{title}</h4>
                <p>Người tạo: {owner}</p>
                <div className='project-option-button' onClick={e=>e.stopPropagation()}>
                    {have(roles, 'MANAGE_MEMBER') && <Tooltip title='Thành viên' placement='bottom'>
                        <button onClick={e => {
                            e.preventDefault();
                        }}><UsergroupAddOutlined /></button>
                    </Tooltip>}
                    {have(roles, 'MANAGE_ROLE') && <Tooltip title='Vai trò' placement='bottom'>
                        <button onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRole();
                        }}>
                            <UserSwitchOutlined />
                        </button>
                    </Tooltip>}
                    {openRole&&<RoleForm projectId={projectId} opening={openRole}
                                         handleOpen={handleRole} />}
                    {have(roles, 'UPDATE_PROJECT') && <Tooltip title='Cập nhật' placement='bottom'>
                        <button onClick={e => {
                            e.preventDefault();
                        }}><EditOutlined /></button>
                    </Tooltip>}
                </div>
            </div>
        </NavLink>
    );
};

export default ProjectItem;