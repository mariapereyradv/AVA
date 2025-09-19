import Tablero from './components/tablero.js';
import Portada from './components/portada.js';

document.addEventListener('DOMContentLoaded', () => {
  const portada = new Portada();
  portada.iniciar();

  const tableroDeVuelos = new Tablero();
  tableroDeVuelos.iniciar();
});
