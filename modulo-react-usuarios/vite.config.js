import { defineConfig } from 'vite'; // Importa la función que configura Vite.
import react from '@vitejs/plugin-react'; // Importa el complemento para interpretar JSX de React.

export default defineConfig({ // Exporta la configuración que Vite utilizará.
  plugins: [react()] // Activa el soporte de React para este proyecto.
});
