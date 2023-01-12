import React, { useRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import dayjs from 'dayjs';
import { FcAlarmClock, FcBriefcase, FcHighPriority, FcLowPriority, FcMediumPriority, FcVlc } from 'react-icons/fc';

import { CARD_TASK, CARD_ISSUE } from '../../configs/CARD_TYPES';
import {
    CARD_ISSUE_VN,
    CARD_TASK_VN,
    PRIORITY_HIGHEST_VN,
    PRIORITY_HIGH_VN,
    PRIORITY_LOWEST_VN,
    PRIORITY_LOW_VN,
    PRIORITY_MEDIUM_VN,
} from '../../configs/i18n/VietNamese';
import {
    PRIORITY_HIGH,
    PRIORITY_HIGHEST,
    PRIORITY_LOW,
    PRIORITY_LOWEST,
    PRIORITY_MEDIUM,
} from '../../configs/PRIORITIES';

import { Tooltip } from 'antd';

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
const TaskInfo = ({ card }) => {
    const { title, type, priority, assignee, deadline, description } = card;

    return (
        <div className="task-info-container">
            <div className="task-info-header">
                <h3>{title}</h3>
                <Tooltip title="Chỉnh sửa" placement="bottom">
                    <button>
                        <FiEdit />
                    </button>
                </Tooltip>
            </div>
            <div className="task-info">
                <p>
                    <b>Loại:</b> {cardType[type].icon} {cardType[type].label}
                </p>
                <p>
                    <b>Độ ưu tiên:</b> {priorityType[priority].icon} {priorityType[priority].label}
                </p>
                <p>
                    <b>Người thực hiện:</b> {assignee?.fullname}
                </p>
                <p>
                    <b>Ngày hết hạn:</b>
                    <FcAlarmClock /> {dayjs(deadline).format('DD-MM-YYYY')}
                </p>
                <p>
                    <b>Mô tả công việc</b>
                </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
    );
};

export default TaskInfo;
