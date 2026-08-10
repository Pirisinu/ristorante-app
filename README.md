# Osteria del Borgo — Sito (Fase 1)

Stack: React + Vite + React-Bootstrap, nessun backend.

## Comandi

```bash
npm install
npm run dev       # sviluppo, http://localhost:5173
npm run build     # build di produzione in /dist
npm run preview   # anteprima della build
```

## Struttura

```
src/
  components/   Navbar, Footer
  pages/        Home, Menu, Contatti
  data/         menu.json (modifica qui i piatti, niente codice da toccare)
  styles/       theme.css (palette, font, tema custom sopra Bootstrap)
```

## Da fare prima del deploy

- In `src/pages/Contatti.jsx`: sostituire `IL_TUO_ID` con il proprio endpoint
  Formspree (https://formspree.io) per far funzionare il form senza backend.
- In `src/pages/Contatti.jsx`: sostituire l'embed della mappa con l'indirizzo reale.
- Sostituire indirizzo/telefono/orari placeholder in `Footer.jsx` e `Contatti.jsx`.

## Deploy su Vercel

1. Pusha il progetto su GitHub.
2. Su vercel.com → "Add New Project" → seleziona il repo.
3. Framework preset: Vite (rilevato automaticamente). Deploy.
