import { useEffect, useState, useCallback } from 'react';
import CardModal from '../../components/Card/CardModal';
import useMembers from '../../hooks/Project/useFetchMember';
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { BiAddToQueue, BiFilterAlt } from 'react-icons/bi';
import TaskList from '../../components/TaskList/TaskList';
import './ProjectDetails.style.scss';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectServices from '../../services/Project/projectServices';
import { useDispatch, useSelector } from 'react-redux';
import CardFilter from '../../components/CardFilter/CardFilter';

const ProjectDetail = () => {
    const themeStore = useSelector((state) => state.theme);
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

    const getProject = useCallback(async () => {
        setLoading(true);
        try {
            const getProjectResponse = await ProjectServices.getProject();
            dispatch({ type: 'setData', value: getProjectResponse.data.data.reverse() });
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
    }, [dispatch]);

    useEffect(() => {
        getProject();
    }, [projectId, getProject]);

    useEffect(() => {
        setProjectId(window.location.pathname.split('/')[3]);
    }, [setProjectId]);

    if (error) {
        console.log(error);
    }

    return (
        <div className="project-task-page">
            <ProjectList loading={loading} />
            <div>
                <div className={`project--nav ${themeStore.theme}-mode`}>
                    <div className="project-name--nav">
                        <Link
                            to="/"
                            style={{
                                color: 'rgb(255, 117, 23)',
                                fontSize: '23px',
                                textDecoration: 'none',
                                fontWeight: '600',
                            }}
                        >
                            <LeftOutlined />
                            V??? trang ch???
                        </Link>
                    </div>

                    <div className="task-option--nav">
                        <button>
                            L???c <BiFilterAlt />
                        </button>
                        <button onClick={handleAdd}>
                            T???o c??ng vi???c <BiAddToQueue />
                        </button>
                    </div>
                </div>
                {/*<CardFilter />*/}
                <div className="project-task-container">
                    <TaskList reRender={openModal} />
                </div>
            </div>
            {members && <CardModal modal={{ setOpenModal, openModal }} members={memberList} />}
        </div>
    );
};

export default ProjectDetail;
