import React, { Component } from 'react';

import {Navbar, Nav} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


class AppNav extends Component {
    state = {  }
    render() { 
        return (  
            <div>
                <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="/">BillTrack</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/categories">Categories</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
 
export default AppNav;