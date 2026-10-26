# Il Ramo D'oro — Sito (Fase 1)

Stack: React + Vite + React-Bootstrap, nessun backend.

## Comandi

```bash
npm install
npm run dev       # sviluppo, http://localhost:5173
npm run build     # build di produzione in /dist
npm run preview   # anteprima della build
```

## Funzioni Admin

L’area Admin include una rubrica interna per clienti e fornitori, la gestione degli avvisi e un registro delle prenotazioni. Gli avvisi possono essere mostrati come banner su tutte le pagine pubbliche o come finestra modale; il visitatore può chiuderli per la sessione. I dati vengono salvati nel `localStorage` del browser: sono disponibili solo su quel browser/dispositivo e non vengono sincronizzati con altri utenti.

Il progetto non ha un backend. Di conseguenza, la gestione e l’accesso attuali sono adatti a una demo o a un uso locale, ma non forniscono autenticazione sicura né un archivio centralizzato per dati personali. Prima dell’uso operativo, integrare un backend con autenticazione e autorizzazioni adeguate.
