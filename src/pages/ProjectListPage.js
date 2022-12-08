import React from 'react'
import {useState, useEffect} from 'react';
import '../assets/scss/ProjectListPage/main.scss'
import InviteList from '../components/InviteList/InviteList'
import ProjectList from '../components/ProjectList/ProjectList'
import SearchBar from '../components/SearchBar/SearchBar'
import ProjectServices from '../services/Project/projectServices';

import { useDispatch, useSelector } from 'react-redux';
import Overlay from '../components/Overlay/Overlay';
import RoleForm from '../components/RoleForm/RoleForm';

const ProjectListPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [overlay, setOverlay] = useState(false)

    //const projectData = useSelector(state => state.projectData)
    const dispatch = useDispatch()

    useEffect(() => {
        getProject()
    }, [])

    const getProject = async () => {
        setLoading(true)
        try {
            const getProjectResponse = await ProjectServices.getProject()
            dispatch({ 'type':'setData', 'value': [...getProjectResponse.data]})
            setLoading(false)
        } catch (err) {
            if (Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setError(errorValue);
            } else {
                setError(err.response.data.msg);
            }
        }
    }

    const handleRoleButton = () => {
        setOverlay(!overlay);
    }

  return (
      <>
          {overlay&&<Overlay overlay={overlay} handleRoleButton={handleRoleButton}>
              <RoleForm/>
          </Overlay>}
          <div className='project-list-page'>
              <InviteList/>
              <div className='pjs-container'>
                  <SearchBar/>
                  <ProjectList  overlay={overlay} handleRoleButton={handleRoleButton} loading={loading}/>
              </div>
          </div>
      </>
  )
}

export default ProjectListPage