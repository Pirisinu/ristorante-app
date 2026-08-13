import { Container, Row, Col, Accordion, OverlayTrigger, Tooltip } from 'react-bootstrap';
import menuData from '../data/menu.json'; 
import allergeniData from '../data/allergeni.json';
import TabellaAllergeni from './TabellaAllergeni';
import Lucciole from './Lucciole';
import '../styles/Menu.css';

export default function Menu() {
  
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

  const getAllergeneName = (id) => {
    const allergene = allergeniData.find(a => a.id === id);
    return allergene ? allergene.nome : `Allergene ${id}`;
  };

  return (
    <Container fluid id="menu-container" className="py-5">
      <Lucciole />
      <Container className="position-relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-5 pt-3">
          <p className="text-uppercase mb-1 menu-subtitle fw-bold">
            La Tradizione
          </p>
          <h1 className="display-font mb-4 menu-title gold-shimmer">
            Il Nostro Menu
          </h1>
          <TabellaAllergeni />
        </div>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Accordion defaultActiveKey="0" flush className="menu-accordion" onSelect={handleScroll}>
              {menuData.categorie.map((categoria, index) => (
                <Accordion.Item 
                  eventKey={index.toString()} 
                  key={categoria.nome} 
                  id={`categoria-${index}`}
                  className="bg-transparent border-0 mb-4"
                >
                  <Accordion.Header>
                    <span className="w-100 text-center">{categoria.nome}</span>
                  </Accordion.Header>
                  <Accordion.Body className="pt-4 pb-2 px-0">
                    <div className="d-flex flex-column">
                      {categoria.piatti.map((piatto) => {
                        if (!piatto.isDisponibile) return null;

                        return (
                          <div key={piatto.nome} className="menu-product-row d-flex justify-content-between align-items-baseline">
                            <div className="pe-4">
                              <h4 className="menu-item-name h5 mb-2">{piatto.nome}</h4>
                              
                              {/* <div className="small mb-1 menu-desc-it">
                                {piatto['descrizione-it']}
                              </div> */}
                              <div className="small fst-italic mb-2 menu-desc-en">
                                {piatto.descrizione}
                              </div>

                              {piatto.allergeni && piatto.allergeni.length > 0 && (
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                  {piatto.allergeni.map(id => (
                                    <span 
                                      key={id} 
                                      className="badge bg-secondary fw-normal rounded-pill px-2 py-1"
                                    >
                                      {getAllergeneName(id)}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className="menu-item-price fs-5 fw-bold">
                              €{Number(piatto.prezzo).toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}