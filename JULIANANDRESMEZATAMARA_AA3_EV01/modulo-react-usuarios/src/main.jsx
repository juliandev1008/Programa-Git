import { StrictMode } from 'react'; // Importa el modo que detecta problemas durante el desarrollo.
import { createRoot } from 'react-dom/client'; // Importa la función que conecta React con el HTML.
import App from './App.jsx'; // Importa el componente principal de la aplicación.
import './styles.css'; // Importa los estilos visuales del módulo.

createRoot(document.getElementById('root')).render( // Busca el contenedor HTML y dibuja la aplicación.
  <StrictMode> {/* Activa comprobaciones adicionales de React en desarrollo. */}
    <App /> {/* Muestra el componente de gestión de usuarios. */}
  </StrictMode>
);
