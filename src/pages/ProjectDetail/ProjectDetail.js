import { Button, Col, Row, Space } from 'antd';
import { useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import CardModal from '../../components/Card/CardModal';

const ProjectDetail = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleAdd = () => {
        setOpenModal(true);
    };
    return (
        <Row justify={'center'} style={{ padding: '5em' }}>
            <Col span={12}>
                <Button onClick={handleAdd}>
                    <FcPlus />
                    Tạo việc
                </Button>
                <CardModal modal={{ setOpenModal, openModal }} />
            </Col>
        </Row>
    );
};

export default ProjectDetail;
