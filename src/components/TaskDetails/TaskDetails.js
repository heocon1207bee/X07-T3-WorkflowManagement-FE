import React from 'react';
import TaskInfo from './TaskInfo';
import './TaskDetails.style.scss';
import { Modal, Button } from 'antd';
import { DESKTOP, useViewport } from '../../hooks/useViewport';
import { FORM_EDIT } from '../../configs/FORM_STATUS';

const TaskDetails = ({ open = false, setClose, card, cardModal }) => {
    const { viewport } = useViewport();

    let modalWidth;
    if (viewport.device === DESKTOP) modalWidth = '60%';

    const handleEditClick = () => {
        cardModal.setCardFormType(FORM_EDIT);
        cardModal.setOpenModal(true);
        cardModal.setCurrentCard(card);
        setClose();
    };

    return (
        <Modal
            className="task-details"
            open={open}
            onCancel={() => setClose()}
            footer={[
                <Button key="submit" className="btn-ok" onClick={handleEditClick}>
                    Chỉnh sửa
                </Button>,
            ]}
            width={modalWidth}
        >
            <TaskInfo card={card} />
        </Modal>
    );
};

export default TaskDetails;
