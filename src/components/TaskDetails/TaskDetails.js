import React from 'react';
import TaskInfo from './TaskInfo';
import TaskComments from './TaskComments/TaskComments';
import './TaskDetails.style.scss';
import { Modal } from 'antd';

const TaskDetails = (props) => {
    return (
        <Modal className='task-details' open={props.open}
               onOk={
                   e => e.stopPropagation()
               }
               onCancel={props.setClose}
               footer={[]}>
            <TaskInfo />
            <TaskComments />
        </Modal>
    );
};

export default TaskDetails;