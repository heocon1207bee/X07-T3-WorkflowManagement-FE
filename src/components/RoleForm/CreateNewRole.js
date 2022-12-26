import React, { useState } from 'react';
import { Button, Input, Modal, Radio, Space } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';

export default function CreateNewRole(props) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
      setOpen(true);
    };
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 3000);
    };
    const handleCancel = () => {
      setOpen(false);
    };
    const [value, setValue] = useState(1);
    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    }
    return (
      <>
        {/*<button type="primary" onClick={showModal}>*/}
        {/*    Tạo mới vai trò <PlusOutlined/>*/}
        {/*</button>*/}
        
        <Modal
          open={props.open}
          title="Thêm vai trò mới/chỉnh sửa"
          onOk={handleOk}
          onCancel={e => {
              handleCancel();
              props.close();
            }
          }
          footer={[
            <Button key="back" onClick={e=>{handleCancel(); props.close()}} style={{width:'120px', backgroundColor:'#ff6464', color:'white'}}>
                Hủy
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={e=>{handleOk(); props.close()}} style={{width:'120px', backgroundColor:'#62d8d7', color:'white'}}>
              Tạo
            </Button>,
          ]}
        >
         <Input placeholder='Tên Vai Trò Mới'></Input> 
         <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
                <Checkbox value={1}>Quyền P1</Checkbox>
                <Checkbox value={2}>Quyền P2</Checkbox>
                <Checkbox value={3}>Quyền P3</Checkbox>
                <Checkbox value={4}>Quyền P4</Checkbox>
                <Checkbox value={5}>Quyền P5</Checkbox>
                <Checkbox value={6}>Quyền P6</Checkbox>
                <Checkbox value={7}>Quyền P7</Checkbox>
                <Checkbox value={8}>Quyền P8</Checkbox>
                <Checkbox value={9}>Quyền P9</Checkbox>
                
            </Space>
         </Radio.Group>
        </Modal>
      </>
    );
  };
