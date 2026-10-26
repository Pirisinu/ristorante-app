import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Badge, Button, Container, Form, Table } from 'react-bootstrap';
import { formatItalianDate, getLocalDateString, isAdminSession, useAdminStorage } from './adminStorage.js';

const STATI_PRENOTAZIONE = ['Da confermare', 'Confermata', 'Annullata', 'Completata'];
const FILTRI_PERIODO = ['Tutte le date', 'Oggi', 'Prossimi 7 giorni', 'Data specifica', 'Intervallo'];

const EMPTY_RESERVATION = {
  nome: '',
  telefono: '',
  data: '',
  ora: '',
  persone: '2',
  note: '',
  stato: 'Da confermare'
};

export default function AdminPrenotazioni() {
  const navigate = useNavigate();
  const [prenotazioni, salvaPrenotazioni, erroreSalvataggio] = useAdminStorage('admin-prenotazioni', [], Array.isArray);
  const [form, setForm] = useState(EMPTY_RESERVATION);
  const [modificaId, setModificaId] = useState(null);
  const [ricerca, setRicerca] = useState('');
  const [filtroStato, setFiltroStato] = useState('Tutti gli stati');
  const [periodo, setPeriodo] = useState('Prossimi 7 giorni');
  const [dataInizio, setDataInizio] = useState(getLocalDateString());
  const [dataFine, setDataFine] = useState('');
  const oggi = getLocalDateString();

  useEffect(() => {
    if (!isAdminSession()) navigate('/accedi', { replace: true });
  }, [navigate]);

  const aggiornaCampo = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const salva = (event) => {
    event.preventDefault();
    const nuovaPrenotazione = { ...form, persone: Number(form.persone), id: modificaId || crypto.randomUUID() };
    const aggiornate = modificaId
      ? prenotazioni.map((prenotazione) => prenotazione.id === modificaId ? nuovaPrenotazione : prenotazione)
      : [...prenotazioni, nuovaPrenotazione];

    if (salvaPrenotazioni(aggiornate)) {
      setForm(EMPTY_RESERVATION);
      setModificaId(null);
    }
  };

  const modifica = (prenotazione) => {
    setForm({
      nome: prenotazione.nome || '',
      telefono: prenotazione.telefono || '',
      data: prenotazione.data || '',
      ora: prenotazione.ora || '',
      persone: String(prenotazione.persone || 2),
      note: prenotazione.note || '',
      stato: prenotazione.stato || 'Da confermare'
    });
    setModificaId(prenotazione.id);
  };

  const elimina = (id) => {
    if (window.confirm('Vuoi eliminare questa prenotazione?')) {
      salvaPrenotazioni(prenotazioni.filter((prenotazione) => prenotazione.id !== id));
      if (modificaId === id) {
        setForm(EMPTY_RESERVATION);
        setModificaId(null);
      }
    }
  };

  const cambiaStato = (id, stato) => {
    salvaPrenotazioni(prenotazioni.map((prenotazione) => (
      prenotazione.id === id ? { ...prenotazione, stato } : prenotazione
    )));
  };

  const intervalloFiltro = () => {
    if (periodo === 'Oggi') return { inizio: oggi, fine: oggi };
    if (periodo === 'Prossimi 7 giorni') {
      const end = new Date();
      end.setDate(end.getDate() + 6);
      return { inizio: oggi, fine: getLocalDateString(end) };
    }
    if (periodo === 'Data specifica') return { inizio: dataInizio, fine: dataInizio };
    if (periodo === 'Intervallo') return { inizio: dataInizio, fine: dataFine };
    return null;
  };

  const intervallo = intervalloFiltro();
  const prenotazioniVisibili = prenotazioni
    .filter((prenotazione) => !intervallo || (
      (!intervallo.inizio || prenotazione.data >= intervallo.inizio)
      && (!intervallo.fine || prenotazione.data <= intervallo.fine)
    ))
    .filter((prenotazione) => filtroStato === 'Tutti gli stati' || (prenotazione.stato || 'Da confermare') === filtroStato)
    .filter((prenotazione) => `${prenotazione.nome} ${prenotazione.telefono} ${prenotazione.note || ''}`
      .toLocaleLowerCase('it').includes(ricerca.trim().toLocaleLowerCase('it')))
    .sort((a, b) => `${a.data} ${a.ora}`.localeCompare(`${b.data} ${b.ora}`));

  const conteggiStato = STATI_PRENOTAZIONE.reduce((conteggi, stato) => {
    conteggi[stato] = prenotazioni.filter((prenotazione) => (
      (prenotazione.stato || 'Da confermare') === stato
    )).length;
    return conteggi;
  }, {});

  return (
    <Container className="py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <p className="hero-eyebrow mb-1">Area Admin</p>
          <h1 className="display-font gold-shimmer mb-0">Prenotazioni</h1>
        </div>
        <Button variant="outline-light" onClick={() => navigate('/gestione')}>Torna all’area privata</Button>
      </div>

      {erroreSalvataggio && <Alert variant="danger">{erroreSalvataggio}</Alert>}
      <Form onSubmit={salva} className="p-4 mb-5 rounded" style={{ border: '1px solid rgba(201, 168, 76, 0.3)' }}>
        <h2 className="h4 display-font mb-3">{modificaId ? 'Modifica prenotazione' : 'Nuova prenotazione'}</h2>
        <div className="row g-3">
          <Form.Group controlId="reservation-name" className="col-md-4">
            <Form.Label>Nome</Form.Label>
            <Form.Control autoFocus={!modificaId} autoComplete="name" name="nome" value={form.nome} onChange={aggiornaCampo} required />
          </Form.Group>
          <Form.Group controlId="reservation-phone" className="col-md-4">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="tel" autoComplete="tel" name="telefono" value={form.telefono} onChange={aggiornaCampo} required />
          </Form.Group>
          <Form.Group controlId="reservation-date" className="col-md-2">
            <Form.Label>Data</Form.Label>
            <Form.Control type="date" name="data" value={form.data} onChange={aggiornaCampo} required />
          </Form.Group>
          <Form.Group controlId="reservation-time" className="col-md-2">
            <Form.Label>Orario</Form.Label>
            <Form.Control type="time" name="ora" value={form.ora} onChange={aggiornaCampo} required />
          </Form.Group>
          <Form.Group controlId="reservation-party-size" className="col-md-2">
            <Form.Label>Persone</Form.Label>
            <Form.Control type="number" name="persone" min="1" max="100" value={form.persone} onChange={aggiornaCampo} required />
          </Form.Group>
          <Form.Group controlId="reservation-status" className="col-md-3">
            <Form.Label>Stato</Form.Label>
            <Form.Select name="stato" value={form.stato} onChange={aggiornaCampo}>
              {STATI_PRENOTAZIONE.map((stato) => <option key={stato}>{stato}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="reservation-notes" className="col-md-7">
            <Form.Label>Note</Form.Label>
            <Form.Control name="note" value={form.note} onChange={aggiornaCampo} />
          </Form.Group>
        </div>
        <div className="d-flex gap-2 mt-3">
          <Button type="submit" className="btn-osteria-primary">{modificaId ? 'Salva modifiche' : 'Salva prenotazione'}</Button>
          {modificaId && <Button variant="outline-light" onClick={() => { setForm(EMPTY_RESERVATION); setModificaId(null); }}>Annulla</Button>}
        </div>
      </Form>

      <h2 className="h4 display-font mb-3">Riepilogo</h2>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {STATI_PRENOTAZIONE.map((stato) => (
          <Badge key={stato} bg="dark" className="border px-3 py-2" style={{ borderColor: 'rgba(201, 168, 76, 0.4)', color: '#e0e0e0' }}>
            {stato}: {conteggiStato[stato]}
          </Badge>
        ))}
      </div>
      <div className="p-3 mb-3 rounded" style={{ border: '1px solid rgba(201, 168, 76, 0.2)' }}>
        <div className="row g-3 align-items-end">
          <Form.Group controlId="reservation-search" className="col-lg-4">
            <Form.Label>Cerca nome, telefono o note</Form.Label>
            <Form.Control type="search" value={ricerca} onChange={(event) => setRicerca(event.target.value)} placeholder="Es. Mario Rossi" />
          </Form.Group>
          <Form.Group controlId="reservation-filter-status" className="col-sm-6 col-lg-3">
            <Form.Label>Stato</Form.Label>
            <Form.Select value={filtroStato} onChange={(event) => setFiltroStato(event.target.value)}>
              <option>Tutti gli stati</option>
              {STATI_PRENOTAZIONE.map((stato) => <option key={stato}>{stato}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="reservation-filter-period" className="col-sm-6 col-lg-3">
            <Form.Label>Periodo</Form.Label>
            <Form.Select value={periodo} onChange={(event) => setPeriodo(event.target.value)}>
              {FILTRI_PERIODO.map((filtro) => <option key={filtro}>{filtro}</option>)}
            </Form.Select>
          </Form.Group>
          {(periodo === 'Data specifica' || periodo === 'Intervallo') && (
            <Form.Group controlId="reservation-filter-start" className="col-sm-6 col-lg-2">
              <Form.Label>{periodo === 'Data specifica' ? 'Giorno' : 'Dal'}</Form.Label>
              <Form.Control type="date" value={dataInizio} onChange={(event) => setDataInizio(event.target.value)} />
            </Form.Group>
          )}
          {periodo === 'Intervallo' && (
            <Form.Group controlId="reservation-filter-end" className="col-sm-6 col-lg-2">
              <Form.Label>Al</Form.Label>
              <Form.Control type="date" min={dataInizio || undefined} value={dataFine} onChange={(event) => setDataFine(event.target.value)} />
            </Form.Group>
          )}
          <div className="col-lg-12 d-flex justify-content-between align-items-center">
            <span className="small text-light">Visualizzate {prenotazioniVisibili.length} di {prenotazioni.length} prenotazioni</span>
            {(ricerca || filtroStato !== 'Tutti gli stati' || periodo !== 'Prossimi 7 giorni') && (
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => {
                  setRicerca('');
                  setFiltroStato('Tutti gli stati');
                  setPeriodo('Prossimi 7 giorni');
                  setDataInizio(oggi);
                  setDataFine('');
                }}
              >
                Azzera filtri
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <Table bordered hover variant="dark" className="align-middle">
          <thead><tr><th>Giorno</th><th>Ora</th><th>Nome</th><th>Telefono</th><th>Persone</th><th>Stato</th><th>Note</th><th>Azioni</th></tr></thead>
          <tbody>
            {prenotazioniVisibili.length === 0 ? (
              <tr><td colSpan="8" className="text-center py-4">Nessuna prenotazione corrisponde ai filtri selezionati.</td></tr>
            ) : prenotazioniVisibili.map((prenotazione) => (
              <tr key={prenotazione.id}>
                <td>{formatItalianDate(prenotazione.data)}</td><td>{prenotazione.ora}</td><td>{prenotazione.nome}</td>
                <td>{prenotazione.telefono}</td><td>{prenotazione.persone}</td>
                <td>
                  <Form.Select
                    aria-label={`Stato prenotazione ${prenotazione.nome}`}
                    size="sm"
                    value={prenotazione.stato || 'Da confermare'}
                    onChange={(event) => cambiaStato(prenotazione.id, event.target.value)}
                  >
                    {STATI_PRENOTAZIONE.map((stato) => <option key={stato}>{stato}</option>)}
                  </Form.Select>
                </td>
                <td>{prenotazione.note || '—'}</td>
                <td className="text-nowrap">
                  <Button size="sm" variant="outline-light" className="me-2" onClick={() => modifica(prenotazione)}>Modifica</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => elimina(prenotazione.id)}>Elimina</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
