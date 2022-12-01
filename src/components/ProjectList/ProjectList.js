import React from 'react'
import ProjectItem from './ProjectItem';

const ProjectList = () => {

    return (
    <div className='project-list-container'>
        <div className='pjl-label'>
            <h3>Danh sách dự án</h3>
        </div>
        <div className='project-list'>
            {Array(10).fill(1).map((v, i) => { return <ProjectItem key={i}/>})}
        </div>
    </div>
  )
}

export default ProjectList