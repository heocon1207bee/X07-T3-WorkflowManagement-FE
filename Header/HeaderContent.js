import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown } from 'antd';
import React from 'react';

const items = [
    {
      key: '1',
      label: (
        <a  rel="noopener noreferrer" href="">
          Đăng Xuất
        </a>
      ),
    }
] 


export default function HeaderContent() {
  return (
    
    <div className="header" style={{display:'flex'}}>
      
      <div style={{}}>
        <Dropdown
            
            menu={{
                items,
            }}
            
        >
            <Avatar size={42} icon={<UserOutlined />} />
        </Dropdown>
      </div>
      
    </div>
    
  )
}
