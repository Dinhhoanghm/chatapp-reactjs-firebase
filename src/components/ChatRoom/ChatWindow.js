import { Avatar, Button, Input, Tooltip,Form} from "antd"
import React, { useContext, useMemo, useState} from "react"
import styled from "styled-components"
import {UserAddOutlined} from '@ant-design/icons'
import  {addDocument} from '../../firebase/services'

import Message from "./Message"
import { AppContext } from "../../Context/AppProvider"
import { AuthContext } from "../../Context/AuthProvider"
import useFirestore from "../../hooks/useFirestore"
import { formatRelative } from "date-fns"


const HeaderStyled = styled.div`
   display: flex;
   justify-content: space-between;
   height: 56px;
   padding: 0 16px;
   align-items: center;
   border-bottom: 1px solid rgb(230,230,230);

.header_infor{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
.header_title{
        margin: 0;
        font-weight: bold;
    }
.header_description{
        font-size: 12px;
    }


`
const ButtonGroupStyled = styled.div`
   display: flex;
   align-items: center;

`

const MessageListStyled= styled.div`
   max-height: 100%;
   overflow-y : auto;
`
const WrapperStyled =styled.div`
height: 100vh;
`

const ContentStyled = styled.div`
height: calc(100% - 56px);
display: flex;
flex-direction: column;
padding: 11px;
justify-content:flex-end;

`
const FormStyled = styled(Form)`
display: flex;
justify-content: space-betweem;
align-items: center;
padding: 2px 2px 2px 0;
border: 1px solid rgb(230,230,230);
border-radius: 2px;

.ant-form-item {
    flex: 1;
    margin-bottom: 0;

}

`

function formatDate (seconds) {
    let formattedDate = '';
    if(seconds){
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
         return formattedDate
    }
}


export default function ChatWindow () {
    const {selectedRoom,members ,setInviteMemberVisible}= useContext(AppContext)
    const [inputValue,setInputValue] = useState('')
    const {uid,displayName,photoURL} = useContext(AuthContext)

    const [form] = Form.useForm()

    console.log({selectedRoom,members})

    const handleInputChange = (e) => {
      setInputValue(e.target.value)
    }

    const handleOnSubmit = () => {
     addDocument('messages',{
        text: inputValue,
        uid,
        photoURL,
        roomId: selectedRoom? selectedRoom.id: '',
        displayName
     })
     form.resetFields(['messages'])

    }
    const MessageCondition = useMemo(()=>({
        fieldName: 'roomId',
        operator :'==',
        compareValue: selectedRoom? selectedRoom.id : ''
    }),[selectedRoom])

  const messages = useFirestore('messages',MessageCondition)

  console.log({messages})

    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className="header_info">
                    <p className="header_title">{selectedRoom ? selectedRoom.name : ''}</p>
                    <span className="header_description">{selectedRoom ? selectedRoom.description : ''}</span>
                </div>
                <ButtonGroupStyled>
                    <Button icon={<UserAddOutlined/>} type='text' onClick={() => setInviteMemberVisible(true)}>Invite</Button>
                    <Avatar.Group size='small' maxCount={2}>
                            {
                                members.map((member) => 
                                ( <Tooltip title={member.displayName} key={member.id}> <Avatar src={member.photoURL}>{member.photoURL ? '' :member.displayName.charAt(0)?.toUpperCase()}</Avatar> </Tooltip>))
                            }
                    </Avatar.Group>

                </ButtonGroupStyled>
            </HeaderStyled>
            
            <ContentStyled>
                <MessageListStyled>
                    {
                        messages.map(mes =>  <Message 
                            key ={ mes.id}
                            text={mes.text}
                            photoURL={mes.photoURL}
                             displayName={mes.displayName} 
                             createdAt={mes.createAt}/>)
                    }

                  
                </MessageListStyled>
                <FormStyled form={form}>
                    <Form.Item name='messages'>
                        <Input 
                        onChange={handleInputChange}
                        onPressEnter={handleOnSubmit}
                        placeholder="Send messages..." bordered={false} autoComplete="off"/>
                    </Form.Item>
                    <Button type = "primary" onClick={handleOnSubmit} >Send</Button>
                </FormStyled>
            
               

            </ContentStyled>
        </WrapperStyled>
    )
}