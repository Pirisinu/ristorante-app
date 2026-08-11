import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Menu.css'; 

// Immagini
import heroLago from '../assets/sfondo_w_lago.jpg';
import galleria1 from '../assets/gallery_1.jpg';
import galleria2 from '../assets/gallery_2.jpg';
import galleria3 from '../assets/gallery_3.jpg';

export default function Home() {
  return (
    <>
      {/* Hero Dinamica ed Elegante */}
      <section 
        className="hero-section" 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(5,5,5,0.4), rgba(10,10,10,0.9)), url(${heroLago})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={8} className="fade-in-up">
              <p className="hero-eyebrow mb-3 gold-shimmer">Dal 1999</p>
              <h1 className="hero-title display-font mb-4 text-white">
                L'eleganza del bosco,<br />il respiro del lago.
              </h1>
              <p className="fs-5 mb-5 text-light fade-in-up delay-1" style={{ maxWidth: '40rem', opacity: 0.85, fontWeight: '300' }}>
                Un rifugio dove la pregiata cacciagione incontra i sapori autentici della terra. 
                Prendetevi il vostro tempo, alla vista ci pensiamo noi.
              </p>
              <div className="d-flex gap-4 fade-in-up delay-2">
                <Button as={Link} to="/menu" className="btn-osteria-primary px-4 py-2" size="lg">
                  Esplora il Menu
                </Button>
                <Button as={Link} to="/contatti" variant="outline-light" className="btn-osteria-outline px-4 py-2" size="lg">
                  Dove Siamo
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Carosello - Sfondo scuro e zoom morbido */}
      <section className="gallery-preview py-5 section-paper">
        <Container className="py-5">
          <div className="text-center mb-5 fade-in-up">
            <h2 className="display-font menu-title gold-shimmer">Atmosfere</h2>
            <p className=" text-uppercase" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>
              Un assaggio del nostro rifugio
            </p>
          </div>
          <Row className="justify-content-center">
            <Col lg={9} className="fade-in-up delay-1">
              <Carousel fade indicators={false} className="mb-5">
                <Carousel.Item>
                  <img className="d-block w-100" src={galleria1} alt="La nostra sala" style={{ height: '550px', objectFit: 'cover' }} />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={galleria2} alt="Specialità di cacciagione" style={{ height: '550px', objectFit: 'cover' }} />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={galleria3} alt="Vista lago e bosco" style={{ height: '550px', objectFit: 'cover' }} />
                </Carousel.Item>
              </Carousel>
              <div className="text-center fade-in-up delay-2">
                <Button as={Link} to="/galleria" className="btn-osteria-primary px-5 py-2" size="lg">
                  La Galleria Completa
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* I Nostri Valori - Iconici e Brevi */}
      <section className="py-5 section-ink">
        <Container className="py-5">
          <div className="stamp-divider text-center mb-5 fade-in-up">
            <span>La Nostra Firma</span>
          </div>
          <Row className="gy-5 text-center text-md-start">
            <Col md={4} className="feature-box fade-in-up delay-1">
              <h3 className="h4 display-font feature-title">Cacciagione Scelta</h3>
              <p className="" style={{ lineHeight: '1.7' }}>
                Selezioniamo con rigore carni nobili e materie prime di terra, esaltandole con cotture lente e ricette tramandate.
              </p>
            </Col>
            <Col md={4} className="feature-box fade-in-up delay-2">
              <h3 className="h4 display-font feature-title">Cantina del Territorio</h3>
              <p className="" style={{ lineHeight: '1.7' }}>
                Etichette ricercate e vini locali pensati per accompagnare e sgrassare i sapori decisi della nostra cucina.
              </p>
            </Col>
            <Col md={4} className="feature-box fade-in-up delay-3">
              <h3 className="h4 display-font feature-title">L'Incanto del Lago</h3>
              <p className="" style={{ lineHeight: '1.7' }}>
                Una sala raccolta e intima, immersa nel silenzio della natura, dove il panorama diventa parte dell'esperienza.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}