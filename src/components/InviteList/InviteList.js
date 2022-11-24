import React from 'react'
import InviteItem from './InviteItem';

const InviteList = () => {
  return (
    <div className='invite-container'>
        <div className='invite-label'>
            <h3 style={{overflow:'hidden'}}>Danh sách lời mời</h3>
        </div>
        <div className='invite-list'>
            <InviteItem/>
            <InviteItem/>
        </div>
    </div>
  )
}

export default InviteList