import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function SiteNavbar() {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(false);

  // Funzione che chiude il menu e riporta la vista in cima
  const handleNavClick = () => {
    setExpanded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Navbar 
      expanded={expanded} 
      onToggle={(isExpanded) => setExpanded(isExpanded)}
      expand="lg" 
      variant="dark" 
      className="osteria-navbar py-3" 
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
          Il Ramo D'oro
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-nav" />
        
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-3">
            <Nav.Link as={Link} to="/" active={pathname === '/'} onClick={handleNavClick}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/menu" active={pathname === '/menu'} onClick={handleNavClick}>
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/vini" active={pathname === '/vini'} onClick={handleNavClick}>
              I nostri vini
            </Nav.Link>
            <Nav.Link as={Link} to="/contatti" active={pathname === '/contatti'} onClick={handleNavClick}>
              Contatti
            </Nav.Link>
            <Nav.Link as={Link} to="/galleria" active={pathname === '/galleria'} onClick={handleNavClick}>
              Galleria
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}