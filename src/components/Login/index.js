import React from "react"
import { Row,Col, Button,Typography} from 'antd'
import {signInWithPopup, FacebookAuthProvider, getAdditionalUserInfo} from "firebase/auth"
import { app,auth} from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";





const provider = new FacebookAuthProvider(app);
const {Title} = Typography


export default function Login () {

    
    const handleFbLogin = () => {

          signInWithPopup(auth,provider)
         .then( (result) => {
            const additionalUserInfo = getAdditionalUserInfo(result)
            const user = result.user
            // The signed-in user info.
            console.log({user})
            console.log({additionalUserInfo})
            
            if(additionalUserInfo.isNewUser){
              addDocument ("users",{
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                  uid: user.uid,
                  providerId: user.providerId,
                  keywords: generateKeywords(user.displayName?.toLowerCase()),
               
              });
             
            }   
          
          })
          .catch((error) => {
            console.log("ERROR!!!")
          });
        
    }
    
    
    return (
        <div>
            <Row justify='center' style= {{height: 800}}>
                <Col span= {8}>
                    <Title styel={{textAlign: 'center'}} level ={3}>
                       Fun Chat
                    </Title>
                    <Button style={{width: '100%', marginBottom: 5}} onClick={handleFbLogin}>
                      Đăng nhập bằng FaceBook
                    </Button>
                    <Button style={{width: '100%'}}>
                        Đăng nhập bằng Google
                    </Button>
                
                </Col>
            </Row>

        </div>
    )
}