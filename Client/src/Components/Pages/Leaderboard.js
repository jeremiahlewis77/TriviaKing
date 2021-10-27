import { Component } from "react";
import Axios from 'axios';
import { Container,Row,Table} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import  Navbar  from "../Navbar";

class Leaderboard extends Component{
    constructor(props)
    {
        super(props);
        const token = localStorage.getItem('token');
        let loggedIn=true;
        if(token==null){
            loggedIn=false
        }
        
        this.state = {
            Data:[],
            loggedIn,
            count:0
        }
    }
    componentDidMount()
    {
        var url='http://localhost:3002/leaderboard/';
        Axios.get(url).then(res => {
           const a=JSON.parse(res.data)
           this.setState({Data:a})
        })
    }
    render(props){
        if(this.state.loggedIn===false){
            return <Redirect to="/"/>
          }
        return(
            <Container fluid className="fontClass">
            <Row>
            < Navbar/>
            </Row>
            <Row>
            <Table striped bordered hover>
            <thead>
             <tr>
            <th>#</th>
            <th>Username</th>
            <th>Category</th>
            <th>Score</th>
            </tr>
            </thead>
                <tbody>
                    {
                        this.state.Data.map( data => 
                            (
                                <>
                                <tr>
                                    <td>{++this.state.count}</td>
                                    <td>{data.username}</td>
                                    <td>{data.category}</td>
                                    <td>{data.score}</td> 
                                  </tr>
                                  </>
                        ))
                    }
                </tbody>
            </Table>
            </Row>
            </Container>
        )
    }
}

export default Leaderboard;