import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import './InviteForm.style.scss';
import { Button, Modal, Input, Select, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';
import { MdDone, MdOutlineModeEditOutline } from 'react-icons/md';
import { TbMailFast } from 'react-icons/tb';

const InviteForm = (props) => {
    const [editMember, setEditMember] = useState(false);
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
    const handleOk = () => {
        props.handleOpen();
    };

    const handleCancel = () => {
        props.handleOpen();
    };

    return (
        <Modal open={props.opening}
               title={'Thành viên trong dự án'}
               onOk={handleOk}
               onCancel={handleCancel}
               className={'member-modal'}
               footer={[<Button onClick={() => {
                   setEditMember(!editMember);
               }}><span style={{width: '20px', fontSize: '15px'}}><MdOutlineModeEditOutline/></span>{editMember?'Hoàn thành':'Chỉnh sửa'}</Button>]}>
            <div className={'member-form'}>
                <Input.Group compact>
                    <Input style={{ width: 'calc(100% - 55px)' }} placeholder={'Email người muốn mời'} />
                    <Button className={'member-form-button'} type={'primary'}><TbMailFast/></Button>
                </Input.Group>
                <div className={'member-form-list-title'}><e1></e1><e2>Tên thành viên</e2><e3>Vai trò</e3><e4>Trạng thái</e4><e5></e5></div>
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
            {!props.editMember?<div>
                <p>Member role 1</p>
                <p>Member role 2</p>
            </div>:<Select mode={'multiple'}>
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