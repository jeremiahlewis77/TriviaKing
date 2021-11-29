import React, { Component } from "react";
import {Button, Form, Row} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo_full from "../../images/tk_logo_full.png";
import logo_mobile from "../../images/tk_logo_small.png";

class Register extends Component{
    constructor(props){
        super(props);
        const token = localStorage.getItem("token");
        let loggedIn=true;
         if(token==null){
            loggedIn=false
             }
        this.state={
          username:"", 
          password:"",
          email:"",
          confirmpassword:"",
          usernameError:"",
          emailError:"",
          passwordError:"",
          passwordMatchError:"",
          loggedIn
        }
    }
    onChange = (e)=>{
        this.setState({
          [e.target.name]: e.target.value
        })
    if(e.target.name==="username")
    {
      this.setState({
        usernameError: ""
      })
    }
    if(e.target.name==="password")
    {
      this.setState({
        passwordError: ""
      })
    }
    if(e.target.name==="email")
    {
      this.setState({
        emailError: ""
      })
    }
    if(e.target.name==="confirmpassword")
    {
      this.setState({
        passwordMatchError: ""
      })
    }
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        if(this.state.username==="")
        {
          this.setState({
            usernameError: "Username must be entered."
          })
        }
        if(this.state.password==="")
        {
          this.setState({
            passwordError: "Password must be entered."
          })
        }
        else if(this.state.password.length<6)
        {
            this.setState({
                passwordError: "Password must have atleast 6 characters."
              })
        }
        if(this.state.confirmpassword==="")
        {
          this.setState({
            passwordMatchError: "Re-enter the password."
          })
        }
        else if(this.state.password!==this.state.confirmpassword)
        {
            this.setState({
                passwordMatchError: "Passwords doesn't match."
              })
        }
        if(this.state.email==="")
        {
          this.setState({
            emailError: "Email must be entered."
          })
        }
        else if(!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email))){
            this.setState({
                emailError: "Entered Email Address is invalid."
              })
        }
        
        else if(this.state.usernameError==="" && this.state.passwordError==="" && this.state.passwordMatchError==="" && this.state.emailError===""){
         Axios.post('https://triviaking.azurewebsites.net/register',{
           username:this.state.username,
           password:this.state.password,
           email:this.state.email,
         }).then((response) => {
             console.log(response);
            if(response.data.code==="ER_DUP_ENTRY")
            {
                this.setState({
                    username:"",
                    email:"",
                    confirmpassword:"",
                    password:""
                  })
                alert('user already exists!!!');
            }
            else{
                alert('user created successfully!!!');
                window.location.href='/';
            }
             });
            }
     }
   
    render(props){
        if(this.state.loggedIn){
            return <Redirect to="/categories"/>
          }
        return(
            <div className="backdrop form">
            <Form  className="fontClass input rounded perfect-centering login-form">
                <div className="container">
                    <Row>
                        <img src={logo_full} id="logo_full" className='login'/><img src={logo_mobile} id="logo_mobile" className='login'/>
                    </Row>
                </div>
                <h4 className="gap font-weight-bold text-center" style={{color: "#ffffff"}}>Registration</h4>
              <Form.Group size="lg"  className="gap">
                <Form.Control autoFocus
                  type="username" name="username" placeholder="Username" value={this.state.username} onChange={this.onChange}
                />
              </Form.Group>
              <span Style="color: red" >{this.state.usernameError}</span>
              <Form.Group size="lg"  className="gap">
               
               <Form.Control autoFocus
                 type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.onChange}
               />
             </Form.Group>
             <span Style="color: red" >{this.state.emailError}</span>
              <Form.Group size="lg" className="gap">
                <Form.Control autoFocus type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
              </Form.Group>
              <span Style="color: red" >{this.state.passwordError}</span>
              <Form.Group size="lg" className="gap">
                <Form.Control autoFocus type="password" name="confirmpassword" placeholder="Confirm Password" value={this.state.confirmpassword} onChange={this.onChange}/>
              </Form.Group>
              <span Style="color: red" >{this.state.passwordMatchError}</span>
              <div className="gap">
                    <Button  onClick={this.handleSubmit} style={{padding:'8px'}}className="btn-primary">Register</Button>
                    <p>{this.errorMessage}</p>
                    </div>
            </Form>
          </div>
        );
    }
}

export default Register;
