
import { Form, Input, Modal } from "antd";
import React, { useContext } from "react";

import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";


export default function AddRoomModal () {
    const {isAddRoomVisible, setAddRoomVisible} = useContext(AppContext)

    const [form] = Form.useForm();

    const {uid} = useContext(AuthContext)
   
    
    const handleOk = () =>{
    const data = form.getFieldValue();
     console.log({data});
     addDocument('rooms', {...data, members:[uid]} )
     setAddRoomVisible(false)
     form.resetFields()
    }

    const handleCancel = () =>{
        setAddRoomVisible(false);
        form.resetFields()
    }

    
    return (
        <div>
            <Modal
            
            title="Create Room"
            open ={isAddRoomVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            >
                <Form  form={form} layout="vertical" >
                    <Form.Item label="Room Name" name='name'>
                        <Input placeholder="Enter room name" />
                    </Form.Item>
                    <Form.Item label="Description" name='description'>
                        <Input placeholder="Enter room description" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
