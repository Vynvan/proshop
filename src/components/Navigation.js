import { Container, Nav, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropdownSwitch from './DropdownSwitch';
import LogoutToggleButton from './LogoutToggleButton';
import useUser from '../components/UserProvider';

function Navigation() {
   const { user } = useUser();

   return (
      <Navbar as="nav" expand="sm" className="mb-5 bg-body-tertiary sticky-top card shadow complete-width">
         <Container>
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto">
                  <Nav.Link to="/">Home</Nav.Link>
                  <Nav.Link to="/contact">Kontakt</Nav.Link>
                  {user ? (
                     <NavDropdown id="dropdown-basic-button" drop='down-centered' variant='none' title={user.username}>
                        <DropdownSwitch labelName='Dark mode' />
                        <NavDropdown.Divider />
                        <LogoutToggleButton asDropdownItem />
                        </NavDropdown>
                     ) : <Nav.Link to="/login">Login</Nav.Link>
                  }
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default Navigation;
