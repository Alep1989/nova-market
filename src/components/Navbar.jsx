<<<<<<< HEAD
import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Button, Overlay, Popover } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaUserCircle, FaShoppingCart, FaCog } from 'react-icons/fa';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [showLoginPopover, setShowLoginPopover] = useState(false);
  const loginRef = useRef(null);

  const isUserAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const handleLoginSuccess = () => {
    setShowLoginPopover(false);
  };

  const handleLogout = () => {
    logout();
    setShowLoginPopover(false);
  };

  return (
    <BSNavbar bg={theme} variant={theme} expand="lg" className="shadow-sm mb-4">
      <Container>
        <BSNavbar.Brand as={NavLink} to="/" className="fw-bold text-primary">
          Nova Market
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            {isAdmin && (
              <Nav.Link as={NavLink} to="/admin">
                <FaCog className="me-1" /> Admin
              </Nav.Link>
            )}
          </Nav>
          <div className="d-flex align-items-center">
            {isUserAuthenticated && (
              <Button
                as={NavLink}
                to="/cart"
                variant="link"
                className="p-0 me-3"
                style={{ fontSize: '1.2rem', color: theme === 'dark' ? '#fff' : '#212529' }}
              >
                <FaShoppingCart />
              </Button>
            )}

            <Button
              ref={loginRef}
              variant="link"
              className="p-0 text-decoration-none"
              onClick={() => setShowLoginPopover(!showLoginPopover)}
              style={{ color: isUserAuthenticated ? 'green' : 'inherit', fontSize: '1.5rem' }}
            >
              {isUserAuthenticated ? <FaUserCircle /> : <FaUser className="text-primary" />}
            </Button>

            {isUserAuthenticated && (
              <Button
                variant="link"
                className="p-0 ms-3 text-danger"
                onClick={handleLogout}
                style={{ fontSize: '1.2rem' }}
              >
                <FaSignOutAlt />
              </Button>
            )}
          </div>
        </BSNavbar.Collapse>
      </Container>

      <Overlay
        target={loginRef.current}
        show={showLoginPopover && !isUserAuthenticated}
        placement="bottom"
        rootClose
        onHide={() => setShowLoginPopover(false)}
      >
        {(props) => (
          <Popover {...props} id="login-popover">
            <Popover.Body className="p-0">
              <LoginModal onSuccess={handleLoginSuccess} />
            </Popover.Body>
          </Popover>
        )}
      </Overlay>
    </BSNavbar>
  );
}
=======
import { NavLink } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
  return (
    <nav className="nm-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        Inicio
      </NavLink>
      <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active' : ''}>
        Contacto
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
        Carrito
      </NavLink>
    </nav>
  )
}
>>>>>>> 20fbfeed492d95954dedfb3d16f74ce02d4ae96e
