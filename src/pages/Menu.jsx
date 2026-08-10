import { Container, Row, Col } from 'react-bootstrap'
import menuData from '../data/menu.json'

export default function Menu() {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <p className="hero-eyebrow" style={{ color: '#7a2e2e' }}>Il nostro menu</p>
        <h1 className="display-font">Cosa cuciniamo oggi</h1>
      </div>

      <Row className="gy-5">
        {menuData.categorie.map((categoria) => (
          <Col md={6} key={categoria.nome}>
            <h2 className="display-font h3 mb-3">{categoria.nome}</h2>
            {categoria.piatti.map((piatto) => (
              <div className="menu-item d-flex justify-content-between align-items-start" key={piatto.nome}>
                <div className="pe-3">
                  <div className="menu-item-name">{piatto.nome}</div>
                  <div className="text-muted small">{piatto.descrizione}</div>
                </div>
                <div className="menu-item-price">€{piatto.prezzo}</div>
              </div>
            ))}
          </Col>
        ))}
      </Row>
    </Container>
  )
}
