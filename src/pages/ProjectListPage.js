import React from 'react'
import '../assets/scss/ProjectListPage/main.scss'
import InviteList from '../components/InviteList/InviteList'
import ProjectList from '../components/ProjectList/ProjectList'
import SearchBar from '../components/SearchBar/SearchBar'

const ProjectListPage = () => {
  return (
    <div className='project-list-page'>
      <InviteList/>
      <div className='pj-container'>
        <SearchBar/>
        <ProjectList/>
      </div>
    </div>
  )
}

export default ProjectListPage