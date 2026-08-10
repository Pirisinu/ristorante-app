import { Container, Row, Col, Accordion } from 'react-bootstrap';
import menuData from '../data/menu.json'; 

export default function Menu() {
  
  // Funzione per gestire lo scorrimento fluido all'apertura
  const handleScroll = (eventKey) => {
    if (eventKey !== null) {
      setTimeout(() => {
        const element = document.getElementById(`categoria-${eventKey}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300); // Leggero ritardo per assecondare l'animazione dell'Accordion
    }
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <p className="hero-eyebrow" style={{ color: '#4A5D23', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Tra bosco e lago
        </p>
        <h1 className="display-font">Il Nostro Menu</h1>
      </div>

      <Row className="justify-content-center">
        <Col lg={10}>
          <Accordion defaultActiveKey="0" flush onSelect={handleScroll}>
            {menuData.categorie.map((categoria, index) => (
              <Accordion.Item 
                eventKey={index.toString()} 
                key={categoria.nome} 
                id={`categoria-${index}`} // Aggiunto ID univoco per il bersaglio dello scroll
                className="bg-transparent mb-3"
              >
                <Accordion.Header>
                  <h2 className="display-font h4 mb-0 w-100 text-center">{categoria.nome}</h2>
                </Accordion.Header>
                <Accordion.Body className="pt-4 pb-2">
                  <Row className="gy-4 justify-content-center">
                    {categoria.piatti.map((piatto) => (
                      <Col md={12} lg={10} key={piatto.nome}>
                        <div className="menu-item d-flex justify-content-between align-items-end border-bottom border-secondary-subtle pb-2">
                          <div className="pe-3">
                            <h4 className="menu-item-name h5 mb-1">{piatto.nome}</h4>
                            <div className="text-muted small fst-italic">{piatto.descrizione}</div>
                          </div>
                          <div className="menu-item-price fs-6 fw-bold text-nowrap ms-3">
                            €{Number(piatto.prezzo).toFixed(2)}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}