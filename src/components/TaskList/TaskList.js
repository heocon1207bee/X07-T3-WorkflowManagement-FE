import React, { useState } from 'react';
import './TaskList.style.scss';
import { Animated } from 'react-animated-css';
import Overlay from '../Overlay/Overlay'
import TaskDetails from '../TaskDetails/TaskDetails';
import TaskItem from './TaskItem';

const task = [
    {
        id:'0',
        title: 'task 0',
        status: 'open'
    }, {
        id:'1',
        title: 'task 1',
        status: 'open'
    }, {
        id:'2',
        title: 'task 2',
        status: 'open'
    }, {
        id:'3',
        title: 'task 3',
        status: 'open'
    }, {
        id:'4',
        title: 'task 4',
        status: 'open'
    }, {
        id:'5',
        title: 'task 5',
        status: 'open'
    }
]

const TaskList = () => {
    const [isDrag, setIsDrag] = useState('')
    const [overlay, setOverlay] = useState(false)

    const statusFilter = (status) => {
        return task.filter(t => t.status === status)
    }

    const onDragStart = (e, id) => {
        console.log('drag'+' '+id)
        setIsDrag(id)
        e.stopPropagation();
    }

    const onDragOver = (e, number) => {
        console.log('drag over ' + number)
        e.stopPropagation();
        e.preventDefault();
    }

    const onDragEnd = (e) => {
        console.log('drag end')
        e.stopPropagation();
        e.preventDefault();
    }

    const onDrop = (e, number) => {
        switch (number) {
            case 0:
                //task.map(task => { if(task.id == isDrag) { task.status='open' }})
                break;
            case 1:
                task.map(task => { if(task.id == isDrag && (task.status === 'open' || task.status === 're open') ) { task.status='in progress' }})
                break;
            case 2:
                task.map(task => { if(task.id == isDrag && task.status === 'in progress') { task.status='in review' }})
                break;
            case 3:
                task.map(task => { if(task.id == isDrag && (task.status === 'in review' || task.status === 'done')) { task.status='re open' }})
                break;
            case 4:
                task.map(task => { if(task.id == isDrag && (task.status === 'in review')) { task.status='done' }})
                break;
            default:
                break;
        }
        setIsDrag('')
        console.log('dropped in ' + number)
        e.stopPropagation();
        e.preventDefault();
    }

    const taskClickHandle = () => {
        setOverlay(!overlay)
    }

    return (
        <>
        <Animated animationInDuration={200} animationIn='fadeIn' animationOutDuration={300} animationOut='fadeOut' isVisible={overlay}>
            <Overlay overlay={overlay} handleOverlay={taskClickHandle}>
                <TaskDetails/>
            </Overlay>
        </Animated>
        <div className='task-list'>
            <div className='open-list task-list-child' onDrop={e => onDrop(e, 0)} onDragOver={e => onDragOver(e, 0)}>
                <div className='status-label'>Open</div>
                <div className='task-box'>
                    {
                        statusFilter('open').map(task =>
                            <TaskItem key={task.id} task={task} onClick={taskClickHandle} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
                        )
                    }
                </div>
            </div>
            <div className='re-open-list task-list-child' onDrop={e => onDrop(e, 3)} onDragOver={e => onDragOver(e, 3)}>
                <div className='status-label'>Re-Open</div>
                <div className='task-box'>
                    {
                        statusFilter('re open').map(task =>
                            <TaskItem key={task.id} task={task} onClick={taskClickHandle} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
                        )
                    }
                </div>
            </div>
            <div className='in-progress-list task-list-child' onDrop={e => onDrop(e, 1)} onDragOver={e => onDragOver(e, 1)}>
                <div className='status-label'>In Progress</div>
                <div className='task-box'>
                    {
                        statusFilter('in progress').map(task =>
                            <TaskItem key={task.id} task={task} onClick={taskClickHandle} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
                        )
                    }
                </div>
            </div>
            <div className='in-review-list task-list-child' onDrop={e => onDrop(e, 2)} onDragOver={e => onDragOver(e, 2)}>
                <div className='status-label'>In Review</div>
                <div className='task-box'>
                    {
                        statusFilter('in review').map(task =>
                            <TaskItem key={task.id} task={task} onClick={taskClickHandle} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
                        )
                    }
                </div>
            </div>
            <div className='done-list task-list-child' onDrop={e => onDrop(e, 4)} onDragOver={e => onDragOver(e, 4)}>
                <div className='status-label'>Done</div>
                <div className='task-box'>
                    {
                        statusFilter('done').map(task =>
                            <TaskItem key={task.id} task={task} onClick={taskClickHandle} onDragStart={onDragStart} onDragEnd={onDragEnd}/>
                        )
                    }
                </div>
            </div>
        </div>
        </>
    );
};

export default TaskList;