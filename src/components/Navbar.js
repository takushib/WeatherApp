/** @jsx jsx */

import { Container, Nav, Navbar } from 'react-bootstrap';
import { jsx } from '@emotion/core';

import { LinkContainer } from 'react-router-bootstrap';

function CustomNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/map">
              <Nav.Link>Map</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/browse">
              <Nav.Link>Browse</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/saved">
              <Nav.Link>Saved</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
