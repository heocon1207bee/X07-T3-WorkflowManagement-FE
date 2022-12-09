import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/ProjectListPage/main.scss';
import InviteList from '../components/InviteList/InviteList';
import ProjectList from '../components/ProjectList/ProjectList';
import SearchBar from '../components/SearchBar/SearchBar';
import ProjectServices from '../services/Project/projectServices';
import ProjectForm from '../components/ProjectModal/ProjectModal';
import Overlay from '../components/Overlay/Overlay';
import RoleForm from '../components/RoleForm/RoleForm';
import { FORM_CREATE, FORM_EDIT } from '../configs/FORM_STATUS';

const ProjectListPage = () => {
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [error, setError] = useState();
    const [openProject, setOpenProject] = useState(false);
    const [formType, setFormStyle] = useState(FORM_EDIT);

    //const projectData = useSelector(state => state.projectData)
    const dispatch = useDispatch();

    useEffect(() => {
        getProject();
    }, []);

    const getProject = async () => {
        setLoading(true);
        try {
            const getProjectResponse = await ProjectServices.getProject();
            dispatch({ type: 'setData', value: [...getProjectResponse.data] });
            setLoading(false);
        } catch (err) {
            if (Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setError(errorValue);
            } else {
                setError(err.response.data.msg);
            }
        }
    };

    const handleRoleButton = () => {
        setOverlay(!overlay);
    };

    return (
        <>
            {overlay && (
                <Overlay overlay={overlay} handleRoleButton={handleRoleButton}>
                    <RoleForm />
                </Overlay>
            )}
            <div className="project-list-page">
                <InviteList />
                <div className="pjs-container">
                    <SearchBar modal={{ setOpenProject }} />
                    <ProjectList overlay={overlay} handleRoleButton={handleRoleButton} loading={loading} />
                    <ProjectForm modal={{ openProject, setOpenProject }} type={formType} />
                </div>
            </div>
        </>
    );
};

export default ProjectListPage;
