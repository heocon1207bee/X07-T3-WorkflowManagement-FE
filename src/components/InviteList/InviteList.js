import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InviteItem from './InviteItem';
import './Invite.style.scss';
import { MdOutlineArrowLeft ,MdOutlineArrowRight } from 'react-icons/md'

const InviteList = () => {
    const [inviteVisible, setInviteVisible] = useState(false);
    const themeStore = useSelector((state) => state.theme);
    return (
        <>
        <div className={`invite-container invite-visible-${inviteVisible} ${themeStore.theme}-mode`}>
            <div className="invite-label">
                <h3 style={{ overflow: 'hidden' }} className={`${themeStore.theme}-mode`}>
                    Danh sách lời mời
                </h3>
            </div>
            <div className="invite-list">
                <InviteItem />
                <InviteItem />
            </div>
        </div><button className='visible-invite-button' onClick={()=>{setInviteVisible(!inviteVisible)}}>{inviteVisible?<MdOutlineArrowLeft/>:<MdOutlineArrowRight/>}</button>
        </>
    );
};

export default InviteList;
