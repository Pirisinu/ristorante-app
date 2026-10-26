import { useEffect, useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getLocalDateString, useAdminStorage } from '../pages/loggedSections/adminStorage.js';

const isBanner = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export default function PublicNotice() {
  const { pathname } = useLocation();
  const [banner] = useAdminStorage('admin-banner', null, isBanner);
  const [dismissed, setDismissed] = useState(false);
  const oggi = getLocalDateString();
  const signature = banner ? JSON.stringify({
    titolo: banner.titolo,
    messaggio: banner.messaggio,
    dataInizio: banner.dataInizio,
    dataFine: banner.dataFine,
    modalitaVisualizzazione: banner.modalitaVisualizzazione || 'banner'
  }) : '';
  const dismissKey = signature ? `avviso-chiuso-${signature}` : '';

  useEffect(() => {
    setDismissed(Boolean(dismissKey && window.sessionStorage.getItem(dismissKey)));
  }, [dismissKey]);

  const inAreaRiservata = pathname.startsWith('/gestione');
  const dateValide = (!banner?.dataInizio || banner.dataInizio <= oggi)
    && (!banner?.dataFine || banner.dataFine >= oggi);
  const visibile = !inAreaRiservata
    && banner?.enabled
    && banner.titolo
    && dateValide
    && !dismissed;

  const chiudi = () => {
    if (dismissKey) window.sessionStorage.setItem(dismissKey, 'true');
    setDismissed(true);
  };

  if (!visibile) return null;

  if (banner.modalitaVisualizzazione === 'modale') {
    return (
      <Modal show onHide={chiudi} centered contentClassName="site-notice-modal-content">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="display-font">{banner.titolo}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="site-notice-modal-body">
          <p className="mb-0">{banner.messaggio}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-osteria-primary" onClick={chiudi}>Chiudi</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Alert
      variant="warning"
      className="site-notice-banner rounded-0 text-center mb-0 d-flex justify-content-center align-items-center gap-3"
      role="status"
    >
      <span>
        <strong>{banner.titolo}</strong>
        {banner.messaggio && <span className="ms-2">{banner.messaggio}</span>}
      </span>
      <Button
        variant="outline-dark"
        size="sm"
        onClick={chiudi}
        aria-label="Chiudi avviso"
      >
        Chiudi
      </Button>
    </Alert>
  );
}
