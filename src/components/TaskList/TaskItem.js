import React from 'react';

const TaskItem = (props) => {
    const status = (status) => {
        switch (status) {
            case 'CARD_OPEN':
                return 'Open';
            default:
                return 'None';
        }
    };

    const priority = (priority) => {
        switch (priority) {
            case 'HIGHEST':
                return 'highest-p';
            case 'HIGH':
                return 'high-p';
            case 'MEDIUM':
                return 'medium-p';
            case 'LOW':
                return 'low-p';
            case 'LOWEST':
                return 'lowest-p';
            default:
                return '';
        }
    };
    return (
        <div className='task-item' onClick={props.taskClickHandle}
             onDragStart={e => props.onDragStart(e, props.task.id)} onDragEnd={props.onDragEnd} draggable>
            <div className='task-item-title'>
                {props.task.title} - <span>{status(props.task.status)}</span>
            </div>
            <div className='task-item-info'>
                <div
                    className={props.task.type === 'TASK' ? 'task-item-type task-status' : 'task-item-type issue-status'}>{props.task.type}</div>
                <div className={'task-item-priority ' + priority(props.task.priority)}>{props.task.priority}</div>
                <div className='task-item-create'>Người
                    tạo: {props.task.create ? props.task.create : 'Không dữ liệu'}</div>
                <div className='task-item-do'>Người thực hiện: {props.task.do ? props.task.do : 'Không dữ liệu'}</div>
                <div className='task-item-deadline'>Hết hạn: {props.task.deadline}</div>
            </div>
        </div>
    );
};

export default TaskItem;