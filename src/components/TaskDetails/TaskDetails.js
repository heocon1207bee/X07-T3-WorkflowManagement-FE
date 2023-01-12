import React from 'react';
import TaskInfo from './TaskInfo';
import './TaskDetails.style.scss';
import { Modal } from 'antd';

const TaskDetails = ({ open = false, setClose, card }) => {
    return (
        <Modal className="task-details" open={open} onCancel={() => setClose()} footer={[]}>
            <TaskInfo card={card} />
        </Modal>
    );
};

export default TaskDetails;
