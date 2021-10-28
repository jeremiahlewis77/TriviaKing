import { Component } from "react";
import {Button,Card,Container,Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect,Link} from 'react-router-dom';
import  Navbar  from "../Navbar";
import Sports from '../../images/Sports.jpg';
import GK from '../../images/GK.jpg';
import history from '../../images/history.jpg';
import science from '../../images/science.jpg';
import football from '../../images/football.jpg';


class Categories extends Component{
    constructor(props){
        super(props);
        const token = localStorage.getItem('token')
        let loggedIn=true
        if(token==null){
            loggedIn=false
        }
        this.state={
         items:[],
         loggedIn
        }
        this.state.items=["Sports","GK","science","history","football"];
    }
   
   render(props){
    if(this.state.loggedIn===false){
        return <Redirect to="/"/>
      }
   
       return(
           <>

        <Container fluid>
            <Row noGutters>
                < Navbar/>
            </Row>
        </Container>
        <Container>
            <div class="row">
                <div class="col-12">
                    <h1 style={{margin: 20 + 'px'}}>Categories</h1>
                        <Container>
                            <Row xs={1} md={2} lg={3} xl={4}>
                                   <Card className="category" style={{ width: '18rem' }}>
                                   <Card.Img variant="top" src={Sports} ></Card.Img>
                                   <Card.Body>
                                     <Card.Title>Sports Quiz</Card.Title>
                                     <Card.Text>
                                       Click on start to begin the quiz.
                                     </Card.Text>
                                     <Button variant="primary"><Link style={{color: '#fff'}} to={{ pathname: "/questions/sports" }}> Start</Link></Button>
                                   </Card.Body>
                                 </Card>
                                 <Card className="category" style={{ width: '18rem' }}>
                                   <Card.Img variant="top" src={GK}></Card.Img>
                                   <Card.Body>
                                     <Card.Title>General Knowledge Quiz</Card.Title>
                                     <Card.Text>
                                       Click on start to begin the quiz.
                                     </Card.Text>
                                     <Button variant="primary"><Link style={{color: '#fff'}} to={{ pathname: "/questions/GK" }}> Start</Link></Button>
                                   </Card.Body>
                                 </Card>
                                 <Card className="category" style={{ width: '18rem' }}>
                                   <Card.Img variant="top" src={football} ></Card.Img>
                                   <Card.Body>
                                     <Card.Title>Football Quiz</Card.Title>
                                     <Card.Text>
                                       Click on start to begin the quiz.
                                     </Card.Text>
                                     <Button variant="primary"><Link style={{color: '#fff'}} to={{ pathname: "/questions/football" }}> Start</Link></Button>
                                   </Card.Body>
                                 </Card>
                                 <Card className="category" style={{ width: '18rem' }}>
                                   <Card.Img variant="top" src={science} ></Card.Img>
                                   <Card.Body>
                                     <Card.Title>Science Quiz</Card.Title>
                                     <Card.Text>
                                       Click on start to begin the quiz.
                                     </Card.Text>
                                     <Button variant="primary"><Link style={{color: '#fff'}} to={{ pathname: "/questions/science" }}> Start</Link></Button>
                                   </Card.Body>
                                 </Card>
                                 <Card className="category" style={{ width: '18rem' }}>
                                   <Card.Img variant="top" src={history} ></Card.Img>
                                   <Card.Body>
                                     <Card.Title>History Quiz</Card.Title>
                                     <Card.Text>
                                       Click on start to begin the quiz.
                                     </Card.Text>
                                     <Button variant="primary"><Link style={{color: '#fff'}} to={{ pathname: "/questions/history" }}> Start</Link></Button>
                                   </Card.Body>
                                 </Card>
                            </Row>
                        </Container>

                </div>
            </div>
        </Container>
               </>

   );
   }
}

export default Categories;