import { Container, Row, Col } from 'react-bootstrap'

// Sostituisci con le tue immagini reali in src/assets/
import img1 from '../assets/gallery_1.jpg'
import img2 from '../assets/gallery_2.jpg'
import img3 from '../assets/gallery_3.jpg'
import img4 from '../assets/gallery_4.jpg'
import img5 from '../assets/gallery_5.jpg'
import img6 from '../assets/gallery_6.jpg'

export default function Galleria() {
  // Array delle immagini per snellire il codice
  const images = [img1, img2, img3, img4, img5, img6]

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-font">La Nostra Galleria</h1>
        <p className="text-muted">
          Scorci del lago, atmosfere boschive e le nostre specialità di terra.
        </p>
      </div>
      
      <Row className="g-4">
        {images.map((src, index) => (
          <Col md={4} sm={6} key={index}>
            <div className="ratio ratio-1x1 shadow-sm rounded overflow-hidden">
              <img 
                src={src} 
                alt={`Dettaglio osteria ${index + 1}`} 
                className="w-100 h-100"
                style={{ 
                  objectFit: 'cover', 
                  transition: 'transform 0.4s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}