import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="osteria-footer py-5 mt-5">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5 className="display-font text-white">Il Ramo D'oro</h5>
            <p className="mb-0">Corso Vittorio Emanuele, 9/11-13,<br />00074 Nemi Italia</p>
          </Col>
          <Col md={4}>
            <h6 className="text-uppercase small mb-3" style={{ letterSpacing: '0.12em' }}>
              Orari
            </h6>
            <p className="mb-0">
              Pranzo: 12:30 – 15:00<br />
              Cena: 19:00 – 23:30<br />
              Lunedì chiuso
            </p>
          </Col>
          <Col md={4}>
            <h6 className="text-uppercase small mb-3" style={{ letterSpacing: '0.12em' }}>
              Contatti
            </h6>
            <p className="mb-0">
              <a href="tel:+39 06 936 8048" className="text-decoration-none">+39 06 936 8048</a><br />
              <a href="mailto:ramodoro1966@libero.it" className="text-decoration-none">
                ramodoro1966@libero.it
              </a>
            </p>
          </Col>
        </Row>
        <hr className="my-4" style={{ borderColor: 'rgba(244,239,226,0.15)' }} />
        <p className="small mb-0 text-center opacity-75">
          © {new Date().getFullYear()} Il Ramo D'oro. Tutti i diritti riservati.
        </p>
      </Container>
    </footer>
  )
}
