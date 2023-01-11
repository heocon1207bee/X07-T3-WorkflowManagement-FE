import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import './InviteForm.style.scss';
import { Button, Modal, Input, Select, Tooltip, Form } from 'antd';
import { useSelector } from 'react-redux';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';
import { MdDone, MdOutlineModeEditOutline } from 'react-icons/md';
import { TbMailFast } from 'react-icons/tb';
import ProjectServices from '../../services/Project/projectServices';
import { roleTransStringToID } from '../../utils/roleTrans';

const InviteForm = (props) => {
    const [editMember, setEditMember] = useState(false);
    const [role, setRole] = useState([]);
    const [inputEmail, setInputEmail] = useState('');
    const [inputRoleId, setInputRoleId] = useState('');
    const [error, setError] = useState();
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

    useEffect(() => {
        getRole();
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
    }

    const postInvite = async (projectId, data) => {
        try {
            const postRoleResponse = await ProjectServices.inviteMember(projectId, data);
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
            console.log('end role post');
        }
    };

    const handleSendInvite = (e) => {
        e.preventDefault();
        const re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
        if(inputEmail.trim() === '') {
            console.log('Không được để email trống')
        } else if(!inputEmail.trim().toLowerCase().match(re)) {
            console.log('Hãy nhập đúng định dạng email')
        } else if(inputRoleId === '') {
            console.log('Không được để vai trò trống')
        } else {
            const postData = {
                'email': inputEmail.trim(),
                'roleId': inputRoleId
            }
            postInvite(props.projectId, postData).then(r => console.log('r'));
        }
    };

    return (
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
                <div style={{display: 'flex', justifyContent:'space-around'}}>
                    <Input value={inputEmail} onChange={(e)=>{setInputEmail(e.target.value)}} placeholder={'Email người muốn mời'} name={'email'} style={{ width: '55%' }}/>
                    <Select value={inputRoleId} defaultValue={getMemberRoleId(role)} onChange={(value)=>setInputRoleId(value)} placeholder='Vai trò' options={getAllRoleName(role)} name={'roleId'} style={{ width: '30%' }} required />
                    <Button className='member-form-button' style={{ width: '15%', color: 'white'}} onClick={handleSendInvite}>
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
                    <MemberItem editMember={editMember} />
                    <MemberItem editMember={editMember} />
                </ul>
            </div>
        </Modal>
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
    return (
        <li className={'member-item'} style={{ listStyle: 'none' }}>
            <Button className={'edit-button'} onClick={() => {
                setEditing(!editing);
            }} style={props.editMember ? {
                transform: 'scale(1)',
                visibility: 'visible',
                width: '100%',
            } : null}>{editing ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}</Button>
            <p>Member name</p>
            {!props.editMember ? <div>
                <p>Member role 1</p>
                <p>Member role 2</p>
            </div> : <Select>
                <Select.Option value={1}>Vai trò 1</Select.Option>
                <Select.Option value={2}>Vai trò 2</Select.Option>
                <Select.Option value={3}>Vai trò 3</Select.Option>
            </Select>}
            <p><MdDone color={'green'} /></p>
            <Tooltip title={'Xóa'}><Button className={'delete-button'} style={editing ? {
                transform: 'scale(1)',
                visibility: 'visible',
                width: '100%',
            } : null}><AiOutlineDelete /></Button></Tooltip>
        </li>
    );
};