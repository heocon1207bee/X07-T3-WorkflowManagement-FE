import React from 'react';
import {FiEdit} from 'react-icons/fi'
import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const TaskInfo = (props) => {
    const {title, type, priority, perform, expired, detail} = props
    return (
        <div className='task-info-container'>
            <div className='task-info-header'>
                <h3>Tên công việc</h3>
                <Tooltip title='Chỉnh sửa' placement='bottom'>
                    <button><FiEdit /></button>
                </Tooltip>
            </div>
            <div className='task-info'>
                <p><b style={{fontWeight:500}}>Tiêu đề:</b> {title}</p>
                <p><b style={{fontWeight:500}}>Loại công việc:</b> {type}</p>
                <p><b style={{fontWeight:500}}>Độ ưu tiên:</b> {priority}</p>
                <p><b style={{fontWeight:500}}>Người thực hiện:</b> {perform}</p>
                <p><b style={{fontWeight:500}}>Ngày hết hạn:</b> {expired}</p>
                <p><b style={{fontWeight:500}}>Mô tả công việc:</b> {detail}</p>
            </div>
        </div>
    );
};

TaskInfo.defaultProps = {
    title: 'Không có tiêu đề',
    type: 'Không có loại',
    priority: 'Không có ưu tiên',
    perform: 'Không có người thực hiện',
    expired: 'Không có ngày hết hạn',
    detail: 'Không có mô tả công việc gì hết á',
}

export default TaskInfo;