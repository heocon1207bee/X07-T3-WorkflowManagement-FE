import React from 'react';
import {Link} from 'react-router-dom';
import TaskList from '../../components/TaskList/TaskList'
import './ProjectTaskPage.style.scss'
import {LeftOutlined} from '@ant-design/icons'
import {BiAddToQueue, BiFilterAlt } from 'react-icons/bi'

const ProjectTaskPage = () => {
    return (
        <div className='project-task-page'>
            <div className='project--nav'>
                <div className='project-name--nav'>
                    <Link to='/'><LeftOutlined color='#62d8d7'/></Link>
                    <h2>Project name</h2>
                </div>
                <div className='task-option--nav'>
                    <button>Lọc <BiFilterAlt/></button>
                    <button>Tạo công việc <BiAddToQueue/></button>
                </div>
            </div>
            <div className='project-task-container'>
                <TaskList/>
            </div>
        </div>
    );
};

export default ProjectTaskPage;