import Tablero from '../components/tablero.js';


document.addEventListener('DOMContentLoaded', () => {
    // creo una instancia del controlador principal.
    const tableroDeVuelos = new Tablero();
    
    // llamo un método que inicia toda la lógica.
    tableroDeVuelos.iniciar();
});