import React, { useEffect, useState } from 'react';
import RoleItem from './RoleItem';
import CreateNewRole from './CreateNewRole';
import { Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProjectServices from '../../services/Project/projectServices';

const RoleForm = (props) => {
    const [addRole, setAddRole] = useState(false);
    const [error, setError] = useState();
    const [role, setRole] = useState([]);
    const [reloadState, setReloadState] = useState(false);

    useEffect(() => {
        getRole();
    }, [props.projectId, addRole]);

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
            await setRole(role.sort((a, b)=>a.name > b.name));
        }
    };

    const submitAddModal = async () =>{
        await getRole()
        setAddRole(false)
    }


    return (
        <Modal title='Vai trò trong dự án'
               className='role-container'
               open={props.opening}
               onCancel={e => {
                   //e.stopPropagation();
                   props.handleOpen();
               }}
               footer={[<Button onClick={e => {setAddRole(true)}}>Tạo mới vai trò <PlusOutlined /></Button>]}>
            {/*<div className='role-container' onClick={e => e.stopPropagation()}>*/}
            {/*    <div className='role-label'>*/}
            {/*        <h4>Vai trò trong dự án</h4>*/}
            {addRole && <CreateNewRole open={addRole} submit={submitAddModal} close={e=>{setAddRole(false)}} projectId={props.projectId} />}
            {/*</div>*/}
            <div className='role-list'>
                {role.map(r => {
                    return <RoleItem key={r._id} roleName={r.name} capabilities={r.capabilities}/>;
                })}
            </div>
            {/*</div>*/}
        </Modal>

    );
};

export default RoleForm;