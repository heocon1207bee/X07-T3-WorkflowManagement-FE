import React, {useState} from 'react'
import {  Button, Layout } from 'antd';
import UpdateUsers from '../../components/InfoForm/UpdateUsers';
import ChangePassword from '../../components/InfoForm/ChangePassword';
import { HomeOutlined } from '@ant-design/icons'




const { Header, Content, Sider } = Layout;


const handleClick = () =>{
  
}

export default function InfoForm() {
  const [show, setShow] = useState(true);
  return (
    <Layout>
      <Sider width={250} className="site-layout-background" style={{background:"white"}}>

        <Button style={{width:'100%'}}><HomeOutlined/> <a href='http://localhost:3000/'> Trang Chủ</a> </Button>
        <Button  style={{width:'100%'}} onClick={() => setShow(true)}>Cập Nhật Thông Tin</Button>
        
        <Button  style={{width:'100%'}}  onClick ={() => setShow(false)}>Thay Đổi Mật Khẩu</Button>
      </Sider>
    <Layout>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight:'500px'
          }}
        >
          {
            show?<UpdateUsers/>:<ChangePassword/>
          }
        </Content>
      </Layout>
    </Layout>
  </Layout>
  )
}
