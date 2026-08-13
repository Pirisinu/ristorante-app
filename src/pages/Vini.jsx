import { Container, Row, Col, Accordion } from 'react-bootstrap';
import viniData from '../data/vini.json';
import Lucciole from './Lucciole';
import '../styles/Menu.css';

export default function Vini() {
  
  const handleScroll = (eventKey) => {
    if (eventKey !== null) {
      setTimeout(() => {
        const element = document.getElementById(`categoria-vini-${eventKey}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  return (
    <Container fluid id="vini-container" className="py-5">
      <Lucciole />
      <Container className="position-relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-5 pt-3">
          <p className="text-uppercase mb-1 menu-subtitle fw-bold">
            Selezione Curata
          </p>
          <h1 className="display-font mb-4 menu-title gold-shimmer">
            Carta dei Vini
          </h1>
        </div>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Accordion defaultActiveKey="0" flush className="menu-accordion" onSelect={handleScroll}>
              {viniData.categorie.map((categoria, index) => (
                <Accordion.Item 
                  eventKey={index.toString()} 
                  key={categoria.nome} 
                  id={`categoria-vini-${index}`}
                  className="bg-transparent border-0 mb-4"
                >
                  <Accordion.Header>
                    <span className="w-100 text-center">{categoria.nome}</span>
                  </Accordion.Header>
                  <Accordion.Body className="pt-4 pb-2 px-0">
                    <div className="d-flex flex-column">
                      {categoria.piatti.map((vino) => {
                        if (!vino.isDisponibile) return null;

                        return (
                          <div key={vino.nome} className="menu-product-row d-flex justify-content-between align-items-baseline mb-4">
                            <div className="pe-4">
                              <h4 className="menu-item-name h5 mb-1">{vino.nome}</h4>
                              
                              {/* Dettagli vino: Regione e Gradazione Alcolica */}
                              {(vino.regione || vino.gradazione) && (
                                <div className="small mb-2 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.75rem', color: '#b8860b' }}>
                                  {vino.regione && <span>{vino.regione}</span>}
                                  {vino.regione && vino.gradazione && <span className="mx-2">|</span>}
                                  {vino.gradazione && <span>{vino.gradazione}</span>}
                                </div>
                              )}
                              
                              <div className="small fst-italic mb-2 menu-desc-en">
                                {vino.descrizione}
                              </div>

                              {/* Allergeni (ad es. Solfiti, se previsti nel JSON) */}
                              {vino.allergeni && vino.allergeni.length > 0 && (
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                  {vino.allergeni.map(id => (
                                    <span 
                                      key={id} 
                                      className="badge bg-secondary fw-normal rounded-pill px-2 py-1"
                                    >
                                      {id}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className="menu-item-price fs-5 fw-bold text-nowrap ms-3">
                              €{Number(vino.prezzo).toFixed(2)}
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