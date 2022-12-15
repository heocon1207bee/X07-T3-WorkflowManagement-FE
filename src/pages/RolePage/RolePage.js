import React from 'react';
import '../../assets/scss/RolePage/rolepage.style.scss'
import RoleForm from '../../components/RoleForm/RoleForm';
import TaskList from '../../components/TaskList/TaskList';

const RolePage = () => {
    return (
        <div className='role-page'>
            <TaskList/>
        </div>
    );
};

export default RolePage;