import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const InviteItem = () => {
    const [collapsed, setCollapsed] = useState(false);
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div className="invite-item">
            <div className="invite-name" onClick={handleCollapse}>
                <h4 style={{ cursor: 'pointer' }}>Tên dự án được mời</h4>
                <div className="collapse-icon">{collapsed ? <CaretUpOutlined /> : <CaretDownOutlined />}</div>
            </div>
            <Collapse isOpened={collapsed}>
                <div className="invite-info">
                    <p>Người mời: Tên Người Mời</p>
                    <p>Vào lúc: 2022/11/24 23:00</p>
                    <p>Người tạo: Tên người tạo</p>
                </div>
                <div className="invite-reply">
                    <button className="cancel-button">Hủy bỏ</button>
                    <button className="accept-button">Đồng ý</button>
                </div>
            </Collapse>
        </div>
    );
};

export default InviteItem;
