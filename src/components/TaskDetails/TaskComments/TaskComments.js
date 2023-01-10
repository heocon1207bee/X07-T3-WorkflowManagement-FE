import React from 'react';
import Comments from './Comment';
import {IoSendSharp} from 'react-icons/io5'
import { EditOutlined } from '@ant-design/icons';
import { Tooltip, Input } from 'antd';

const TaskComments = () => {
    return (
        <div className='task-comment-container'>
            <h5>Bình luận</h5>
            <div className='comments-box'>
                <Comments/>
                <Comments/>
            </div>
            <div className='comment-input-box'>
                <div className='comment-input'>
                    <div className='current-avatar-comment'>
                        <img src={'https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg'}/>
                    </div>
                    <Input.TextArea placeholder='Nhập bình luận'/>
                    <Tooltip title='Gửi' placement='bottom'>
                        <button><IoSendSharp /></button>
                    </Tooltip>
                </div>
            </div>

        </div>
    );
};

export default TaskComments;