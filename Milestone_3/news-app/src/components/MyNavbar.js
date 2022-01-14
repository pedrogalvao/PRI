import React from 'react'
import {
    Navbar,
    NavbarBrand, 
    NavbarToggler, 
    Collapse, 
    Nav,
    NavItem,
    NavbarText, 
    Input, 
    InputGroup, 
    Button
} from 'reactstrap';

/* import SearchIcon from '@mui/icons-material/Search'; */

const MyNavbar = () => {
    return <Navbar
    color="dark"
    dark
    expand="md"
    fixed=""
    >
    <NavbarBrand href="/">
      news-app
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>
        <InputGroup>
    <Input />
    <Button>
      Search
      {/* <SearchIcon /> */}
    </Button>
  </InputGroup>
        </NavItem>
      </Nav>
      <NavbarText>
        Simple Text
      </NavbarText>
    </Collapse>
  </Navbar>
};

export default MyNavbar;
