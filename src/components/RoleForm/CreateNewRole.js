import React, { useState } from 'react';
import { Button, Input, Modal, Space, Checkbox } from 'antd';
//import Checkbox from 'antd/es/checkbox/Checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import './CreateNewRole.style.scss';
import ProjectServices from '../../services/Project/projectServices';

export default function CreateNewRole(props) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState();

    // const showModal = () => {
    //   setOpen(true);
    // };
    const handleOk = (e) => {
        setLoading(true);
        const promise = new Promise(() => {
            postRole(props.projectId, inputValue, checkboxValue);
        })
            .then(props.submit())
            .finally(() => {
                setLoading(false);
            });
    };
    // const handleCancel = () => {
    //   setOpen(false);
    // };

    const postRole = async (projectId, roleName, capabilities) => {
        try {
            const postRoleResponse = await ProjectServices.addRole(projectId, roleName, capabilities);
        } catch (err) {
            if (err.response && Array.isArray(err.response.data)) {
                const errorResponse = err.response.data;
                const errorValue = errorResponse.map((e) => e.message);
                setError(errorValue);
            } else if (err.response) {
                setError(err.response.data.msg);
            } else {
                setError(err.message);
            }
        } finally {
            console.log('end role post');
        }
    };

    const onChange = (checkedValues) => {
        console.log('radio checked', checkedValues);
        setCheckboxValue([...checkedValues]);
    };
    return (
        <>
            <Modal
                open={props.open}
                title="Th??m vai tr?? m???i/ch???nh s???a"
                onOk={handleOk}
                onCancel={props.close}
                className="role-modal"
                footer={[
                    <Button className="close-role-btn" key="back" onClick={props.close}>
                        H???y
                    </Button>,
                    <Button
                        className="submit-role-btn"
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={(e) => {
                            handleOk(e);
                        }}
                    >
                        T???o
                    </Button>,
                ]}
            >
                <Input
                    placeholder="T??n Vai Tr?? M???i"
                    value={inputValue}
                    onChange={(e) => {
                        e.preventDefault();
                        setInputValue(e.target.value);
                    }}
                ></Input>
                <Checkbox.Group onChange={onChange}>
                    <Space direction="vertical" style={{ marginTop: '10px' }}>
                        <Checkbox value={'6396f45d5ddd6db8260440c9'}>Quy???n P1: C???p nh???t d??? ??n</Checkbox>
                        <Checkbox value={'6396f45d5ddd6db8260440c4'}>Quy???n P2: Qu???n l?? th??nh vi??n</Checkbox>
                        <Checkbox value={'6396f45d5ddd6db8260440c2'}>Quy???n P3: T???o m???i c??ng vi???c</Checkbox>
                        <Checkbox value={'6396f45d5ddd6db8260440c7'}>
                            Quy???n P4: C???p nh???t th??ng tin chung c??ng vi???c
                        </Checkbox>
                        <Checkbox value={'6396f45d5ddd6db8260440c8'}>Quy???n P5: C???p nh???t tr???ng th??i c??ng vi???c</Checkbox>
                        <Checkbox value={'6396f45d5ddd6db8260440c6'}>
                            Quy???n P6: C???p nh???t ng?????i th???c hi???n c??ng vi???c
                        </Checkbox>
                        <Checkbox value={'6396f45d5ddd6db8260440c3'}>Quy???n P7: H???y b??? c??ng vi???c</Checkbox>
                        <Checkbox value={'6396f45d5ddd6db8260440c5'}>Quy???n P8: Qu???n l?? vai tr??</Checkbox>
                    </Space>
                </Checkbox.Group>
            </Modal>
        </>
    );
}
