import React, { Component } from "react";
import Axios from 'axios';
import { Button, Form, Row} from 'react-bootstrap';
import logo_full from '../../images/tk_logo_full.png';
import logo_mobile from '../../images/tk_logo_small.png';
import {Link,Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


class UserLogin extends Component{

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
      loggedIn,
      usernameError:"",
      passwordError:""
    }

}
  onChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    });
   
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
   }
 
    handleSubmit = (e) =>{
       e.preventDefault()
        if(this.state.username==="")
        {
          this.setState({
            usernameError: "Username must be entered"
          })
        }
        if(this.state.password==="")
        {
          this.setState({
            passwordError: "Password must be entered"
          })
        }
        else if(this.state.username!=="" && this.state.password!==""){
        Axios.post('http://localhost:3002/auth/user',{
          username:this.state.username,
          password:this.state.password
        }).then((response) => {
          console.log(response.data);
          if(response.data.token){
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('log',response.data.result[0].username)
            this.setState({
              loggedIn: true
            })
              window.location.href='/categories';
            }
            else{
              this.setState({
                username:"",
                email:"",
              })
              alert('Invalid Details!!!');
            }
            });
          }
    }
    render(props){
      if(this.state.loggedIn){
        return <Redirect to="/categories"/>
      }
        return (
          
        <div className="backdrop form">
          <Form className="input rounded perfect-centering login-form">
            <div className="container">
                <Row>
                  <img src={logo_full} id="logo_full" className='login'/><img src={logo_mobile} id="logo_mobile" className='login'/>
                </Row>
            </div>
            <h4 className="gap font-weight-bold text-center" style={{color: "#ffffff"}}>
                 Login
            </h4>
            <Form.Group size="lg"  className="gap">
              <Form.Control autoFocus type="username" name="username" placeholder="Username" value={this.state.username} onChange={this.onChange}/>
            </Form.Group>
            <span Style="color: red" >{this.state.usernameError}</span>
            <Form.Group size="lg" className="gap">
              <Form.Control autoFocus type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
            </Form.Group>
            <span Style="color: red" >{this.state.passwordError}</span>
            <div className="gap">
              <Button onClick={this.handleSubmit} style={{padding:'8px'}} className="btn-light float-right">Login</Button>
            </div>
            <div style={{padding:'8px', color:'#ffffff'}} className="text-center">
              <Link to="/register" className="deco-none">Register</Link>
              <span className="p-2">|</span>
              <a href="/ForgotPassword" class="deco-none">Forgot Password?</a>
             </div>
          </Form>
        </div>     
        )
    }
}

export default UserLogin;