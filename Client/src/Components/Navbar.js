import React from 'react';
import logo_full from '../images/tk_logo_full.png';
import logo_mobile from '../images/tk_logo_small.png';
import { Nav, Navbar, NavDropdown,Container } from 'react-bootstrap';
import { withRouter } from "react-router";
const logout = () => {
   localStorage.removeItem("token");
   localStorage.removeItem("log");
   window.location="/";
 };

const NavbarAd = props => {
   

  return (
      <>
      <Navbar id="navbar" variant="dark">
          <Container>
            <Navbar.Brand href="/categories"><img src={logo_full} id="logo_full"/><img src={logo_mobile} id="logo_mobile"/></Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/categories">Categories</Nav.Link>
                <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
            </Nav>
            <NavDropdown title={localStorage.getItem('log')} id="nav-dropdown">
                <NavDropdown.Item className="logout" style={{color:'#1f2635'}} onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        </Container>
    </Navbar>


      </>
      );
};
const NavbarHome = withRouter(NavbarAd);
export default NavbarHome