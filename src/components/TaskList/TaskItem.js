import React from 'react';

const TaskItem = (props) => {
    return (
        <div className='task-item' onClick={props.taskClickHandle } onDragStart={e => props.onDragStart(e,props.task.id)} onDragEnd={props.onDragEnd} draggable>
            {props.task.title} - {props.task.status}
        </div>
    );
};

export default TaskItem;