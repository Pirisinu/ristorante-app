import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { getLocalDateString, isAdminSession, useAdminStorage } from './adminStorage.js';

const EMPTY_BANNER = {
  enabled: false,
  titolo: '',
  messaggio: '',
  dataInizio: '',
  dataFine: '',
  modalitaVisualizzazione: 'banner'
};
const isBanner = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const MODALITA_DATE = ['Sempre attivo', '7 giorni', '14 giorni', '30 giorni', 'Date personalizzate'];

function getEndDate(days) {
  const end = new Date();
  end.setDate(end.getDate() + days - 1);
  return getLocalDateString(end);
}

export default function AdminBanner() {
  const navigate = useNavigate();
  const [banner, salvaBanner, erroreSalvataggio] = useAdminStorage(
    'admin-banner',
    EMPTY_BANNER,
    isBanner
  );
  const [form, setForm] = useState(EMPTY_BANNER);
  const [modalitaDate, setModalitaDate] = useState('Sempre attivo');

  useEffect(() => {
    if (!isAdminSession()) navigate('/accedi', { replace: true });
  }, [navigate]);

  useEffect(() => {
    setForm({ ...EMPTY_BANNER, ...banner });
    setModalitaDate(banner.dataInizio || banner.dataFine ? 'Date personalizzate' : 'Sempre attivo');
  }, [banner]);

  const cambiaModalitaDate = (event) => {
    const modalita = event.target.value;
    setModalitaDate(modalita);

    if (modalita === 'Sempre attivo') {
      setForm((previous) => ({ ...previous, dataInizio: '', dataFine: '' }));
      return;
    }
    if (modalita === 'Date personalizzate') {
      setForm((previous) => ({
        ...previous,
        dataInizio: previous.dataInizio || getLocalDateString(),
        dataFine: previous.dataFine || getLocalDateString()
      }));
      return;
    }

    const giorni = Number.parseInt(modalita, 10);
    setForm((previous) => ({
      ...previous,
      dataInizio: getLocalDateString(),
      dataFine: getEndDate(giorni)
    }));
  };

  const aggiornaCampo = (event) => {
    const { name, value, checked, type } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const salva = (event) => {
    event.preventDefault();
    if (form.dataInizio && form.dataFine && form.dataFine < form.dataInizio) return;
    salvaBanner(form);
  };

  return (
    <Container className="py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <p className="hero-eyebrow mb-1">Area Admin</p>
          <h1 className="display-font gold-shimmer mb-0">Banner del sito</h1>
        </div>
        <Button variant="outline-light" onClick={() => navigate('/gestione')}>Torna all’area privata</Button>
      </div>

      <p className="mb-4">Imposta un avviso per comunicare ferie, chiusure o altre informazioni utili.</p>
      {erroreSalvataggio && <Alert variant="danger">{erroreSalvataggio}</Alert>}
      <Form onSubmit={salva} className="p-4 rounded" style={{ border: '1px solid rgba(201, 168, 76, 0.3)' }}>
        <Form.Group controlId="banner-title" className="mb-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control name="titolo" value={form.titolo} onChange={aggiornaCampo} required />
        </Form.Group>
        <Form.Group controlId="banner-message" className="mb-3">
          <Form.Label>Messaggio</Form.Label>
          <Form.Control as="textarea" rows={3} name="messaggio" value={form.messaggio} onChange={aggiornaCampo} required />
        </Form.Group>
        <Form.Group controlId="banner-display-mode" className="mb-3">
          <Form.Label>Come mostrare l’avviso</Form.Label>
          <Form.Select name="modalitaVisualizzazione" value={form.modalitaVisualizzazione || 'banner'} onChange={aggiornaCampo}>
            <option value="banner">Banner in alto nella pagina</option>
            <option value="modale">Finestra modale al primo accesso</option>
          </Form.Select>
          <Form.Text className="text-light">
            {form.modalitaVisualizzazione === 'modale'
              ? 'La finestra compare una volta per sessione e può essere chiusa dal visitatore.'
              : 'Il banner compare in alto su tutte le pagine pubbliche e può essere chiuso dal visitatore.'}
          </Form.Text>
        </Form.Group>
        <div className="row g-3 mb-3">
          <Form.Group controlId="banner-schedule" className="col-md-6">
            <Form.Label>Quando mostrare il banner</Form.Label>
            <Form.Select value={modalitaDate} onChange={cambiaModalitaDate}>
              {MODALITA_DATE.map((modalita) => <option key={modalita}>{modalita}</option>)}
            </Form.Select>
          </Form.Group>
          {modalitaDate === 'Date personalizzate' && (
            <>
              <Form.Group controlId="banner-start-date" className="col-md-3">
                <Form.Label>Dal</Form.Label>
                <Form.Control type="date" name="dataInizio" value={form.dataInizio} onChange={aggiornaCampo} />
              </Form.Group>
              <Form.Group controlId="banner-end-date" className="col-md-3">
                <Form.Label>Al</Form.Label>
                <Form.Control type="date" name="dataFine" value={form.dataFine} min={form.dataInizio || undefined} onChange={aggiornaCampo} />
              </Form.Group>
            </>
          )}
        </div>
        {form.dataInizio && form.dataFine && form.dataFine < form.dataInizio && (
          <Alert variant="danger">La data finale non può precedere quella iniziale.</Alert>
        )}
        <Form.Check type="switch" id="banner-enabled" name="enabled" label="Banner attivo" checked={Boolean(form.enabled)} onChange={aggiornaCampo} />
        {form.enabled && (
          <p className="small mt-2 mb-4">
            {modalitaDate === 'Sempre attivo'
              ? 'Il banner sarà visibile finché non lo disattivi.'
              : `Il banner sarà visibile dal ${form.dataInizio || '—'} al ${form.dataFine || '—'}.`}
          </p>
        )}
        <Button type="submit" className="btn-osteria-primary">Salva banner</Button>
      </Form>

      <div className="mt-4 p-4 rounded" style={{ border: '1px solid rgba(201, 168, 76, 0.2)' }}>
        <p className="hero-eyebrow mb-2">Anteprima</p>
        <h2 className="h4 display-font">{form.titolo || 'Titolo del banner'}</h2>
        <p className="mb-0">{form.messaggio || 'Il messaggio verrà visualizzato qui.'}</p>
      </div>
    </Container>
  );
}
