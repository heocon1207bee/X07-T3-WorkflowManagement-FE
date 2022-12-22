import React from 'react';
import ProjectItem from './ProjectItem';
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import ProjectLoading from './ProjectLoading';
import { Spin } from 'antd';

const ProjectList = (props, { lazy=false }) => {
    const projectData = useSelector((state) => state.projectData);

    return (
        <div className="project-list-container">
            <div className="pjl-label">
                <h3>Danh sách dự án {props.loading && <Spin />}</h3>
            </div>
            <div className="project-list">
                {projectData.map((data, index) => (
                    lazy ? <LazyLoad key={data.project_id} height={100} offset={[-100, 100]} placeholder={<ProjectLoading />}>
                        <ProjectItem key={data.project_id} projectId={data.project_id} title={data.project.title} owner={data.project.owner.fullname} dadProps={props}/>
                    </LazyLoad> : <ProjectItem key={data.project_id} projectId={data.project_id} title={data.project.title} owner={data.project.owner.fullname} dadProps={props}/>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
