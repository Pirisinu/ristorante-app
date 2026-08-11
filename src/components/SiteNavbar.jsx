import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function SiteNavbar() {
  const { pathname } = useLocation()

  return (
    <Navbar expand="lg" variant="dark" className="osteria-navbar py-3" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Il Ramo D'oro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-3">
            <Nav.Link as={Link} to="/" active={pathname === '/'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/menu" active={pathname === '/menu'}>
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/contatti" active={pathname === '/contatti'}>
              Contatti
            </Nav.Link>
            <Nav.Link as={Link} to="/galleria" active={pathname === '/galleria'}>
              Galleria
            </Nav.Link>
            {/* <Button className="btn-osteria-primary mt-2 mt-lg-0" disabled title="Disponibile nella prossima fase (prenotazioni con backend)">
              Prenota
            </Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
