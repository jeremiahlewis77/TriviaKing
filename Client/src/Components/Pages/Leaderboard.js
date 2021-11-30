import React, { useEffect, useState, useMemo } from "react";
import Axios from 'axios';
import { Container,Row,Table} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import  Navbar  from "../Navbar";
import Search from "../../Table/Search";

function Leaderboard()
{
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [search, setSearch] = useState("");
    const [Data,setData] = useState([]);
   
    useEffect ( () => { 
        var url='http://localhost:3002/leaderboard/';
        Axios.get(url).then(res => {
           const a=JSON.parse(res.data)
           setData(a)
        })
    },[])

    const SearchedData = useMemo(() => {
        let a = Data;

        if (search) {
            a = a.filter(
                field =>
                    field.username.toLowerCase().includes(search.toLowerCase()) ||
                    field.category.toLowerCase().includes(search.toLowerCase())
            );
        }
        return a;
    }, [Data,  search]);

        if(token===null)
        {
            return <Redirect to="/"/>
        }
   
        return(
           
        <Container fluid className="fontClass">
            <Row>
               < Navbar/>
            </Row>
            <Row>    
                <div className="col-md-6"  style={{margin: 10 +'px'}}>
                  <Search onSearch={value => { setSearch(value); }} />
                </div>
                <Table striped bordered hover>
            <thead>
                <tr>
                  <th>Username</th>
                  <th>Category</th>
                  <th>Score</th>
                </tr>
            </thead>
            <tbody>
                 {
                   SearchedData.map( data => 
                        (
                          <>
                            <tr>
                            <td>{data.username}</td>
                            <td>{data.category}</td>
                            <td>{data.score}</td>       
                            </tr>
                          </>
                        ))}
            </tbody>
            </Table>        
        </Row>
    </Container>
        ) 
}

export default Leaderboard;