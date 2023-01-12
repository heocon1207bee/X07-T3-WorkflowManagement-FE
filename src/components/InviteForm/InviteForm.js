import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import './InviteForm.style.scss';
import { Button, Modal, Input, Select, Tooltip, Form, notification } from 'antd';
import { useSelector } from 'react-redux';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';
import { MdDone, MdOutlineModeEditOutline } from 'react-icons/md';
import { TbMailFast } from 'react-icons/tb';
import { TiTick, TiArrowRight, TiTimes } from 'react-icons/ti';
import ProjectServices from '../../services/Project/projectServices';

const InviteForm = (props) => {
    const [editMember, setEditMember] = useState(false);
    const [role, setRole] = useState([]);
    const [memberInfo, setMemberInfo] = useState([]);
    const [inputEmail, setInputEmail] = useState('');
    const [inputRoleId, setInputRoleId] = useState('');
    const [error, setError] = useState();
    const [iError, setIError] = useState();
    const [mError, setMError] = useState();
    const ref1 = useRef(null);
    const [r1W, setR1W] = useState(0);
    const ref2 = useRef(null);
    const [r2W, setR2W] = useState(0);
    const ref3 = useRef(null);
    const [r3W, setR3W] = useState(0);
    const ref4 = useRef(null);
    const [r4W, setR4W] = useState(0);
    const ref5 = useRef(null);
    const [r5W, setR5W] = useState(0);
    const themeStore = useSelector(state => state.theme);

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mes, des) => {
        api[type]({
            message: mes,
            description: des,
        });
    };

    useEffect(() => {
        getRole();
        getMemberInfo(setMError, props.projectId);
    }, [props.projectId]);

    const getRole = async () => {
        let role = [];
        try {
            const getRoleResponse = await ProjectServices.getRole(props.projectId);
            role = getRoleResponse.data.roles;
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
            await setRole(role.sort((a, b) => a.name > b.name));
        }
    };

    const handleCancel = () => {
        props.handleOpen();
    };

    const getAllRoleName = (roles) => {
        const roleName = [];
        roles.map((d) => {
            roleName.push({ value: d._id, label: d.name });
        });
        return roleName;
    };

    const getMemberRoleId = (roles) => {
        let id = '';
        roles.map(d => {
            d.name === 'Thành viên' && (id = d._id);
        });
        return id;
    };

    const postInvite = async (projectId, data) => {
        try {
            const postInvite = await ProjectServices.inviteMember(projectId, data);
        } catch (err) {
            if (err.response && Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setIError(errorValue);
            } else if (err.response) {
                setIError(err.response.data.msg);
            } else {
                setIError(err.message);
            }
        } finally {
            console.log('end role post');
        }
    };

    const getMemberInfo = async (setError, projectId) => {
        try {
            const getProjectInfo = await ProjectServices.getProjectInfo(projectId);
            setMemberInfo(getProjectInfo.data.data.members);
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

    const handleSendInvite = async (e) => {
        e.preventDefault();
        setIError();
        const re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        if (inputEmail.trim() === '') {
            openNotificationWithIcon('warning', 'Cảnh báo', 'Không được để email trống');
        } else if (!inputEmail.trim().toLowerCase().match(re)) {
            openNotificationWithIcon('warning', 'Cảnh báo', 'Hãy nhập đúng định dạng email');
        } else if (inputRoleId === '') {
            openNotificationWithIcon('warning', 'Cảnh báo', 'Không được để vai trò trống');
        } else {
            const postData = {
                'email': inputEmail.trim(),
                'roleId': inputRoleId,
            };
            await postInvite(props.projectId, postData);
            iError ?
                openNotificationWithIcon('error', 'Có lỗi xảy ra', 'Không thể gửi lời mời! ' + iError) :
                openNotificationWithIcon('success', 'Thành công', 'Đã gửi lời mời');
            setInputEmail('');
            setInputRoleId('');
        }
    };

    return (
        <>
            {contextHolder}
            <Modal open={props.opening}
                   title={'Thành viên trong dự án'}
                   onCancel={handleCancel}
                   className={'member-modal'}
                   footer={[<Button onClick={() => {
                       setEditMember(!editMember);
                   }}><span style={{
                       width: '20px',
                       fontSize: '15px',
                   }}><MdOutlineModeEditOutline /></span>{editMember ? 'Hoàn thành' : 'Chỉnh sửa'}</Button>]}>
                <div className={'member-form'}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Input value={inputEmail} onChange={(e) => {
                            setInputEmail(e.target.value);
                        }} placeholder={'Email người muốn mời'} name={'email'} style={{ width: '55%' }}
                               onKeyPress={(e) => {
                                   if (e.key === 'Enter') {
                                       handleSendInvite(e);
                                   }
                               }} />
                        <Select value={inputRoleId} defaultValue={getMemberRoleId(role)}
                                onChange={(value) => setInputRoleId(value)} placeholder='Vai trò'
                                options={getAllRoleName(role)} name={'roleId'} style={{ width: '30%' }} />
                        <Button className='member-form-button' style={{ width: '15%', color: 'white' }}
                                onClick={handleSendInvite}>
                            <TbMailFast />
                        </Button>
                    </div>
                    <div className={'member-form-list-title'}>
                        <div></div>
                        <div>Tên thành viên</div>
                        <div>Vai trò</div>
                        <div>Trạng thái</div>
                        <div></div>
                    </div>
                    <ul className={'member-form-list'}>
                        {memberInfo.map(data => {
                            return <MemberItem key={data._id} editMember={editMember} data={data}
                                               roleName={getAllRoleName(role)} />;
                        })}
                    </ul>
                </div>
            </Modal>
        </>
    );
};

InviteForm.defaultProps = {
    projectId: '',
    opening: () => null,
    handleOpen: () => null,
};

export default InviteForm;

export const MemberItem = (props) => {
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        !props.editMember && setEditing(false);
    }, [props.editMember]);
    const handleEdit = () => {

    };
    const statusToIcon = (status) => {
        switch (status) {
            case 'ACCEPTED':
                return (<Tooltip title='Đã tham gia'><TiTick color='green' /></Tooltip>);
            case 'REJECTED':
                return (<Tooltip title='Đã từ chối'><TiTimes color='red' /></Tooltip>);
            case 'WAITING':
                return (<Tooltip title='Đang chờ phản hồi'><TiArrowRight color='orange' /></Tooltip>);
            default:
                break;
        }
    };
    return (
        <li className={'member-item'} style={{ listStyle: 'none' }}>
            <Button className={'edit-button'} onClick={() => {
                setEditing(!editing);
            }} style={props.editMember ? {
                transform: 'scale(1)',
                visibility: 'visible',
                width: '100%',
            } : null}>{editing ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}</Button>
            <p>{props.data.user.fullname}</p>
            {!props.editMember ? <div>
                {props.data.role.name}
            </div> : <Select>
                {props.roleName.map(role => {
                    return <Select.Option value={role.value}>{role.label}</Select.Option>;
                })}
            </Select>}
            <p>{statusToIcon(props.data.status)}</p>
            <Tooltip title={'Xóa'}><Button className={'delete-button'} style={editing ? {
                transform: 'scale(1)',
                visibility: 'visible',
                width: '100%',
            } : null}><AiOutlineDelete /></Button></Tooltip>
        </li>
    );
};