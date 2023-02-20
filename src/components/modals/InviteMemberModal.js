

import { Avatar, Form, Modal, Select, Spin } from "antd";
import { collection, limit, orderBy, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { debounce } from "lodash";
import React, { useContext, useMemo, useState,useEffect } from "react";
import { db } from "../../firebase/config";

import { AppContext } from "../../Context/AppProvider";

// import { AuthContext } from "../../Context/AuthProvider";
// import { addDocument } from "../../firebase/services";

function DebounceSelect({
    fetchOptions,
    curMembers,
    debounceTimeout = 300,
  
    ...props
  }) {
    // Search: abcddassdfasdf
  
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
  
    const debounceFetcher =useMemo(() => {
      const loadOptions = (value) => {
        setOptions([]);
        setFetching(true);
  
        fetchOptions(value,props.curMembers).then((newOptions) => {
          setOptions(newOptions);
          setFetching(false);
        });
      };
  
      return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions,props.curMembers]);
  
    useEffect(() => {
      return () => {
        // clear when unmount
        setOptions([]);
      };
    }, []);
  
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size='small' /> : null}
        {...props}
      >
        {options.map((opt) => (
          <Select.Option key={opt.value} value={opt.value} title={opt.label}>
            <Avatar size='small' src={opt.photoURL}>
              {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {` ${opt.label}`}
          </Select.Option>
        ))}
      </Select>
    );
  }

// function DebounceSelect ({fetchOptions, debounceTimeout = 300,...props}) {
//     const [fetching, setFetching] = useState(false)
//     const [ options, setOptions]= useState([])

//     const debounceFetcher = useMemo(() => {
//         const loadOptions = (value) =>{
//             setOptions([])
//             setFetching(true)

//             fetchOptions(value).then(newOptions => {
//                 setOptions(newOptions)
//                 setFetching(false)
//             })
//         }
//         return debounce(loadOptions,debounceTimeout)
//     },[debounceTimeout, fetchOptions])

//     return  (
       
//         <Select  labelInValue
//             onSearch={debounceFetcher}
//             notFoundContent = {fetching ? <Spin size = 'small'/> : null}
//             {...props}>
//          {  
//             options.map(opt => (
//                 <Select.Option>
//                     <Avatar size='small' src = {opt.photoURL}>
//                         {opt.photoURL? '' : opt.label?.charAt(0)?.toUpperCase()}
//                     </Avatar>
//                     {`${opt.label}`}
//                 </Select.Option>
//             ))
//          }

//         </Select>
//     )
// }

async function fetchUserList (search,curMembers) {
    const q = query (collection(db,'users'),where('keywords','array-contains',search?.toLowerCase()),orderBy('displayName'),limit(20))
    const querySnapshot = await getDocs(q)
    console.log({querySnapshot,q})
    // querySnapshot.docs
    // .map((doc) => ({
    //   label: doc.data().displayName,
    //   value: doc.data().uid,
    //   photoURL: doc.data().photoURL,
      
    // }))
    return querySnapshot.docs.map((doc)=> ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL
    }))
   
  }
    

export default function InviteMemberModal () {
    const {isInviteMemberVisible,setInviteMemberVisible,selectedRoom,selectedRoomId} = useContext(AppContext)
    const [value, setValue] = useState([])

    const [form] = Form.useForm();

   
   
    
    const handleOk = () =>{
      

      // update members in current room
      const roomRef = doc(db,'rooms',selectedRoomId)
    
      updateDoc(roomRef,{
        members: [...selectedRoom.members, ...value.map((val) => val.value)],
      })
      
      
      
      setInviteMemberVisible(false)
      form.resetFields()
      setValue([]);
    }

    const handleCancel = () =>{
      setValue([])
        setInviteMemberVisible(false)
        form.resetFields()
    }

    console.log({value})
    return (
        <div>
            <Modal
            
            title="Invite Member"
            open ={isInviteMemberVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true}
            >
                <Form  form={form} layout="vertical" >
                    <DebounceSelect
                      mode = "multiple"
                      label = "members'name"
                      value= {value}
                      placeholder = "enter member's name"
                      fetchOptions={fetchUserList}
                      onChange = {newValue => setValue(newValue)}
                      style = {{width:'100%'}}
                      name = "search-user"
                      curMembers ={selectedRoom?selectedRoom.members:[]}
                      >

                    </DebounceSelect>
                </Form>
            </Modal>
        </div>
    )
}
