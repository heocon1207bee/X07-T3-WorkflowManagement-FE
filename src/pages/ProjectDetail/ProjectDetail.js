import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import CardModal from '../../components/Card/CardModal';
import useMembers from '../../hooks/Project/useFetchMember';

const ProjectDetail = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleAdd = () => {
        setOpenModal(true);
    };

    const { members, error } = useMembers();
    const [memberList, setMemberList] = useState(members);
    useEffect(() => setMemberList(members), [members]);

    if (error) {
        console.log(error);
    }

    return (
        <Row justify={'center'} style={{ padding: '5em' }}>
            <Col span={12}>
                <Button onClick={handleAdd}>
                    <FcPlus />
                    Tạo việc
                </Button>
                {members && <CardModal modal={{ setOpenModal, openModal }} members={memberList} />}
            </Col>
        </Row>
    );
};

export default ProjectDetail;
