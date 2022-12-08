import React, { useState } from 'react';
import '../assets/scss/ProjectListPage/main.scss';
import InviteList from '../components/InviteList/InviteList';
import ProjectForm from '../components/ProjectModal/ProjectModal';
import ProjectList from '../components/ProjectList/ProjectList';
import SearchBar from '../components/SearchBar/SearchBar';

const ProjectListPage = () => {
    const [openProject, setOpenProject] = useState(false);
    return (
        <div className="project-list-page">
            <InviteList />
            <div className="pjs-container">
                <SearchBar modal={{ setOpenProject }} />
                <ProjectList />
                <ProjectForm modal={{ openProject, setOpenProject }} />
            </div>
        </div>
    );
};

export default ProjectListPage;
