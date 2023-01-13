import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/DateTimeFormater';
import TaskDetails from '../TaskDetails/TaskDetails';
import { CARD_TASK, CARD_ISSUE } from '../../configs/CARD_TYPES';
import {
    PRIORITY_HIGHEST,
    PRIORITY_HIGH,
    PRIORITY_MEDIUM,
    PRIORITY_LOW,
    PRIORITY_LOWEST,
} from '../../configs/PRIORITIES';
import {
    PRIORITY_HIGHEST_VN,
    PRIORITY_HIGH_VN,
    PRIORITY_MEDIUM_VN,
    PRIORITY_LOW_VN,
    PRIORITY_LOWEST_VN,
    CARD_ISSUE_VN,
    CARD_TASK_VN,
} from '../../configs/i18n/VietNamese';
import { FcBriefcase, FcHighPriority, FcLowPriority, FcMediumPriority, FcVlc } from 'react-icons/fc';

const card_trans = {
    [CARD_TASK]: CARD_TASK_VN,
    [CARD_ISSUE]: CARD_ISSUE_VN,
};

const priorityType = {
    [PRIORITY_HIGHEST]: {
        label: PRIORITY_HIGHEST_VN,
        icon: <FcHighPriority />,
    },
    [PRIORITY_HIGH]: {
        label: PRIORITY_HIGH_VN,
        icon: <FcHighPriority />,
    },
    [PRIORITY_MEDIUM]: {
        label: PRIORITY_MEDIUM_VN,
        icon: <FcMediumPriority />,
    },
    [PRIORITY_LOW]: {
        label: PRIORITY_LOW_VN,
        icon: <FcLowPriority />,
    },
    [PRIORITY_LOWEST]: {
        label: PRIORITY_LOWEST_VN,
        icon: <FcLowPriority />,
    },
};
const cardType = {
    [CARD_TASK]: {
        label: CARD_TASK_VN,
        icon: <FcBriefcase />,
    },
    [CARD_ISSUE]: {
        label: CARD_ISSUE_VN,
        icon: <FcVlc />,
    },
};

const TaskItem = (props) => {
    const [openDetail, setOpenDetail] = useState(false);
    const themeStore = useSelector((state) => state.theme);
    const priorityTrans = (priority) => {
        switch (priority) {
            case PRIORITY_HIGHEST:
                return PRIORITY_HIGHEST_VN;
            case PRIORITY_HIGH:
                return PRIORITY_HIGH_VN;
            case PRIORITY_MEDIUM:
                return PRIORITY_MEDIUM_VN;
            case PRIORITY_LOW:
                return PRIORITY_LOW_VN;
            case PRIORITY_LOWEST:
                return PRIORITY_LOWEST_VN;
            default:
                return 'Không';
        }
    };

    const priority = (priority) => {
        switch (priority) {
            case PRIORITY_HIGHEST:
                return 'highest-p';
            case PRIORITY_HIGH:
                return 'high-p';
            case PRIORITY_MEDIUM:
                return 'medium-p';
            case PRIORITY_LOW:
                return 'low-p';
            case PRIORITY_LOWEST:
                return 'lowest-p';
            default:
                return '';
        }
    };

    const isTask = () => {
        return props.task.type === CARD_TASK;
    };

    return (
        <>
            <div
                className={`task-item ${themeStore.theme}-mode`}
                onClick={() => setOpenDetail(true)}
                onDragStart={(e) => props.onDragStart(e, props.task.id)}
                onDragEnd={props.onDragEnd}
                draggable
            >
                <div className="task-item-title">
                    {props.task.title} {/*-<span>{status(props.task.status)}</span>*/}
                </div>
                <div className="task-item-info">
                    <div className={isTask() ? 'task-item-type task-status' : 'task-item-type issue-status'}>
                        {cardType[props.task.type].icon} {card_trans[props.task.type]}
                    </div>
                    <div className={'task-item-priority ' + priority(props.task.priority)}>
                        {priorityType[props.task.priority].icon} {priorityTrans(props.task.priority)}
                    </div>
                    <div className="task-item-create">
                        Người tạo: {props.task.owner.fullname ? props.task.owner.fullname : 'Không dữ liệu'}
                    </div>
                    <div className="task-item-do">
                        Người thực hiện: {props.task.assignee.fullname ? props.task.assignee.fullname : 'Không dữ liệu'}
                    </div>
                    <div className="task-item-deadline">Hết hạn: {formatDate(props.task.deadline)}</div>
                </div>
            </div>
            {openDetail && <TaskDetails open={openDetail} setClose={() => setOpenDetail(false)} card={props.task} />}
        </>
    );
};

export default TaskItem;
