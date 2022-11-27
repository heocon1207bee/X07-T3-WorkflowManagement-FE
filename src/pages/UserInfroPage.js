import React from 'react'
import {  NotificationOutlined, UserOutlined } from '@ant-design/icons';
import {  Layout, Menu, Avatar } from 'antd';
import { Users } from '../components/Users';
import UpdateUsers from '../components/UpdateUsers';
import ChangePassword from '../components/ChangePassword';
const { Header, Content, Sider } = Layout;


 

  

export const UserInfroPage = () => {
  

  return (
    <Layout>
    <Header className="header" style={{background:"white", display:"flex", justifyContent:"space-between"}}>
      <div className="logo">
        <h1 style={{color:"#54bab9", textAlign:"center"}}>Tên Website</h1>
      </div>
      <div className='Avatar'>
        <Avatar size={48} icon={<UserOutlined />}  style={{marginRight:"2rem"}}/>
        <Avatar size={48} icon={<NotificationOutlined/>}/>
      </div>
    </Header>
    <Layout>
      <Sider width={250} className="site-layout-background" style={{background:"white"}}>
        <Menu>
          <Menu.Item id='a'>
            Thông Tin Người Dùng
          </Menu.Item>
          <Menu.Item id='b'>
            Cập Nhât Thông Tin
          </Menu.Item>
          <Menu.Item id='c'>
            Đổi Mật Khẩu
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight:'500px'
          }}
        >
          <div className='x'><Users/></div>
          <div className='y' style={{display:'none'}}><UpdateUsers/></div>
          <div className='z' style={{display:'none'}}><ChangePassword/></div>
        </Content>
      </Layout>
    </Layout>
  </Layout>
  )
}
