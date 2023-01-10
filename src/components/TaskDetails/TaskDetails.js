import React from 'react';
import TaskInfo from './TaskInfo';
import TaskComments from './TaskComments/TaskComments';
import './TaskDetails.style.scss';
import { Modal } from 'antd';

const TaskDetails = ({ open= false , setClose}) => {

    return (
        <Modal className='task-details' open={open}
               onCancel={()=>setClose()}
               footer={[]} width={700}>
            <TaskInfo />
            <TaskComments />
        </Modal>
    );
};

export default TaskDetails;