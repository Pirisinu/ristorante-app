import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');
  const navigate = useNavigate();

  const gestisciAccesso = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'Prova1') {
      sessionStorage.setItem('autenticato', 'true');
      sessionStorage.setItem('ruolo', 'ADMIN');
      navigate('/gestione'); 
    } else if (username === 'manager' && password === 'Prova2') {
      sessionStorage.setItem('autenticato', 'true');
      sessionStorage.setItem('ruolo', 'MANAGER');
      navigate('/gestione'); 
    } else if (username === 'staff' && password === 'Prova3') {
      sessionStorage.setItem('autenticato', 'true');
      sessionStorage.setItem('ruolo', 'STAFF');
      navigate('/gestione'); 
    } else {
      setErrore('Credenziali errate. Riprova.');
    }
  };

  return (
    <Container className="py-5" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <div className="text-center mb-4">
            <p className="hero-eyebrow gold-shimmer mb-1">Accesso Riservato</p>
            <h1 className="display-font gold-shimmer">Staff</h1>
          </div>

          <Form 
            onSubmit={gestisciAccesso} 
            className="p-4 rounded shadow-sm" 
            style={{ border: '1px solid rgba(201, 168, 76, 0.2)', backgroundColor: 'rgba(5, 5, 5, 0.5)' }}
          >
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label style={{ color: '#c9a84c' }}>Nome Utente</Form.Label>
              <Form.Control 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ backgroundColor: 'transparent', color: '#e0e0e0', borderColor: 'rgba(201, 168, 76, 0.4)' }}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label style={{ color: '#c9a84c' }}>Password</Form.Label>
              <Form.Control 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ backgroundColor: 'transparent', color: '#e0e0e0', borderColor: 'rgba(201, 168, 76, 0.4)' }}
              />
            </Form.Group>

            {errore && (
              <div className="text-center mb-3" style={{ color: '#d9534f', fontSize: '0.9rem' }}>
                {errore}
              </div>
            )}

            <div className="d-grid">
              <Button type="submit" className="btn-osteria-primary py-2">
                Entra
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}