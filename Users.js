import { UserOutlined } from '@ant-design/icons'
import Avatar from 'antd/es/avatar/avatar'
import React from 'react'




export const Users = () => {
    const DataBaseUsers = {
        name:'Nguyễn Văn A',
        gender:'Nam',
        email:'abc@email.com',
        address:'xyz',
        phone:'0123456789',
        introduce:'hvcxs'

}
  return (
    <label style={{display:"flex", justifyContent:'space-evenly'}}>
        <div style={{
            
        }}>
            <Avatar size={180} icon={<UserOutlined/>}/>
            <p style={{fontSize:"32px"}}>Tên Người Dùng</p>
        </div>
        <div>
            <form style={{
              backgroundColor:"white",
              width:'750px',
              justifyItems:'center',
              fontSize:'18px',
            }}>
                <p>Tên: {DataBaseUsers.name}</p>
                <p>Giới Tính: {DataBaseUsers.gender}</p>
                <p>Email: {DataBaseUsers.email}</p>
                <p>Địa Chỉ: {DataBaseUsers.address}</p>
                <p>SĐT: {DataBaseUsers.phone}</p>
                <p>Giới Thiệu Bản Thân: {DataBaseUsers.introduce}</p>
            </form>
        </div>        
    </label>

  )
}
