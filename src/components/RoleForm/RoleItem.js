import React, {useState} from 'react';
import {Collapse} from 'react-collapse';
import {Space, Tooltip} from 'antd'
import {roleTrans} from '../../utils/roleTrans'
import {FaUniversalAccess} from 'react-icons/fa'

const RoleItem = ({roleName='Chưa có tên', capabilities=[]}) => {
    const [isCollapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!isCollapse);
    }
    const newCap = capabilities.map((d)=>{return roleTrans(d,true)}).sort();
    return (
        <div className='role-item'>
            <div className='main-role-item'>
                <Tooltip title={!isCollapse?'Mở rộng':'Thu gọn'} color='rgba(27, 27, 28, 0.9)'>
                    <p onClick={handleCollapse}>{roleName}</p>
                </Tooltip>
                <button onClick={e => {e.stopPropagation()}}>Chỉnh sửa</button>
            </div>
            <Collapse isOpened={isCollapse}>
                <Space direction='vertical' style={{marginTop:'20px'}} onClick={e=>{e.stopPropagation()}}>
                    {newCap.map((d) => {
                        return <small className='role-item-info'>
                            {d}
                        </small>
                    })}
                </Space>
            </Collapse>
        </div>
    );
};

export default RoleItem;