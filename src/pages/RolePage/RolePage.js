import React from 'react';
import '../../assets/scss/RolePage/rolepage.style.scss'
import TaskDetails from '../../components/TaskDetails/TaskDetails';

const RolePage = () => {
    return (
        <div className='role-page'>
            <TaskDetails/>
        </div>
    );
};

export default RolePage;