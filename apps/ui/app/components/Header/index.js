import React from 'react';

import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Navbar className="navbar-inverse navbar-fixed-top">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Project Hummingbird</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {/*<NavItem eventKey={1} href="#">Reports</NavItem>*/}
            {/*<NavItem eventKey={2} href="#">Visualizations</NavItem>*/}
            <NavDropdown eventKey={3} title="Tools" id="basic-nav-dropdown">
              <LinkContainer to="/shortener">
                <MenuItem eventKey={3.1}>URL Shortener</MenuItem>
              </LinkContainer>
              <LinkContainer to="/ad-generator">
                <MenuItem eventKey={3.1}>Ad URL Generator</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
