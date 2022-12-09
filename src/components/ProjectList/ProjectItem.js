import React, {useRef} from 'react';
import { Tooltip } from 'antd';
import {
    UsergroupAddOutlined,
    UserSwitchOutlined,
    EditOutlined
} from '@ant-design/icons'
import b1 from '../../assets/images/pj-background/pj-background_1.png'
import b2 from '../../assets/images/pj-background/pj-background_2.png'
import b3 from '../../assets/images/pj-background/pj-background_3.png'
import b4 from '../../assets/images/pj-background/pj-background_4.png'
import b5 from '../../assets/images/pj-background/pj_background_5.png'

const ProjectItem = ({title='Không có tiêu đề', createMember='Không có dữ liệu', dadProps}) => {

    return (
        <div className='project-item' draggable>
            <h4>{title}</h4>
            <p>Người tạo: {createMember}</p>
            <div className='project-option-button'>
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
    );
};

export default ProjectItem;