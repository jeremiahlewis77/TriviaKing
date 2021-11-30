import React, { Component } from "react";
import Axios from 'axios';
import { Button, Form, Row,Modal} from 'react-bootstrap';
import logo_full from '../../images/tk_logo_full.png';
import logo_mobile from '../../images/tk_logo_small.png';
import OtpInput from 'react-otp-input';
import {Link,Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

class ForgotPassword extends Component{
    constructor(props)
    {
        super(props);
        const token = localStorage.getItem('token');
        let loggedIn=true
       
        if(token==null){
            loggedIn=false
        }
        
        this.state = {
            otp: '',
            message: '',
            loggedIn,
            username: '',
            show: false
        }
    }
    onChange = (e)=>{
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    handleClose=()=>{
        this.setState({show:false});
        window.location.href='/resetpassword';
    }
    handleChange = (otp) => this.setState({ otp });
    handleSubmit = (e) =>{
        e.preventDefault()
       
        var url='http://localhost:3002/otp/check';
            Axios.post(url,{username:this.state.username,otp:this.state.otp}).then(response => {
                console.log(response)
                if(response.data.username){
                    const cookies = new Cookies();
                    cookies.set('user', response.data.username);
                    console.log("cookie- "+cookies.get('user')); 
                    window.location='/ResetPassword';
                   
                  }
                  else{
                    alert("OTP did not match");
                  }
           
        })
    }

   sendOtp =(e) =>
    {
        e.preventDefault()
        var url='http://localhost:3002/otp/';
           console.log(this.state.username);
            Axios.post(url,{username:this.state.username}).then(res => {
                console.log(res)
           if(res.data=="success")
           {
             
            this.setState({show:true});
           this.state.message="OTP has been generated successfully and sent to your registered mail id.";
           }
           else
           {
            this.state.message="Unable to generate OTP";
            alert(this.state.message);
           }
           
        })
    }

    render(props){
        if(this.state.loggedIn){
          return <Redirect to="/categories"/>
        }
          return(
            <div className="backdrop form">
            <Form className="input rounded perfect-centering login-form">
              <div className="container">
              <Row>
                  <img src={logo_full} id="logo_full" className='login'/><img src={logo_mobile} id="logo_mobile" className='login'/>
                </Row>
            </div>
            <h4 className="gap font-weight-bold text-center" style={{color: "#ffffff"}}>
                 Forgot Password
            </h4>
           
            
            <Form.Group size="lg"  className="gap">
              <Form.Control autoFocus type="username" name="username" placeholder="Username" value={this.state.username} onChange={this.onChange}/>
            </Form.Group>
            <div className="gap">
              <Button onClick={this.sendOtp} style={{padding:'8px'}} className="btn-light float-right">send otp</Button>
            </div>

        <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>OTP Dialog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <label>OTP has been sent successfully to your registered Mail ID.</label>
          <OtpInput
                value={this.state.otp}
                onChange={this.handleChange}
                numInputs={6}
                separator={<span>  </span>}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleSubmit}>
            Submit
            </Button>
          </Modal.Footer>
        </Modal>
            
          
          </Form>
        </div>
          )
    }
}

export default ForgotPassword;