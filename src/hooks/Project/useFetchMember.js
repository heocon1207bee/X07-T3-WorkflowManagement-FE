import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectOwnerServices from '../../services/Project/ProjectOwnerServices';

const useMembers = () => {
    const { projectId } = useParams();
    const [members, setMembers] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        ProjectOwnerServices.getDetail(projectId)
            .then((res) => {
                setMembers(res.data.data.members);
            })
            .catch((err) => setError(err.response.msg));
    }, []);

    return { members, error };
};

export default useMembers;
