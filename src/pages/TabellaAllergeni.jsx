// TabellaAllergeni.jsx
import { useState } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import allergeniData from '../data/allergeni.json';

export default function TabellaAllergeni() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Pulsante di attivazione - puoi posizionarlo dove preferisci nel Menu */}
      <Button 
        variant="outline-secondary" 
        size="sm" 
        onClick={handleShow} 
        className="mb-4 text-uppercase letter-spacing-1"
      >
        Informativa Allergeni
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
        <Modal.Header closeButton className="border-bottom-0 pb-0">
          <Modal.Title className="display-font h3 w-100 text-center" style={{ color: '#4A5D23' }}>
            Tabella degli Allergeni
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="pt-2">
          <p className="text-center text-muted small mb-4">
            Reg. UE 1169/2011 - Per informazioni sugli allergeni presenti nei nostri piatti, rivolgersi al personale di sala.
          </p>
          
          <ListGroup variant="flush">
            {allergeniData.map((allergene) => (
              <ListGroup.Item 
                key={allergene.id} 
                className="d-flex align-items-start border-bottom py-3 bg-transparent"
              >
                <div className="fw-bold me-3 fs-5" style={{ minWidth: '30px', color: '#4A5D23' }}>
                  {allergene.id}.
                </div>
                <div>
                  <div className="fw-bold text-uppercase">{allergene.nome}</div>
                  <div className="text-muted small">{allergene.descrizione}</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}