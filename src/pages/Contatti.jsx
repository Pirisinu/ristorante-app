import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default function Contatti() {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-font gold-shimmer">Vieni a trovarci</h1>
      </div>

      <Row className="gy-5">
        <Col lg={6}>
          <h2 className="h4 display-font mb-3">Dove siamo</h2>
          <p>Corso Vittorio Emanuele, 9/11-13, 00074 Nemi Italia</p>
          <p>Tel: <a href="tel:+39 06 936 8048">+39 06 936 8048</a></p>
          <p>Email: <a href="mailto:ramodoro1966@libero.it">ramodoro1966@libero.it</a></p>
          <div className="ratio ratio-4x3 mt-4">
            <iframe
              title="mappa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.52910203023!2d12.711460276452817!3d41.71994017530125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13258362e832a411%3A0xfcc8c2fc870e4ac6!2sIl%20Ramo%20d'Oro!5e1!3m2!1sit!2sit!4v1786373223031!5m2!1sit!2sit"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
         
        </Col>
        {/* TODO */}
        {/*
          Form senza backend: sostituisci "action" con il tuo endpoint Formspree
          (https://formspree.io) oppure integra EmailJS. Nessun server necessario.
        */}
{/*         <Col lg={6}>
          <h2 className="h4 display-font mb-3">Scrivici</h2>
          <Form action="https://formspree.io/f/IL_TUO_ID" method="POST">
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="nome" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Messaggio</Form.Label>
              <Form.Control as="textarea" rows={4} name="messaggio" required />
            </Form.Group>
            <Button type="submit" className="btn-osteria-primary">
              Invia messaggio
            </Button>
          </Form>
        </Col> */}
      </Row>
    </Container>
  )
}
