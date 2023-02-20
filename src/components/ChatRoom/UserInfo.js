import { Avatar, Button, Typography } from "antd"
import { signOut} from "firebase/auth"
import React from "react"
import styled from "styled-components"
import { auth } from "../../firebase/config" 
import {useContext} from "react"
import { AuthContext } from "../../Context/AuthProvider"



const WrapperStyled = styled.div`
     display: flex;
     justify-content:space-between;
     padding: 12px 16px;
     border-bottom: 1px solid rgba(82,38,83);
     .username {
        color: white;
        margin-left: 5
     }
`

export default function UserInfo(){

   const { 
    displayName,
    photoUrl
    
   } =useContext(AuthContext);
   

    return(
        <WrapperStyled>
            <div>
                <Avatar src={photoUrl}>{photoUrl ? "" : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
                
            </div>
            <Button ghost onClick={()=>{signOut(auth)}}>Log out</Button>
        </WrapperStyled>
    )
}