import { useEffect, useState } from 'react';

const isAlwaysValid = () => true;

export function useAdminStorage(key, initialValue, isValid = isAlwaysValid) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        const parsedValue = JSON.parse(storedValue);
        if (!isValid(parsedValue)) {
          setError('I dati salvati non hanno un formato valido.');
          return;
        }
        setValue(parsedValue);
      }
    } catch {
      setError('Impossibile leggere i dati salvati in questo browser.');
    }
  }, [key, isValid]);

  const save = (nextValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(nextValue));
      setValue(nextValue);
      setError('');
      return true;
    } catch {
      setError('Impossibile salvare i dati. Verifica lo spazio disponibile nel browser.');
      return false;
    }
  };

  return [value, save, error];
}

export function isAdminSession() {
  return sessionStorage.getItem('autenticato') === 'true'
    && sessionStorage.getItem('ruolo') === 'ADMIN';
}

export function formatItalianDate(value) {
  if (!value) return '—';
  return new Date(`${value}T12:00:00`).toLocaleDateString('it-IT');
}

export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
