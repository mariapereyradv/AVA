export default class Vuelo {
  #codigo;
  #destino_pais;
  #destino_ciudad;
  #hora_salida;
  #estado;
  #bandera_url;

  constructor(data) {
    this.#codigo = data.codigo;
    this.#destino_pais = data.destino_pais;
    this.#destino_ciudad = data.destino_ciudad;
    this.#hora_salida = data.hora_salida;
    this.#estado = data.estado;
    this.#bandera_url = data.bandera_url;
  }

  get codigo() { return this.#codigo; }
  get hora_salida() { return this.#hora_salida; }
  get estado() { return this.#estado; }
  get bandera_url() { return this.#bandera_url; }

  obtenerDestinoCompleto() {
    return `${this.#destino_ciudad}, ${this.#destino_pais}`;
  }

  obtenerClaseEstado() {
    switch (this.#estado.toLowerCase()) {
      case 'en horario': return 'text-green-400';
      case 'retrasado': return 'text-yellow-400';
      case 'embarcando': return 'text-red-500 font-bold';
      default: return 'text-gray-400';
    }
  }
}

