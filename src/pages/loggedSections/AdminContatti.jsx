import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Form, Table } from 'react-bootstrap';
import { isAdminSession, useAdminStorage } from './adminStorage.js';

const EMPTY_CONTACT = {
  nome: '',
  tipo: 'Cliente',
  azienda: '',
  telefono: '',
  email: '',
  indirizzo: '',
  note: ''
};

export default function AdminContatti() {
  const navigate = useNavigate();
  const [contatti, salvaContatti, erroreSalvataggio] = useAdminStorage('admin-contatti', [], Array.isArray);
  const [form, setForm] = useState(EMPTY_CONTACT);
  const [modificaId, setModificaId] = useState(null);

  useEffect(() => {
    if (!isAdminSession()) navigate('/accedi', { replace: true });
  }, [navigate]);

  const aggiornaCampo = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const salva = (event) => {
    event.preventDefault();
    const nuovoContatto = { ...form, id: modificaId || crypto.randomUUID() };
    const aggiornati = modificaId
      ? contatti.map((contatto) => contatto.id === modificaId ? nuovoContatto : contatto)
      : [...contatti, nuovoContatto];

    if (salvaContatti(aggiornati)) {
      setForm(EMPTY_CONTACT);
      setModificaId(null);
    }
  };

  const modifica = (contatto) => {
    setForm({
      nome: contatto.nome || '',
      tipo: contatto.tipo || 'Cliente',
      azienda: contatto.azienda || '',
      telefono: contatto.telefono || '',
      email: contatto.email || '',
      indirizzo: contatto.indirizzo || '',
      note: contatto.note || ''
    });
    setModificaId(contatto.id);
  };

  const elimina = (id) => {
    if (window.confirm('Vuoi eliminare questo contatto?')) {
      salvaContatti(contatti.filter((contatto) => contatto.id !== id));
      if (modificaId === id) {
        setForm(EMPTY_CONTACT);
        setModificaId(null);
      }
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <p className="hero-eyebrow mb-1">Area Admin</p>
          <h1 className="display-font gold-shimmer mb-0">Rubrica interna</h1>
        </div>
        <Button variant="outline-light" onClick={() => navigate('/gestione')}>Torna all’area privata</Button>
      </div>

      <Alert variant="info">
        Rubrica destinata esclusivamente alla gestione interna. I recapiti non vengono usati per inviare comunicazioni promozionali.
      </Alert>
      {erroreSalvataggio && <Alert variant="danger">{erroreSalvataggio}</Alert>}

      <Form onSubmit={salva} className="p-4 mb-5 rounded" style={{ border: '1px solid rgba(201, 168, 76, 0.3)' }}>
        <h2 className="h4 display-font mb-3">{modificaId ? 'Modifica contatto' : 'Aggiungi contatto'}</h2>
        <div className="row g-3">
          <Form.Group controlId="contact-name" className="col-md-5">
            <Form.Label>Nome / referente</Form.Label>
            <Form.Control name="nome" value={form.nome} onChange={aggiornaCampo} required />
          </Form.Group>
          <Form.Group controlId="contact-type" className="col-md-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Select name="tipo" value={form.tipo} onChange={aggiornaCampo}>
              <option>Cliente</option>
              <option>Fornitore</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="contact-company" className="col-md-4">
            <Form.Label>Azienda</Form.Label>
            <Form.Control name="azienda" value={form.azienda} onChange={aggiornaCampo} />
          </Form.Group>
          <Form.Group controlId="contact-phone" className="col-md-4">
            <Form.Label>Telefono</Form.Label>
            <Form.Control name="telefono" type="tel" value={form.telefono} onChange={aggiornaCampo} />
          </Form.Group>
          <Form.Group controlId="contact-email" className="col-md-4">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" value={form.email} onChange={aggiornaCampo} />
          </Form.Group>
          <Form.Group controlId="contact-address" className="col-md-4">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control name="indirizzo" value={form.indirizzo} onChange={aggiornaCampo} />
          </Form.Group>
          <Form.Group controlId="contact-notes" className="col-12">
            <Form.Label>Note interne</Form.Label>
            <Form.Control as="textarea" rows={2} name="note" value={form.note} onChange={aggiornaCampo} />
          </Form.Group>
        </div>
        <div className="d-flex gap-2 mt-3">
          <Button type="submit" className="btn-osteria-primary">{modificaId ? 'Salva modifiche' : 'Aggiungi'}</Button>
          {modificaId && <Button variant="outline-light" onClick={() => { setForm(EMPTY_CONTACT); setModificaId(null); }}>Annulla</Button>}
        </div>
      </Form>

      <h2 className="h4 display-font mb-3">Contatti salvati ({contatti.length})</h2>
      <div className="table-responsive">
        <Table bordered hover variant="dark" className="align-middle">
          <thead><tr><th>Nome / referente</th><th>Tipo</th><th>Azienda</th><th>Telefono</th><th>Email</th><th>Azioni</th></tr></thead>
          <tbody>
            {contatti.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-4">Nessun contatto salvato.</td></tr>
            ) : contatti.map((contatto) => (
              <tr key={contatto.id}>
                <td>{contatto.nome}</td><td>{contatto.tipo}</td><td>{contatto.azienda || '—'}</td>
                <td>{contatto.telefono || '—'}</td><td>{contatto.email || '—'}</td>
                <td className="text-nowrap">
                  <Button size="sm" variant="outline-light" className="me-2" onClick={() => modifica(contatto)}>Modifica</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => elimina(contatto.id)}>Elimina</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
