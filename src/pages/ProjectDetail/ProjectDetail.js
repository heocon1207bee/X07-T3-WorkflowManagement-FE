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
import ProjectForm from '../../components/ProjectModal/ProjectModal';
import { FORM_EDIT } from '../../configs/FORM_STATUS';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
    const themeStore = useSelector((state) => state.theme);
    const [openModal, setOpenModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [iError, setIError] = useState();
    const [pError, setPError] = useState();
    const [projectId, setProjectId] = useState(window.location.pathname.split('/')[3]);
    const [projectInfo, setProjectInfo] = useState({});
    const [openProject, setOpenProject] = useState(false);
    const [formType, setFormType] = useState(FORM_EDIT);
    const [currentProject, setCurrentProject] = useState(null);

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

    const getProjectInfo = async (setError, projectId) => {
        try {
            const getProjectInfo = await ProjectServices.getProjectInfo(projectId);
            setProjectInfo(getProjectInfo.data.data);
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

    useEffect(() => {
        getProject();
        getProjectInfo(setIError, projectId);
    }, [projectId, getProject]);

    useEffect(() => {
        setProjectId(window.location.pathname.split('/')[3]);
    }, [useParams(), getProject]);

    if (error) {
        console.log(error);
    }

    const handleFilterForm = () => {
        setOpenFilter(!openFilter);
    }

    return (
        <div className={`project-task-page ${themeStore.theme}-mode`}>
            <ProjectList loading={loading} modal={{ setOpenProject, setFormType, setCurrentProject }} />
            <div style={{maxHeight: 'calc(100vh - 60px)', overflow: 'scroll'}}>
                <div className={`project--nav ${themeStore.theme}-mode`}>
                    <div className="project-name--nav">
                        <Link
                            to="/"
                            style={{
                                color: 'rgb(255, 117, 23)',
                                textDecoration: 'none',
                                fontWeight: '600',
                            }}
                        >
                            <LeftOutlined />
                            {projectInfo.title}
                        </Link>
                    </div>

                    <div className="task-option--nav">
                        {!openFilter&&<button onClick={handleFilterForm}>
                            Lọc <span style={{width: '5px'}}></span> <BiFilterAlt />
                        </button>}
                        <button onClick={handleAdd}>
                            Tạo công việc <span style={{width: '5px'}}></span> <BiAddToQueue />
                        </button>
                    </div>
                </div>
                {openFilter&&<CardFilter members={projectInfo.members} formClose={handleFilterForm}/>}
                <div className="project-task-container">
                    <TaskList reRender={openModal}/>
                </div>
            </div>
            {members && <CardModal modal={{ setOpenModal, openModal }} members={memberList} />}
            <ProjectForm modal={{ openProject, setOpenProject, currentProject }} type={formType} />
        </div>
    );
};

export default ProjectDetail;
