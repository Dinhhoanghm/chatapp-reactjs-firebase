import {useEffect, useState} from "react";
 import { db } from "../firebase/config";
import { collection, onSnapshot ,query, where,orderBy} from "firebase/firestore";



const useFirestore = (collections,condition) => {
    const [documents,setDocument] = useState([])
     useEffect(()=>{
         let collectionRef = query(collection(db,collections),orderBy('createAt'));
         
             
         if(condition){
         
            if(!condition.compareValue || !condition.compareValue.length){
                return;
               }
                   collectionRef = query(collectionRef,where(condition.fieldName, condition.operator, condition.compareValue))
            }
        console.log({collectionRef})
        const unsubscribe= onSnapshot(collectionRef, (snapshot)=>{
            const documents =snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                
            }))
        setDocument(documents)
        })
        

        
        return unsubscribe;
     },[collections,condition]);
     console.log({documents})
     return documents
};

export default useFirestore;