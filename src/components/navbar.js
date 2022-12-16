import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 

const MyNavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
    <Container>
      <Navbar.Brand href="/">National Aviation Coll.</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Pay</Nav.Link> 
        <Nav.Link href="/reports"> Reports </Nav.Link> 
        <Nav.Link href="/manage"> Management Student & Dep. </Nav.Link> 
      </Nav>
    </Container>
  </Navbar>
  );
}

export default MyNavBar;