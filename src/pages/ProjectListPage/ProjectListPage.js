import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProjectListPage.style.scss';
import InviteList from '../../components/InviteList/InviteList';
import ProjectList from '../../components/ProjectList/ProjectList';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProjectServices from '../../services/Project/projectServices';
import ProjectForm from '../../components/ProjectModal/ProjectModal';
import { FORM_CREATE } from '../../configs/FORM_STATUS';

const ProjectListPage = () => {
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [error, setError] = useState();
    const [openProject, setOpenProject] = useState(false);
    const [formType, setFormType] = useState(FORM_CREATE);
    const [currentProject, setCurrentProject] = useState(null);
    const [inviteChange, setInviteChange] = useState('');
    const themeStore = useSelector((state) => state.theme);

    const dispatch = useDispatch();

    const getProject = useCallback(async () => {
        setLoading(true);
        try {
            const getProjectResponse = await ProjectServices.getProject();
            dispatch({ type: 'setData', value: getProjectResponse.data.data.reverse() });
            setLoading(false);
        } catch (err) {
            if (err.response && Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setError(errorValue);
            } else if (err.response) {
                setError(err.response.data.msg);
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        if (openProject === false) {
            getProject();
        }
    }, [getProject, openProject, inviteChange]);

    const handleRoleButton = () => {
        setOverlay(!overlay);
    };

    return (
        <div className={`project-list-page ${themeStore.theme}-mode`}>
            <InviteList changed={setInviteChange}/>
            <div className={`pjs-container ${themeStore.theme}-mode`}>
                <SearchBar modal={{ setOpenProject, setFormType }} />
                <ProjectList
                    overlay={overlay}
                    handleRoleButton={handleRoleButton}
                    loading={loading}
                    lazy={true}
                    modal={{ setOpenProject, setFormType, setCurrentProject }}
                />
                <ProjectForm modal={{ openProject, setOpenProject, currentProject }} type={formType} />
            </div>
        </div>
    );
};

export default ProjectListPage;
