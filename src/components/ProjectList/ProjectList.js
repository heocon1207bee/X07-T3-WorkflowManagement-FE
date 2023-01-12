import React from 'react';
import ProjectItem from './ProjectItem';
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import ProjectLoading from './ProjectLoading';
import { Spin } from 'antd';
import removeVietnamese from '../../utils/RemoveVietnamese';

const ProjectList = (props) => {
    const themeStore = useSelector((state) => state.theme);
    const searchValue = removeVietnamese(useSelector((state) => state.searchValue).toLowerCase());
    const projectDataWithoutSearch = useSelector((state) => state.projectData);
    const projectData = props.lazy
        ? projectDataWithoutSearch.filter((d) => removeVietnamese(d.project.title.toLowerCase()).includes(searchValue))
        : projectDataWithoutSearch;

    const projectOwner = (data) => {
        const name = data.project.members.find(d => d.role.name === 'Chủ dự án');
        return name.user.fullname;
    }
    return (
        <div className={`project-list-container ${themeStore.theme}-mode`}>
            <div className={!props.lazy ? 'pjl-label sticky' : 'pjl-label'}>
                <h3>Danh sách dự án {props.loading && <Spin />}</h3>
            </div>
            <div className="project-list">
                {projectData.map((data) =>
                    props.lazy ? (
                        <LazyLoad
                            key={data._id}
                            height={100}
                            offset={[-100, 100]}
                            placeholder={<ProjectLoading />}
                        >
                            <ProjectItem
                                key={data._id}
                                projectId={data.project._id}
                                title={data.project.title}
                                owner={projectOwner(data)}
                                roles={data.role.capabilities}
                                project={data.project}
                                dadProps={props}
                            />
                        </LazyLoad>
                    ) : (
                        <ProjectItem
                            key={data._id}
                            projectId={data.project._id}
                            title={data.project.title}
                            owner={projectOwner(data)}
                            roles={data.role.capabilities}
                            project={data.project}
                            dadProps={props}
                        />
                    ),
                )}
            </div>
        </div>
    );
};

ProjectList.defaultProps = {
    lazy: false,
};

export default ProjectList;
