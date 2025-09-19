export default class Portada {
  #portada;
  #vistaVuelos;
  #btnVerVuelos;

  constructor() {
    this.#portada = document.querySelector("#portada");
    this.#vistaVuelos = document.querySelector("#vista-vuelos");
    this.#btnVerVuelos = document.querySelector("#btn-ver-vuelos");

    if (!this.#portada || !this.#vistaVuelos || !this.#btnVerVuelos) {
      console.error("No se encontraron los elementos necesarios para la portada.");
    }
  }

  iniciar() {
    if (!this.#btnVerVuelos) {
      console.error("Botón 'Ver Vuelos' no disponible. Portada no iniciada.");
      return;
    }
    this.#btnVerVuelos.addEventListener('click', () => this.#mostrarVistaVuelos());
  }


  #mostrarVistaVuelos() {
    this.#portada.classList.add('hidden');
    this.#vistaVuelos.classList.remove('hidden');
  }
}
