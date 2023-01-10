import React, { useEffect, useState } from 'react';
import './TaskList.style.scss';
import { Animated } from 'react-animated-css';
import Overlay from '../Overlay/Overlay';
import TaskDetails from '../TaskDetails/TaskDetails';
import TaskItem from './TaskItem';
import { useSelector } from 'react-redux';
import CardServices from '../../services/Project/Card/CardServices';
import {
    CARD_OPEN_VN,
    CARD_IN_PROGRESS_VN,
    CARD_RE_OPEN_VN,
    CARD_DONE_VN,
    CARD_IN_PREVIEW_VN,
} from '../../configs/i18n/VietNamese';
import { CARD_DONE, CARD_IN_PROGRESS, CARD_OPEN, CARD_IN_PREVIEW, CARD_RE_OPEN } from '../../configs/CARD_STATUS';

const task = [
    {
        id: '0',
        title: 'task 0',
        status: 'open',
    },
    {
        id: '1',
        title: 'task 1',
        status: 'open',
    },
    {
        id: '2',
        title: 'task 2',
        status: 'open',
    },
    {
        id: '3',
        title: 'task 3',
        status: 'open',
    },
    {
        id: '4',
        title: 'task 4',
        status: 'open',
    },
    {
        id: '5',
        title: 'task 5',
        status: 'open',
    },
];

const TaskList = (props) => {
    const [isDrag, setIsDrag] = useState('');
    const [overlay, setOverlay] = useState(false);
    const [projectId, setProjectId] = useState(window.location.pathname.split('/')[3]);
    const themeStore = useSelector((state) => state.theme);

    useEffect(() => {
        setProjectId(window.location.pathname.split('/')[3]);
    }, [window.location.pathname.split('/')[3]]);
    useEffect(() => {
        getCard();
    }, [projectId, props.reRender]);

    const [cardData, setCardData] = useState([]);
    const [cError, setCError] = useState();

    const getCard = async () => {
        try {
            const getCardResponse = await CardServices.getCard(projectId);
            setCardData(getCardResponse.data.data);
        } catch (err) {
            if (err.response && Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setCError(errorValue);
            } else if (err.response) {
                setCError(err.response.data.msg);
            } else {
                setCError(err.message);
            }
        }
    };

    const statusFilter = (status) => {
        return cardData.filter((t) => t.status === status);
    };

    const onDragStart = (e, id) => {
        console.log('drag' + ' ' + id);
        setIsDrag(id);
        e.stopPropagation();
    };

    const onDragOver = (e, number) => {
        console.log('drag over ' + number);
        e.stopPropagation();
        e.preventDefault();
    };

    const onDragEnd = (e) => {
        console.log('drag end');
        e.stopPropagation();
        e.preventDefault();
    };

    const onDrop = (e, number) => {
        switch (number) {
            case 0:
                //task.map(task => { if(task.id == isDrag) { task.status='open' }})
                break;
            case 1:
                task.map((task) => {
                    if (task.id == isDrag && (task.status === CARD_OPEN || task.status === CARD_RE_OPEN)) {
                        task.status = CARD_IN_PROGRESS;
                    }
                });
                break;
            case 2:
                task.map((task) => {
                    if (task.id == isDrag && task.status === CARD_IN_PROGRESS) {
                        task.status = CARD_IN_PREVIEW;
                    }
                });
                break;
            case 3:
                task.map((task) => {
                    if (task.id == isDrag && (task.status === CARD_IN_PREVIEW || task.status === CARD_DONE)) {
                        task.status = CARD_RE_OPEN;
                    }
                });
                break;
            case 4:
                task.map((task) => {
                    if (task.id == isDrag && task.status === CARD_IN_PREVIEW) {
                        task.status = CARD_DONE;
                    }
                });
                break;
            default:
                break;
        }
        setIsDrag('');
        console.log('dropped in ' + number);
        e.stopPropagation();
        e.preventDefault();
    };

    const taskClickHandle = () => {
        setOverlay(!overlay);
    };

    return (
        <>
            <Animated
                animationInDuration={200}
                animationIn="fadeIn"
                animationOutDuration={300}
                animationOut="fadeOut"
                isVisible={overlay}
            >
                <Overlay overlay={overlay} handleOverlay={taskClickHandle}>
                    <TaskDetails />
                </Overlay>
            </Animated>
            <div className={`task-list ${themeStore.theme}-mode`}>
                <div
                    className="open-list task-list-child"
                    onDrop={(e) => onDrop(e, 0)}
                    onDragOver={(e) => onDragOver(e, 0)}
                >
                    <div className="status-label">
                        <h3>{CARD_OPEN_VN}</h3>
                    </div>
                    <div className="task-box">
                        {statusFilter(CARD_OPEN).map((task) => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onClick={taskClickHandle}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className="re-open-list task-list-child"
                    onDrop={(e) => onDrop(e, 3)}
                    onDragOver={(e) => onDragOver(e, 3)}
                >
                    <div className="status-label">
                        <h3>{CARD_RE_OPEN_VN}</h3>
                    </div>
                    <div className="task-box">
                        {statusFilter(CARD_RE_OPEN).map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onClick={taskClickHandle}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className="in-progress-list task-list-child"
                    onDrop={(e) => onDrop(e, 1)}
                    onDragOver={(e) => onDragOver(e, 1)}
                >
                    <div className="status-label">
                        <h3>{CARD_IN_PROGRESS_VN}</h3>
                    </div>
                    <div className="task-box">
                        {statusFilter(CARD_IN_PROGRESS).map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onClick={taskClickHandle}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className="in-review-list task-list-child"
                    onDrop={(e) => onDrop(e, 2)}
                    onDragOver={(e) => onDragOver(e, 2)}
                >
                    <div className="status-label">
                        <h3>{CARD_IN_PREVIEW_VN}</h3>
                    </div>
                    <div className="task-box">
                        {statusFilter(CARD_IN_PREVIEW).map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onClick={taskClickHandle}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className={`done-list task-list-child `}
                    onDrop={(e) => onDrop(e, 4)}
                    onDragOver={(e) => onDragOver(e, 4)}
                >
                    <div className="status-label">
                        <h3>{CARD_DONE_VN}</h3>
                    </div>
                    <div className="task-box">
                        {statusFilter(CARD_DONE).map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onClick={taskClickHandle}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskList;
