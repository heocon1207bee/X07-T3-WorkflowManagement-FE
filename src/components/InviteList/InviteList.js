import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InviteItem from './InviteItem';
import './Invite.style.scss';
import { MdOutlineArrowLeft, MdOutlineArrowRight, MdOutlineEmail } from 'react-icons/md';
import ProjectServices from '../../services/Project/projectServices';

const InviteList = ({changed}) => {
    const [inviteVisible, setInviteVisible] = useState(false);
    const [status, setStatus] = useState('');
    const [iError, setIError] = useState(false);
    const [inviteList, setInviteList] = useState([]);
    const themeStore = useSelector((state) => state.theme);

    useEffect(() => {
        getInvites(setIError);
        changed(status);
    }, [window.location, status]);

    const getInvites = async (setError) => {
        try {
            const getInviteResponse = await ProjectServices.getInvitesList();
            setInviteList(getInviteResponse.data.data);
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
        }
    };

    return (
        <>
            <div className={`invite-container invite-visible-${inviteVisible} ${themeStore.theme}-mode`}>
                <div className='invite-label'>
                    <h3 style={{ overflow: 'hidden' }} className={`${themeStore.theme}-mode`}>
                        Danh sách lời mời
                    </h3>
                </div>
                <div className='invite-list'>
                    {
                        inviteList.map(data => {
                            return <InviteItem key={data._id} data={data} setStatus={setStatus}/>
                        })
                    }
                </div>
            </div>
            <button className='visible-invite-button' onClick={() => {
                setInviteVisible(!inviteVisible);
            }}><MdOutlineEmail />{inviteVisible ? <MdOutlineArrowLeft /> : <MdOutlineArrowRight />}</button>
            <div onClick={() => setInviteVisible(false)}
                 className={inviteVisible ? 'invite-overlay visible-overlay' : 'invite-overlay invisible-overlay'}></div>
        </>
    );
};

export default InviteList;
