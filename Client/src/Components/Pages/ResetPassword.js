import React from 'react';
import Axios from 'axios';
import { useState } from "react";
import Cookies from 'universal-cookie';
import { Button, Form,Row } from 'react-bootstrap';
import logo_full from '../../images/tk_logo_full.png';
import logo_mobile from '../../images/tk_logo_small.png';

export default function ResetPassword() {

  const [password, setPassword] = useState("");

    Axios.defaults.withCredentials = true;
    const cookies = new Cookies();
    const username = cookies.get('user');
    
    const reset = () => {
      Axios.post("http://localhost:3002/reset", {
        username: username,
        password: password,
      }).then((response) => {
        if(response.data.goto=='/'){
          alert("Your password has been reset successfully!")
          window.location='/';
        }
        else{
          alert("Invalid");
        }
       
      });
    };
  
  

    return (
      
      <div className="backdrop form">
      <Form className="input rounded perfect-centering login-form">
        <div className="container">
        <Row>
                  <img src={logo_full} id="logo_full" className='login'/><img src={logo_mobile} id="logo_mobile" className='login'/>
                </Row>
            </div>
            <h4 className="gap font-weight-bold text-center" style={{color: "#ffffff"}}>
                 Reset Password
            </h4>
              <Form.Group className="gap">
                 
                  <Form.Control type="password" name="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
                  
              </Form.Group>
              <div className="gap">
              <Button  onClick={reset} className="btn-md rounded-pill btn-primary btn-block">Reset</Button>
              </div>
              

              
             
          </Form>
          </div>
        
      
    ); 
}
