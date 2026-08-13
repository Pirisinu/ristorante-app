import { Container, Row, Col } from 'react-bootstrap'

const imagesMap = import.meta.glob('../assets/*.{jpg,jpeg}', { eager: true, import: 'default' })
const images = Object.values(imagesMap)

export default function Galleria() {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-font gold-shimmer">La Nostra Galleria</h1>
        <p>Scorci del lago, atmosfere boschive e le nostre specialità di selvaggina e terra.</p>
      </div>
      
      <Row className="g-4">
        {images.map((src, index) => (
          <Col md={4} sm={6} key={index}>
            <div className="ratio ratio-1x1 shadow-sm rounded overflow-hidden">
              <img src={src} alt={`Dettaglio img ${index + 1}`} className="w-100 h-100"
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