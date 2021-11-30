import React, { useEffect, useState, useMemo } from "react";
import Axios from 'axios';
import { Container,Row,Table} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import  Navbar  from "../Navbar";
import Search from "../../Table/Search";
import Pagination from "../../Table/Pagination";
import TableHeader from '../../Table/Header'

function Leaderboard()
{
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [Data,setData] = useState([]);
   
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 10;
        
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

        setTotalItems(a.length);

        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            a = a.sort(
                (a1, b1) =>
                    reversed * a1[sorting.field].localeCompare(b1[sorting.field])
            );
        }
        return a.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [Data, currentPage, search, sorting]);
    
    const headers=[
      
        {
            name:'Name',
            field:'username',
            sortable: true
        },
        
        {
            name:'Quiz Type',
            field:'category',
            sortable: true
        },
        {
            name:'Score',
            field:'score'
        }
      
     ]

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
                <div className="col-md-5" style={{margin: 10 +'px'}}>
                    <Pagination
                            total={totalItems}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange={page => setCurrentPage(page)}
                        />
                </div>
                <div className="col-md-6"  style={{margin: 10 +'px'}}>
                     <Search
                            onSearch={value => {
                                setSearch(value);
                                setCurrentPage(1);
                            }}
                        />
                </div>
                <table class="table table-striped">
                    <TableHeader class="thead-dark"
                        headers={headers}
                        onSorting={(field, order) =>
                            setSorting({ field, order })
                        }
                    />
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
                            ))
                        }
                    </tbody>
                </table>      
        </Row>
    </Container>
    )
}

export default Leaderboard;