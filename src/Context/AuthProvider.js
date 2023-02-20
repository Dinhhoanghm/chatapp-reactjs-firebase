import React  from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase/config";
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState, createContext } from "react";



const AuthContext = createContext();

export default function AuthProvider ({children}) {
    
    const navigate = useNavigate()
    
    const [user, setUser] = useState({})
    useEffect (()=>{
        const unsubscribed= onAuthStateChanged(auth,(user)=>{
            console.log(user)
            if (user) {
                const { displayName, email, uid,photoURL} = user
                setUser( {displayName, email, uid,photoURL })
                navigate('/chatroom');
                return ;
              }
              navigate('/')
        })

        return () => {
            unsubscribed();
        }
    },[navigate])


    return (
        <AuthContext.Provider value = {user}>
           {children}
        </AuthContext.Provider>
    )
}
export {AuthContext} 