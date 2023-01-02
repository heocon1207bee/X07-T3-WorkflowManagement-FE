import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import CardModal from '../../components/Card/CardModal';
import useMembers from '../../hooks/Project/useFetchMember';
import { Link, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { BiAddToQueue, BiFilterAlt } from 'react-icons/bi';
import TaskList from '../../components/TaskList/TaskList';
import './ProjectDetails.style.scss';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectServices from '../../services/Project/projectServices';
import { useDispatch, useSelector } from 'react-redux';
import CardServices from '../../services/Project/Card/CardServices';

const ProjectDetail = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pError, setPError] = useState();
    const [projectId, setProjectId] = useState(window.location.pathname.split('/')[3]);
    const handleAdd = () => {
        setOpenModal(true);
    };

    const { members, error } = useMembers();
    const [memberList, setMemberList] = useState(members);
    useEffect(() => setMemberList(members), [members]);

    const dispatch = useDispatch();

    useEffect(() => {
        getProject();
    }, [projectId]);

    useEffect(() => {
        setProjectId(window.location.pathname.split('/')[3]);
    });

    const getProject = async () => {
        setLoading(true);
        try {
            const getProjectResponse = await ProjectServices.getProject();
            dispatch({ 'type': 'setData', 'value': getProjectResponse.data.data.reverse() });
            setLoading(false);
        } catch (err) {
            if (err.response && Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setPError(errorValue);
            } else if (err.response) {
                setPError(err.response.data.msg);
            } else {
                setPError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        console.log(error);
    }

    const handleModal = () => {
        setOpenModal(!openModal);
    };

    return (
        <div className='project-task-page'>
            <ProjectList loading={loading} />
            <div>
                <div className='project--nav'>
                    <div className='project-name--nav'>
                        <Link to='/' style={{
                            color: 'rgb(255, 117, 23)',
                            fontSize: '23px',
                            textDecoration: 'none',
                            fontWeight: '600',
                        }}><LeftOutlined />Tên của dự án</Link>
                    </div>
                    <div className='task-option--nav'>
                        <button>Lọc <BiFilterAlt/></button>
                        <button
                            onClick={handleAdd}
                        >Tạo công việc <BiAddToQueue/></button>
                    </div>
                </div>
                <div className='project-task-container'>
                    <TaskList reRender={openModal} />
                </div>
            </div>
               {members && <CardModal modal={{ setOpenModal, openModal }} members={memberList} />}
        </div>
    );
};

export default ProjectDetail;
