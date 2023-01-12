import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/DateTimeFormater';
import TaskDetails from '../TaskDetails/TaskDetails';
import { CARD_OPEN } from '../../configs/CARD_STATUS';
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
    CARD_OPEN_VN,
    CARD_ISSUE_VN,
    CARD_TASK_VN,
} from '../../configs/i18n/VietNamese';
const card_trans = {
    [CARD_TASK]: CARD_TASK_VN,
    [CARD_ISSUE]: CARD_ISSUE_VN,
};

const TaskItem = (props) => {
    const [openDetail, setOpenDetail] = useState(false);
    const themeStore = useSelector((state) => state.theme);
    const status = (status) => {
        switch (status) {
            case CARD_OPEN:
                return CARD_OPEN_VN;
            default:
                return '';
        }
    };
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
                    <h4>{props.task.title}</h4>
                </div>
                <div className="task-item-info">
                    <div
                        className={
                            props.task.type === CARD_TASK ? 'task-item-type task-status' : 'task-item-type issue-status'
                        }
                    >
                        {card_trans[props.task.type]}
                    </div>
                    <div className={'task-item-priority ' + priority(props.task.priority)}>
                        {priorityTrans(props.task.priority)}
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
