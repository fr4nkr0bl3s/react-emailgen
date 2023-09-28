import React from 'react';
import ReactMarkdown from 'react-markdown';

function VistaPrevia({ contenido }) { // Recibe contenido como prop
  return (
    <div>
      <h2>Vista Previa del Email</h2>
      <p><ReactMarkdown>{contenido}</ReactMarkdown></p> {/* Muestra el contenido generado */}
    </div>
  );
}

export default VistaPrevia;
