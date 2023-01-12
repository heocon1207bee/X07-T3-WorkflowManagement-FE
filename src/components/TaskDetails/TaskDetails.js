import React, { useEffect } from 'react';
import TaskInfo from './TaskInfo';
import './TaskDetails.style.scss';
import { Modal } from 'antd';
import { DESKTOP, MOBILE, useViewport } from '../../hooks/useViewport';

const TaskDetails = ({ open = false, setClose, card }) => {
    const { viewport } = useViewport();

    let modalWidth;
    if (viewport.device === DESKTOP) modalWidth = '60%';
    return (
        <Modal className="task-details" open={open} onCancel={() => setClose()} footer={[]} width={modalWidth}>
            <TaskInfo card={card} />
        </Modal>
    );
};

export default TaskDetails;
