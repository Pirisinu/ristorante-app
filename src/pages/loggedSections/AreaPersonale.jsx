import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';

export default function AreaPersonale() {
  const navigate = useNavigate();
  
  const [ruolo] = useState(sessionStorage.getItem('ruolo') || 'STAFF');

  useEffect(() => {
    const isAutenticato = sessionStorage.getItem('autenticato');
    if (!isAutenticato) {
      navigate('/accedi');
    }
  }, [navigate]);

  const gestisciEsci = () => {
    sessionStorage.removeItem('autenticato');
    sessionStorage.removeItem('ruolo'); // Pulizia completa alla disconnessione
    navigate('/accedi');
  };

  const funzionalita = [
    {
      titolo: "Gestione Prenotazioni",
      descrizione: "Registra le prenotazioni con data, orario, numero di persone, recapiti e stato.",
      azione: "Gestisci prenotazioni",
      link: "/gestione/prenotazioni",
      ruoliPermessi: ['ADMIN'],
      attiva: true
    },
    {
      titolo: "Menu e Disponibilità",
      descrizione: "Segna le portate esaurite o aggiorna le specialità di cacciagione del giorno in tempo reale.",
      azione: "Gestisci Menu",
      link: "/gestione/menu",
      ruoliPermessi: ['ADMIN', 'MANAGER'],
      attiva: false
    },
    {
      titolo: "Cantina Vini",
      descrizione: "Aggiorna le etichette, le annate e le giacenze della nostra selezione del territorio.",
      azione: "Gestisci Cantina",
      link: "/gestione/cantina",
      ruoliPermessi: ['ADMIN', 'MANAGER'],
      attiva: false
    },
    {
      titolo: "Ordini e Comande",
      descrizione: "Inserisci o modifica le comande attive e invia gli ordini direttamente in cucina.",
      azione: "Apri Comande",
      link: "/gestione/comande",
      ruoliPermessi: ['ADMIN', 'MANAGER', 'STAFF'],
      attiva: false
    },
    {
      titolo: "Impostazioni Sito web",
      descrizione: "Aggiorna le foto della galleria, gli avvisi in homepage e gli orari di apertura stagionali.",
      azione: "Impostazioni Pubbliche",
      link: "/gestione/sito",
      ruoliPermessi: ['ADMIN'],
      attiva: false
    },
    {
      titolo: "Risorse Umane",
      descrizione: "Gestisci gli accessi dello staff, i turni settimanali e i permessi del sistema.",
      azione: "Gestisci Staff",
      link: "/gestione/utenti",
      ruoliPermessi: ['ADMIN'],
      attiva: false
    },
    {
      titolo: "Analisi e Report",
      descrizione: "Visualizza le statistiche di vendita, i piatti più richiesti e l'andamento stagionale.",
      azione: "Visualizza Dati",
      link: "/gestione/statistiche",
      ruoliPermessi: ['ADMIN'],
      attiva: false
    },
    {
      titolo: "Rubrica interna",
      descrizione: "Salva e consulta i contatti di clienti e fornitori per la gestione interna.",
      azione: "Gestisci contatti",
      link: "/gestione/contatti",
      ruoliPermessi: ['ADMIN'],
      attiva: true
    },
    {
      titolo: "Banner del sito",
      descrizione: "Pubblica o disattiva avvisi in homepage, ad esempio per ferie e chiusure.",
      azione: "Gestisci banner",
      link: "/gestione/banner",
      ruoliPermessi: ['ADMIN'],
      attiva: true
    }
  ];

  // Filtra le card in base al ruolo attuale
  const funzionalitaVisibili = funzionalita.filter(f => f.ruoliPermessi.includes(ruolo));

  return (
    <Container className="py-5" style={{ minHeight: '85vh' }}>
      
      {/* Intestazione */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-bottom pb-4 mb-5" style={{ borderColor: 'rgba(201, 168, 76, 0.2)' }}>
        <div className="text-center text-md-start mb-3 mb-md-0">
          <p className="hero-eyebrow gold-shimmer mb-1">Amministrazione</p>
          <h1 className="display-font gold-shimmer mb-0">Area Privata</h1>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Badge bg="dark" className="border px-3 py-2" style={{ borderColor: '#c9a84c', color: '#c9a84c' }}>
            Ruolo: {ruolo}
          </Badge>
          <Button onClick={gestisciEsci} variant="outline-light" className="btn-osteria-outline px-4">
            Esci
          </Button>
        </div>
      </div>
      
      {/* Griglia delle Card Filtata per Ruolo */}
      <Row className="gy-4">
        {funzionalitaVisibili.map((item, index) => (
          <Col md={6} lg={4} key={index}>
            <Card 
              className="h-100 bg-transparent text-center" 
              style={{ 
                border: '1px solid rgba(201, 168, 76, 0.3)', 
                borderRadius: '8px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                opacity: item.attiva ? 1 : 0.65
              }}
              onMouseEnter={(e) => {
                if (!item.attiva) return;
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body className="d-flex flex-column p-4">
                {!item.attiva && (
                  <div className="mb-2">
                    <Badge bg="secondary">Non disponibile</Badge>
                  </div>
                )}
                <Card.Title className="display-font mb-3" style={{ color: '#c9a84c', fontSize: '1.5rem' }}>
                  {item.titolo}
                </Card.Title>
                <Card.Text style={{ color: '#e0e0e0', opacity: 0.85, flexGrow: 1 }}>
                  {item.descrizione}
                </Card.Text>
                <Button
                  className="btn-osteria-primary w-100 mt-3"
                  disabled={!item.attiva}
                  aria-label={item.attiva ? item.azione : `${item.titolo}: non disponibile`}
                  onClick={item.attiva ? () => navigate(item.link) : undefined}
                >
                  {item.attiva ? item.azione : 'Non disponibile'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </Container>
  );
}