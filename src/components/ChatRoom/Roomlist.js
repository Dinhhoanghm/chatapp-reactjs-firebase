import React, { useContext } from "react";
import {Button, Collapse, Typography} from 'antd'
import styled from "styled-components";
import {PlusSquareOutlined} from '@ant-design/icons'
import { AppContext } from "../../Context/AppProvider";


const {Panel} = Collapse

const PanelStyled = styled(Panel)`
   &&& {
    .ant-collapse-header,p{
        color: white;
    }
    .ant-collapse-content-box{
        padding: 0 40px
    }
    .add-room{
        color: white;
        padding: 0
    }
   }

`

const LinkStyled = styled(Typography.Link)`
     display: flex;
     margin-bottom: 5px;
     color: white;


`
export default function Roomlist () {
    const {rooms, setAddRoomVisible,setSelectedRoomId} = useContext(AppContext)
    console.log({rooms})
    const handleAddroom= () => {
       setAddRoomVisible(true);
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
          <PanelStyled header='Room list' key='1'>
            {
                rooms.map((room) => (<LinkStyled key = {room.id} onClick={()=>{setSelectedRoomId(room.id)}}>{room.name}</LinkStyled>))
            }
            
            <Button type="text" className="add-room" icon={<PlusSquareOutlined/>} onClick={handleAddroom}>Add room</Button>

          </PanelStyled>

        </Collapse>
    )
}