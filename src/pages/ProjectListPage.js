import React from 'react'
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/ProjectListPage/main.scss'
import InviteList from '../components/InviteList/InviteList'
import ProjectList from '../components/ProjectList/ProjectList'
import SearchBar from '../components/SearchBar/SearchBar'
import ProjectServices from '../services/Project/projectServices';
import ProjectForm from '../components/ProjectModal/ProjectModal';
import Overlay from '../components/Overlay/Overlay';
import RoleForm from '../components/RoleForm/RoleForm';
import authenServices from '../services/Authen/authenServices';
import { setUserStore } from '../stores/reducers/Auth/authenSlice';
import { Animated } from 'react-animated-css'
import { FORM_CREATE } from '../configs/FORM_STATUS';

const ProjectListPage = () => {
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [error, setError] = useState();
    const [openProject, setOpenProject] = useState(false);
    const [formType, setFormStyle] = useState(FORM_CREATE);

    //const projectData = useSelector(state => state.projectData)
    const dispatch = useDispatch();

    useEffect(() => {
        getProject();
    }, []);

    const getProject = async () => {
        setLoading(true);
        try {
            const getProjectResponse = await ProjectServices.getProject()
            dispatch({ 'type':'setData', 'value': getProjectResponse.data.data})
            setLoading(false)
        } catch (err) {
            if (err.response && Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setError(errorValue);
            } else if(err.response){
                setError(err.response.data.msg);
            } else {
                setError(err.message)
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRoleButton = () => {
        setOverlay(!overlay);
    };

  return (
      <>
          <Animated animationInDuration={200} animationIn='fadeInUp' animationOutDuration={300} animationOut='fadeOutUp' isVisible={overlay}>
              <Overlay overlay={overlay} handleRoleButton={handleRoleButton}>
                  <RoleForm/>
              </Overlay>
          </Animated>
          <div className='project-list-page'>
              <InviteList/>
              <div className='pjs-container'>
                  <SearchBar modal={{ setOpenProject }}/>
                  <ProjectList  overlay={overlay} handleRoleButton={handleRoleButton} loading={loading}/>
                  <ProjectForm modal={{ openProject, setOpenProject }} type={formType} />
              </div>
          </div>
      </>
  )
}

export default ProjectListPage;
