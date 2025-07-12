import React from 'react';
import ReactDOM from 'react-dom/client';
// Importa el componente principal de tu aplicación
import App from './App';

// Crea el "root" donde se montará tu aplicación React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza tu componente App dentro del "root"
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
