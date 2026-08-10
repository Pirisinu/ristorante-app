import { Container, Row, Col, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Immagini (da inserire in src/assets/)
import heroLago from '../assets/sfondo_w_lago.jpg'
import galleria1 from '../assets/gallery_1.jpg'/*dettaglio-sala.jpg*/
import galleria2 from '../assets/gallery_2.jpg'/*piatto-cacciagione.jpg*/
import galleria3 from '../assets/gallery_3.jpg'/*vista-bosco.jpg*/

export default function Home() {
  return (
    <>
      {/* Hero Statica */}
      <section 
        className="hero-section py-5" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroLago})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={7}>
              <p className="hero-eyebrow mb-3 text-white">Cucina di stagione, dal 1999</p>
              <h1 className="hero-title display-font mb-4 text-white">
                Sapori del territorio,<br />serviti con calma.
              </h1>
              <p className="fs-5 mb-4 text-light" style={{ maxWidth: '38rem', opacity: 0.9 }}>
                Ingredienti a chilometro zero, pregiata cacciagione e un ambiente che profuma di bosco. 
                Vi aspettiamo nel cuore del borgo, con vista sul lago.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/menu" className="btn-osteria-primary" size="lg">
                  Guarda il menu
                </Button>
                <Button as={Link} to="/contatti" variant="outline-light" className="btn-osteria-outline" size="lg">
                  Come raggiungerci
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Carosello - Anteprima Galleria */}
      <section className="gallery-preview py-5 bg-light">
        <Container className="py-4">
          <div className="text-center mb-5">
            <h2 className="display-font">Atmosfere e Sapori</h2>
            <p className="text-muted">Un assaggio del nostro rifugio</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Carousel fade className="shadow-sm rounded overflow-hidden mb-4">
                <Carousel.Item>
                  <img className="d-block w-100" src={galleria1} alt="Gli interni in legno" style={{ height: '450px', objectFit: 'cover' }} />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={galleria2} alt="Specialità di cacciagione" style={{ height: '450px', objectFit: 'cover' }} />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={galleria3} alt="Dettagli del bosco" style={{ height: '450px', objectFit: 'cover' }} />
                </Carousel.Item>
              </Carousel>
              <div className="text-center">
                <Button as={Link} to="/galleria" variant="dark" size="lg" className="px-5">
                  Scopri la Galleria
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Perché Sceglierci */}
      <section className="section-paper py-5">
        <Container className="py-4">
          <div className="stamp-divider text-center mb-5">
            <span>Perché sceglierci</span>
          </div>
          <Row className="gy-4 text-center text-md-start">
            <Col md={4}>
              <h3 className="h5 display-font">Materie prime locali</h3>
              <p>Selezioniamo produttori della zona per garantire freschezza e stagionalità in ogni piatto.</p>
            </Col>
            <Col md={4}>
              <h3 className="h5 display-font">Ricette di famiglia</h3>
              <p>Piatti tramandati da tre generazioni, cucinati ancora oggi come allora.</p>
            </Col>
            <Col md={4}>
              <h3 className="h5 display-font">Ambiente accogliente</h3>
              <p>Una sala raccolta nel cuore del borgo, ideale per cene tranquille o occasioni speciali.</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}