import React, {useRef} from 'react';
import { Tooltip } from 'antd';
import {
    UsergroupAddOutlined,
    UserSwitchOutlined,
    EditOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'

const ProjectItem = ({projectId = '', title='Không có tiêu đề', owner='Không có thông tin', dadProps}) => {

    return (
        <Link to={`/user/project/${projectId}`} style={{textDecoration: 'none', color: '#fefefe'}}>
        <div className='project-item'>
            <h4>{title}</h4>
            <p>Người tạo: {owner}</p>
            <div className='project-option-button' onClick={e=>e.preventDefault()}>
                <Tooltip title='Thành viên' placement='bottom'>
                    <button><UsergroupAddOutlined /></button>
                </Tooltip>
                <Tooltip title='Vai trò' placement='bottom'>
                    <button onClick={dadProps.handleRoleButton}><UserSwitchOutlined /></button>
                </Tooltip>
                <Tooltip title='Cập nhật' placement='bottom'>
                    <button><EditOutlined /></button>
                </Tooltip>
            </div>
        </div>
        </Link>
    );
};

export default ProjectItem;