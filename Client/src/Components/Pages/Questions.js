import {Component} from 'react';
import Axios from 'axios';
import {Button,Container,Row,Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';
import  Navbar  from "../Navbar";

class Question extends Component{
    constructor(props)
    {
        super(props);
        const token = localStorage.getItem('token');
        const username= localStorage.getItem('log');
        let loggedIn=true
        let show=false
        if(token==null){
            loggedIn=false
        }
        const selectedCategory=this.props.match.params.id;
        
        this.state = {
            selectedCategory,
            data:[],
            current:{},
            index:0,
            loggedIn,
            show,
            username
        }
    }

    componentDidMount()
    {
        var url='http://localhost:3002/questions/'+this.state.selectedCategory;
        Axios.get(url).then(res => {
           const a=JSON.parse(res.data)
           this.setState({data:a})
           this.setState({current: a[0]})
        })
    }
   handleClose=()=>{
       this.setState({show:false});
       window.location.href='/categories';
   }
    handleAnswer=(e)=>{
        var answer=e.target.value
      if(this.state.current.correct===answer){
        var temp=this.state.index+1;
        this.setState({index: temp});
        this.setState({current: this.state.data[temp]});
        if(this.state.index===this.state.data.length-1)
         {
          this.setState({show:true});
          Axios.post('http://localhost:3002/leaderboard',{username:this.state.username,score:this.state.index+1,category:this.state.selectedCategory}).then((response) => {
                console.log(response)
                });
         }
      }
      else{
        this.setState({show:true});
        Axios.post('http://localhost:3002/leaderboard',{username:this.state.username,score:this.state.index,category:this.state.selectedCategory}).then((response) => {
                console.log(response)
                });
      }
    }

    render(props)
    {
        if(this.state.loggedIn===false){
            return <Redirect to="/"/>
          }

        return(
            <>
                <Container fluid>
                    <Row noGutters>
                        < Navbar/>
                    </Row>
                        <Row>
                            {this.state.current &&
                            <div id="question_container" className="col-12 container-fluid">
                                <div id="question" className="text-center">
                                    <p>{this.state.current.question}</p>
                                </div>
                            </div>
                            }
                        </Row>
                </Container>
                <Container>
                    <Row className={"justify-content-center"}>
            <div class="row">
                {this.state.current &&
                    <>
                <div class="d-grid gap-2 col-6">
                    <Button value={this.state.current.option1} size="lg" className="quiz-btn" variant="primary"
                            onClick={this.handleAnswer}> {this.state.current.option1}</Button>
                    <Button value={this.state.current.option2} size="lg" className="quiz-btn" variant="primary"
                            onClick={this.handleAnswer}> {this.state.current.option2}</Button>
                </div>
                    <div className="d-grid gap-2 col-6">
                    <Button value={this.state.current.option3} size="lg" className="quiz-btn" variant="primary" onClick={this.handleAnswer}> {this.state.current.option3}</Button>
                    <Button value={this.state.current.option4} size="lg" className="quiz-btn" variant="primary" onClick={this.handleAnswer}> {this.state.current.option4}</Button>
                    </div>
                    </>
                }
        </div>
      
            </Row>
         
  
        <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You have scored {this.state.index}/5!!!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
            </Container>
            </>
        )
    }
}
  
export default Question;