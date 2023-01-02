import React from 'react';
import ProjectItem from './ProjectItem';
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import ProjectLoading from './ProjectLoading';
import { Spin } from 'antd';
import removeVietnamese from '../../utils/RemoveVietnamese';

const ProjectList = (props) => {
    const searchValue = removeVietnamese(useSelector((state) => state.searchValue).toLowerCase());
    const projectDataWithoutSearch = useSelector((state) => state.projectData);
    const projectData = props.lazy?projectDataWithoutSearch.filter((d)=>removeVietnamese(d.project.title.toLowerCase()).includes(searchValue)):projectDataWithoutSearch;
    return (
        <div className='project-list-container'>
            <div className={!props.lazy ? 'pjl-label sticky' : 'pjl-label'}>
                <h3>Danh sách dự án {props.loading && <Spin />}</h3>
            </div>
            <div className='project-list'>
                {projectData.map((data, index) => (
                    props.lazy ? <LazyLoad key={data.project_id} height={100} offset={[-100, 100]}
                                     placeholder={<ProjectLoading />}>
                            <ProjectItem key={data.project_id} projectId={data.project_id} title={data.project.title}
                                         owner={data.project.owner.fullname} roles={data.role.capabilities}
                                         dadProps={props} />
                        </LazyLoad> :
                        <ProjectItem key={data.project_id} projectId={data.project_id} title={data.project.title}
                                     owner={data.project.owner.fullname} roles={data.role.capabilities}
                                     dadProps={props} />
                ))}
            </div>
        </div>
    );
};

ProjectList.defaultProps = {
    lazy: false,
};

export default ProjectList;
