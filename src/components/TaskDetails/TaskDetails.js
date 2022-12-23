import React from 'react';
import TaskInfo from './TaskInfo';
import TaskComments from './TaskComments/TaskComments';
import './TaskDetails.style.scss'

const TaskDetails = () => {
    return (
        <div className='task-details' onClick={e=>e.stopPropagation()}>
            <TaskInfo/>
            <TaskComments/>
        </div>
    );
};

export default TaskDetails;