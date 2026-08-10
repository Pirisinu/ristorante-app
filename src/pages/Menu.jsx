import { Container, Row, Col, Accordion, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import menuData from '../data/menu.json'; 
import allergeniData from '../data/allergeni.json';
import TabellaAllergeni from './TabellaAllergeni'; // Assicurati che il percorso sia corretto

export default function Menu() {
  
  // Scorrimento fluido all'apertura della categoria
  const handleScroll = (eventKey) => {
    if (eventKey !== null) {
      setTimeout(() => {
        const element = document.getElementById(`categoria-${eventKey}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  // Funzione per ricavare il nome dell'allergene dall'ID
  const getAllergeneName = (id) => {
    const allergene = allergeniData.find(a => a.id === id);
    return allergene ? allergene.nome : `Allergene ${id}`;
  };

  return (
    <Container className="pt-5">
      <div className="text-center mb-5">
        <p className="hero-eyebrow" style={{ color: '#4A5D23', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Tra bosco e lago
        </p>
        <h1 className="display-font">Il Nostro Menu</h1>
        
        {/* Pulsante per aprire la Modale della Tabella completa */}
        <div className="mt-4">
          <TabellaAllergeni />
        </div>
      </div>

      <Row className="justify-content-center">
        <Col lg={10}>
          <Accordion defaultActiveKey="0" flush onSelect={handleScroll}>
            {menuData.categorie.map((categoria, index) => (
              <Accordion.Item 
                eventKey={index.toString()} 
                key={categoria.nome} 
                id={`categoria-${index}`}
                className="bg-transparent mb-3"
              >
                <Accordion.Header>
                  <h2 className="display-font h4 mb-0 w-100 text-center">{categoria.nome}</h2>
                </Accordion.Header>
                <Accordion.Body className="pt-4 pb-2">
                  <Row className="gy-4 justify-content-center">
                    {categoria.piatti.map((piatto) => {
                      if (!piatto.isDisponibile) return null;

                      return (
                        <Col md={12} lg={10} key={piatto.nome}>
                          <div className="menu-item d-flex justify-content-between align-items-start border-bottom border-secondary-subtle pb-3">
                            <div className="pe-3">
                              <h4 className="menu-item-name h5 mb-1">{piatto.nome}</h4>
                              
                              <div className="text-muted small mb-1">
                                {piatto['descrizione-it']}
                              </div>
                              <div className="text-muted small fst-italic opacity-75">
                                {piatto.descrizione}
                              </div>

                              {/* Rendering dinamico dei badge con Tooltip */}
                              {piatto.allergeni && piatto.allergeni.length > 0 && (
                                <div className="mt-2">
                                  {piatto.allergeni.map(id => (
                                    <OverlayTrigger
                                      key={id}
                                      placement="top"
                                      overlay={<Tooltip id={`tooltip-${id}`}>{getAllergeneName(id)}</Tooltip>}
                                    >
                                      <Badge 
                                        bg="light" 
                                        text="dark" 
                                        className="me-2 border text-secondary shadow-sm" 
                                        style={{ cursor: 'pointer' }}
                                      >
                                        {id}
                                      </Badge>
                                    </OverlayTrigger>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className="menu-item-price fs-6 fw-bold text-nowrap ms-3 mt-1">
                              €{Number(piatto.prezzo).toFixed(2)}
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
      <p className="text-center text-muted small mt-5">
        Reg. UE 1169/2011 - Per informazioni sugli allergeni presenti nei nostri piatti, rivolgersi al personale di sala.
      </p>
    </Container>
  );
}