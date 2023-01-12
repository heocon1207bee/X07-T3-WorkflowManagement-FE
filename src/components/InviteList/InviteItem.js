import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { formatDateTime } from '../../utils/DateTimeFormater';
import ProjectServices from '../../services/Project/projectServices';
import { Spin } from 'antd';

const InviteItem = ({ data, setStatus }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [iError, setIError] = useState();
    const [loading, setLoading] = useState(false);
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const resInvites = async (res) => {
        try {
            await ProjectServices.inviteResponse(data.project.id, res);
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
        }
    };

    const handleAccept = async () => {
        setLoading(true);
        await resInvites({ status: 'ACCEPTED' });
        setLoading(false);
        setStatus('Đã chấp nhận tham gia: ' + data.project.title);
    };

    const handleReject = async () => {
        setLoading(true);
        await resInvites({ status: 'REJECTED' });
        setLoading(false);
        setStatus('Không đồng ý tham gia: ' + data.project.title);
    };

    return (
        <div className='invite-item'>
            <div className='invite-name' onClick={handleCollapse}>
                <h4 style={{ cursor: 'pointer' }}>{data.project.title} {loading && <Spin />}</h4>
                <div className='collapse-icon'>{collapsed ? <CaretUpOutlined /> : <CaretDownOutlined />}</div>
            </div>
            <Collapse isOpened={collapsed}>
                <div className='invite-info'>
                    <p>Người mời: {data.inviter.fullname}</p>
                    <p>Vào lúc: {formatDateTime(data.createdAt)}</p>
                    {/*<p>Người tạo: {}</p>*/}
                </div>
                <div className='invite-reply'>
                    <button className='cancel-button' onClick={handleReject}>Hủy bỏ</button>
                    <button className='accept-button' onClick={handleAccept}>Đồng ý</button>
                </div>
            </Collapse>
        </div>
    );
};

export default InviteItem;
