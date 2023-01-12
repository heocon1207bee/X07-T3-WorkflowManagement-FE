import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { UsergroupAddOutlined, UserSwitchOutlined, EditOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import RoleForm from '../RoleForm/RoleForm';
import { FORM_EDIT } from '../../configs/FORM_STATUS';
import { MANAGE_ROLE, MANAGE_MEMBER, UPDATE_PROJECT } from '../../configs/CAPABILITIES';
import { useSelector } from 'react-redux';
import InviteForm from '../InviteForm/InviteForm';
import {generateKey} from '../../utils/createUniqueKey';

const ProjectItem = ({
    projectId = '',
    title = 'Không có tiêu đề',
    owner = 'Không có thông tin',
    roles,
    dadProps,
    project,
}) => {
    const themeStore = useSelector((state) => state.theme);
    const [openRole, setOpenRole] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const { target, deadline } = project;
    const have = (roles, r) => {
        const role = roles.filter((d) => d.name === r);
        if (role.length > 0) {
            return true;
        } else {
            return false;
        }
    };
    const handleRole = () => {
        setOpenRole(!openRole);
    };
    const handleMember = () => {
        setOpenMember(!openMember);
    };

    return (
        <NavLink
            to={`/user/project/${projectId}`}
            className={({ isActive }) => (isActive ? 'project-nav-active' : 'project-nav-unactive')}
        >
            <div className={`project-item ${themeStore.theme}-mode`}>
                <h4>{title}</h4>
                <p>Người tạo: {owner}</p>
                <div
                    className="project-option-button"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    {have(roles, MANAGE_MEMBER) && (
                        <Tooltip title="Thành viên" placement="bottom">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleMember();
                                }}
                            >
                                <UsergroupAddOutlined />
                            </button>
                        </Tooltip>
                    )}
                    {openMember && <InviteForm projectId={projectId} opening={openMember} handleOpen={handleMember} />}
                    {have(roles, MANAGE_ROLE) && (
                        <Tooltip title="Vai trò" placement="bottom">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleRole();
                                }}
                            >
                                <UserSwitchOutlined />
                            </button>
                        </Tooltip>
                    )}
                    {openRole && <RoleForm projectId={projectId} opening={openRole} handleOpen={handleRole} />}
                    {have(roles, UPDATE_PROJECT) && (
                        <Tooltip title="Cập nhật" placement="bottom">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    dadProps.modal.setOpenProject(true);
                                    dadProps.modal.setFormType(FORM_EDIT);
                                    dadProps.modal.setCurrentProject({
                                        title,
                                        target,
                                        deadline,
                                        id: project._id,
                                        status: project.status
                                    });
                                }}
                            >
                                <EditOutlined />
                            </button>
                        </Tooltip>
                    )}
                </div>
            </div>
        </NavLink>
    );
};

export default ProjectItem;
