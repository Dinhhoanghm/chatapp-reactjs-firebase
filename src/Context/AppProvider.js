import React, { useState }  from "react";
import {  createContext , useContext,useMemo} from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";





const  AppContext = createContext();

export default function AppProvider ({children}) {
    const [isAddRoomVisible, setAddRoomVisible] = useState(false)
    const [isInviteMemberVisible, setInviteMemberVisible]= useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')
    const {uid} =useContext (AuthContext)
    const roomCondition = useMemo(()=>{
        return { 
           fieldName:'members',
           operator: 'array-contains',
           compareValue: uid,

        }
    },[uid])


    
    const rooms = useFirestore('rooms', roomCondition)
    
    const selectedRoom = useMemo(
        () => rooms.find((room) => room.id === selectedRoomId),
        [rooms, selectedRoomId]
    )

    console.log ({rooms,selectedRoomId,selectedRoom})
    
    const userCondition = useMemo(()=>{
        return { 
           fieldName:'uid',
           operator: 'in',
           compareValue: selectedRoom? selectedRoom.members : [],

        }
    },[selectedRoom])

   
    const members = useFirestore('users', userCondition)

   console.log({members})


     
   
    
    

     


    return (
        <AppContext.Provider value = {{rooms, isAddRoomVisible,setAddRoomVisible,selectedRoomId, setSelectedRoomId,selectedRoom,members,isInviteMemberVisible,setInviteMemberVisible}}>
           {children}
        </AppContext.Provider>
    )
}
export {AppContext}