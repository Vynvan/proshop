import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartLink from './CartLink';
import LogoutToggleButton from './LogoutToggleButton';
import useUser from '../hooks/UserProvider';

/**
 * @module Components
 */

/**
 * A navigation component that provides links to various sections of the application.
 * It includes links for articles, cart, user account management.
 * The component adapts based on the user's authentication status.
 * 
 * @component
 * @returns {JSX.Element} The rendered navigation bar.
 * @see {@link https://react-bootstrap.github.io/components/navbar/} for more information on React Bootstrap Navbar.
 * @see {@link https://reactrouter.com/web/guides/quick-start} for more information on React Router.
 */
function Navigation() {
   const { user } = useUser();

   return (
      <Navbar as="nav" expand="sm" className="mb-4 bg-body-tertiary sticky-top card shadow complete-width">
         <Container fluid='md'>
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto">
                  <Link className='nav-link' to="/">Artikel</Link>
                  <Link className='nav-link' to="/cart">
                     <CartLink />
                  </Link>
                  {user ? (
                     <NavDropdown id="dropdown-basic-button" drop='down-centered' variant='none' title={user.username}>
                        <NavDropdown.Item as={Link} className='nav-link' to="/address">Adressen</NavDropdown.Item>
                        <NavDropdown.Item as={Link} className='nav-link' to="/order">Bestellen</NavDropdown.Item>
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
