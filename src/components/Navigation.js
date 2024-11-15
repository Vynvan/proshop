import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropdownSwitch from './DropdownSwitch';
import LogoutToggleButton from './LogoutToggleButton';
import useUser from '../hooks/UserProvider';

function Navigation() {
   const { user } = useUser();

   return (
      <Navbar as="nav" expand="sm" className="mb-4 bg-body-tertiary sticky-top card shadow complete-width">
         <Container>
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto">
                  <Link className='nav-link' to="/">Home</Link>
                  {user ? (
                     <NavDropdown id="dropdown-basic-button" drop='down-centered' variant='none' title={user.username}>
                        <DropdownSwitch labelName='Dark mode' />
                        <NavDropdown.Divider />
                        <LogoutToggleButton asDropdownItem />
                     </NavDropdown>
                     ) : <Link className='nav-link' to="/login">Login</Link>
                  }
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default Navigation;
