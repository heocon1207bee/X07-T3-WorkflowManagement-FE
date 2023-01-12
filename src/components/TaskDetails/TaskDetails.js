import React from 'react';
import TaskInfo from './TaskInfo';
import TaskComments from './TaskComments/TaskComments';
import './TaskDetails.style.scss';
import { Modal } from 'antd';

const TaskDetails = ({ open = false, setClose, card }) => {
    return (
        <Modal className="task-details" open={open} onCancel={() => setClose()} footer={[]} width={900}>
            <TaskInfo card={card} />
            <TaskComments />
        </Modal>
    );
};

export default TaskDetails;
