import React from 'react';
import '../styles/Lucciole.css';

export default function Lucciole() {
  // Generiamo 25 particelle (non troppe, per mantenere l'eleganza)
  const particelle = Array.from({ length: 25 });

  return (
    <div className="magic-background">
      {particelle.map((_, i) => {
        // Generiamo valori casuali ad ogni caricamento
        const left = Math.random() * 100; // Posizione orizzontale casuale (0-100%)
        const duration = 15 + Math.random() * 25; // Salita lentissima (tra 15 e 40 secondi)
        const delay = Math.random() * 15; // Ritardo di partenza casuale
        const pulseDuration = 3 + Math.random() * 4; // Pulsazione tra 3 e 7 secondi

        return (
          <div
            key={i}
            className="lucciola"
            style={{
              left: `${left}%`,
              // Applichiamo i valori generati alle animazioni CSS
              animationDuration: `${duration}s, ${pulseDuration}s`,
              animationDelay: `${delay}s, ${delay}s`
            }}
          />
        );
      })}
    </div>
  );
}