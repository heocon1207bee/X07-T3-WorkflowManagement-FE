import React, { useEffect, useState } from 'react';
import './TaskList.style.scss';
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
import { notification, Spin } from 'antd';
import removeVietnamese from '../../utils/RemoveVietnamese';

const TaskList = (props) => {
    const [isDrag, setIsDrag] = useState('');
    const [dragStatus, setDragStatus] = useState('');
    const [dragOvering, setDragOvering] = useState();
    const [droped, setDropped] = useState();
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [projectId, setProjectId] = useState(window.location.pathname.split('/')[3]);
    const themeStore = useSelector((state) => state.theme);
    const filterStore = useSelector((state) => state.filterValue);

    useEffect(() => {
        setProjectId(window.location.pathname.split('/')[3]);
    }, [window.location.pathname.split('/')[3]]);
    useEffect(() => {
        getCard();
        //setSError();
    }, [projectId, props.reRender, dragStatus, filterStore]);

    const [cardData, setCardData] = useState([]);
    const [cError, setCError] = useState();
    const [sError, setSError] = useState();

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mes, des) => {
        api[type]({
            message: mes,
            description: des,
        });
    };

    useEffect(()=>{
        sError && openNotificationWithIcon('warning', 'Có lỗi xảy ra', 'Chưa chuyển được trạng thái. ' + sError);
        setSError();
    }, [cardData])


    const getCard = async () => {
        setLoading(true);
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
        setLoading(false);
    };

    const setCardStatus = async (projectId, cardId, status) => {
        setLoading(true);
        try {
            await CardServices.changeCardStatus(projectId, cardId, status);
        } catch (err) {
            if (err.response && Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setSError(errorValue);
            } else if (err.response) {
                setSError(err.response.data.msg);
            } else {
                setSError(err.message);
            }
        }
        setLoading(false);
    };

    const statusFilter = (status) => {
        return filterCardData().filter((t) => t.status === status);
    };

    const onDragStart = (e, id, status) => {
        setIsDrag(id);
        setDragStatus(status);
        e.stopPropagation();
    };

    const onDragOver = (e, number) => {
        setDragOvering(number);
        e.stopPropagation();
        e.preventDefault();
    };

    const onDragEnd = (e) => {
        setDragOvering();
        e.stopPropagation();
        e.preventDefault();
    };

    const onDrop = async (e, number) => {
        const des = 'Bạn không thể chuyển trạng thái về ';
        const warn = 'Có lỗi xảy ra';
        setSError();
        switch (number) {
            case 0:
                openNotificationWithIcon('error', 'Không hợp lệ', des + '"Mở"');
                break;
            case 1:
                if (dragStatus === CARD_OPEN || dragStatus === CARD_RE_OPEN) {
                    setDropped(1);
                    await setCardStatus(projectId, isDrag, { status: CARD_IN_PROGRESS });
                    // sError && openNotificationWithIcon('warning', warn, warn + ', chưa chuyển được trạng thái. ' + sError);
                } else if (dragStatus === CARD_IN_PROGRESS) {
                    break;
                } else {
                    openNotificationWithIcon('error', 'Không hợp lệ', des + '"Đang thực hiện"');
                }
                break;
            case 2:
                if (dragStatus === CARD_IN_PROGRESS) {
                    setDropped(2);
                    await setCardStatus(projectId, isDrag, { status: CARD_IN_PREVIEW });
                    // sError && openNotificationWithIcon('warning', warn, warn + ', chưa chuyển được trạng thái. ' + sError);
                } else if (dragStatus === CARD_IN_PREVIEW) {
                    break;
                } else {
                    openNotificationWithIcon('error', 'Không hợp lệ', des + '"Đang xét duyệt"');
                }
                break;
            case 3:
                if (dragStatus === CARD_IN_PREVIEW || dragStatus === CARD_DONE) {
                    setDropped(3);
                    await setCardStatus(projectId, isDrag, JSON.stringify({ status: CARD_RE_OPEN }));
                    // sError && openNotificationWithIcon('warning', warn, warn + ', chưa chuyển được trạng thái. ' + sError);
                } else if (dragStatus === CARD_RE_OPEN) {
                    break;
                } else {
                    openNotificationWithIcon('error', 'Không hợp lệ', des + '"Mở lại"');
                }
                break;
            case 4:
                if (dragStatus === CARD_IN_PREVIEW) {
                    setDropped(4);
                    await setCardStatus(projectId, isDrag, { status: CARD_DONE });
                    // sError && openNotificationWithIcon('warning', warn, warn + ', chưa chuyển được trạng thái. ' + sError);
                } else if (dragStatus === CARD_DONE) {
                    break;
                } else {
                    openNotificationWithIcon('error', 'Không hợp lệ', des + '"Hoàn thành"');
                }
                break;
            default:
                break;
        }
        setIsDrag('');
        setDragStatus('');
        e.stopPropagation();
        e.preventDefault();
    };

    const taskClickHandle = (task) => {
        setOverlay(!overlay);
        props.cardModal.setCurrentCard(task);
    };

    const filterCardData = () => {
        function cardFilter(oldItem, filItem) {
            if (filItem.length === 0) return true;
            const newItem = filItem.filter((m) => {
                if (oldItem === m) {
                    return m;
                }
                return null;
            });
            if (newItem.length > 0) {
                return true;
            } else {
                return false;
            }
        }
        function typeFilter(data, filData) {
            if (filData.trim() === '') return true;
            if (data === filData) return true;
            else return false;
        }
        const newData = cardData.filter((d) => {
            if (
                removeVietnamese(d.title.toLowerCase()).includes(removeVietnamese(filterStore.title.toLowerCase())) ===
                    true &&
                cardFilter(d.assignee._id, filterStore.member) === true &&
                cardFilter(d.priority, filterStore.priority) === true &&
                typeFilter(d.type, filterStore.type) === true
            ) {
                return d;
            }
        });
        return newData;
    };

    return (
        <>
            {contextHolder}
            <div className={`task-list ${themeStore.theme}-mode`}>
                <div
                    className="open-list task-list-child"
                    onDrop={(e) => onDrop(e, 0)}
                    onDragOver={(e) => onDragOver(e, 0)}
                    style={dragOvering === 0 ? { boxShadow: 'rgba(255, 117, 23, 0.35) 0px 5px 15px' } : null}
                >
                    <div className="status-label">
                        <h3>{CARD_OPEN_VN}</h3>
                    </div>
                    <div className="task-box">
                        {statusFilter(CARD_OPEN).map((task) => (
                            <TaskItem
                                cardModal={props.cardModal}
                                key={task._id}
                                task={task}
                                onClick={() => taskClickHandle(task)}
                                onDragStart={(e) => onDragStart(e, task._id, task.status)}
                                onDragEnd={onDragEnd}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className="re-open-list task-list-child"
                    onDrop={(e) => onDrop(e, 3)}
                    onDragOver={(e) => onDragOver(e, 3)}
                    style={dragOvering === 3 ? { boxShadow: 'rgba(255, 117, 23, 0.35) 0px 5px 15px' } : null}
                >
                    <div className="status-label">
                        <h3>
                            {CARD_RE_OPEN_VN}
                            {loading && droped === 3 && <Spin />}
                        </h3>
                    </div>
                    <div className="task-box">
                        {statusFilter(CARD_RE_OPEN).map((task) => (
                            <TaskItem
                                cardModal={props.cardModal}
                                key={task._id}
                                task={task}
                                onClick={() => taskClickHandle(task)}
                                onDragStart={(e) => onDragStart(e, task._id, task.status)}
                                onDragEnd={onDragEnd}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className="in-progress-list task-list-child"
                    onDrop={(e) => onDrop(e, 1)}
                    onDragOver={(e) => onDragOver(e, 1)}
                    style={dragOvering === 1 ? { boxShadow: 'rgba(255, 117, 23, 0.35) 0px 5px 15px' } : null}
                >
                    <div className="status-label">
                        <h3>
                            {CARD_IN_PROGRESS_VN}
                            {loading && droped === 1 && <Spin />}
                        </h3>
                    </div>
                    <div className="task-box">
                        {statusFilter(CARD_IN_PROGRESS).map((task) => (
                            <TaskItem
                                cardModal={props.cardModal}
                                key={task._id}
                                task={task}
                                onClick={() => taskClickHandle(task)}
                                onDragStart={(e) => onDragStart(e, task._id, task.status)}
                                onDragEnd={onDragEnd}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className="in-review-list task-list-child"
                    onDrop={(e) => onDrop(e, 2)}
                    onDragOver={(e) => onDragOver(e, 2)}
                    style={dragOvering === 2 ? { boxShadow: 'rgba(255, 117, 23, 0.35) 0px 5px 15px' } : null}
                >
                    <div className="status-label">
                        <h3>
                            {CARD_IN_PREVIEW_VN}
                            {loading && droped === 2 && <Spin />}
                        </h3>
                    </div>
                    <div className="task-box">
                        {statusFilter(CARD_IN_PREVIEW).map((task) => (
                            <TaskItem
                                cardModal={props.cardModal}
                                key={task._id}
                                task={task}
                                onClick={() => taskClickHandle(task)}
                                onDragStart={(e) => onDragStart(e, task._id, task.status)}
                                onDragEnd={onDragEnd}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className={`done-list task-list-child `}
                    onDrop={(e) => onDrop(e, 4)}
                    onDragOver={(e) => onDragOver(e, 4)}
                    style={dragOvering === 4 ? { boxShadow: 'rgba(255, 117, 23, 0.35) 0px 5px 15px' } : null}
                >
                    <div className="status-label">
                        <h3>
                            {CARD_DONE_VN}
                            {loading && droped === 4 && <Spin />}
                        </h3>
                    </div>
                    <div className="task-box">
                        {statusFilter(CARD_DONE).map((task) => (
                            <TaskItem
                                cardModal={props.cardModal}
                                key={task._id}
                                task={task}
                                onClick={() => taskClickHandle(task)}
                                onDragStart={(e) => onDragStart(e, task._id, task.status)}
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
