import React from 'react';
import { useSelector } from 'react-redux';
import InviteItem from './InviteItem';
import './Invite.style.scss';

const InviteList = () => {
    const themeStore = useSelector((state) => state.theme);
    return (
        <div className={`invite-container ${themeStore.theme}-mode`}>
            <div className="invite-label">
                <h3 style={{ overflow: 'hidden' }} className={`${themeStore.theme}-mode`}>
                    Danh sách lời mời
                </h3>
            </div>
            <div className="invite-list">
                <InviteItem />
                <InviteItem />
            </div>
        </div>
    );
};

export default InviteList;
