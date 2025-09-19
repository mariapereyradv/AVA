import Vuelo from '../models/vuelo.js';

export default class Tablero {
    // propiedades privadas
    #contenedor;
    #vuelos = [];
    #fechaContenedor;
    #intervaloID;

    constructor() {
        //elementos del DOM
        this.#contenedor = document.querySelector("#vuelos-contenedor");
        this.#fechaContenedor = document.querySelector("#fecha-actual");

        if (!this.#contenedor || !this.#fechaContenedor) {
            console.error("No se encontraron los elementos necesarios para el tablero.");
        }
    }

    //metodo de inicio
    iniciar() {
        this.actualizarFecha();
        this.obtenerVuelos();

        // Configura una actualización automática.
        this.#intervaloID = setInterval(() => this.obtenerVuelos(), 60000);
    }

    // para obtener vuelos de forma asincrona 
    async obtenerVuelos() {
        console.log("Actualizando vuelos...");
        try {
            const respuesta = await fetch('vuelos.json');

            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            const datosCrudos = await respuesta.json();

            this.#vuelos = datosCrudos.map(data => new Vuelo(data));

            this.renderizarVuelos(this.#vuelos);
        } catch (error) {
            console.error("Falló la obtención de vuelos:", error);
            this.mostrarError("No se pudieron cargar los datos de los vuelos. Intente de nuevo más tarde.");
        }
    }

    // mostrar vuelos
    renderizarVuelos(vuelos) {
        // limpia el contenido anterior cuando se actualiza
        this.#contenedor.innerHTML = '';

        if (vuelos.length === 0) {
            this.mostrarError("No hay vuelos para mostrar.");
            return;
        }

        // creo la tabla y sus componentes dinámicamente con createElement().
        const tabla = document.createElement('table');
        tabla.className = 'w-full text-left table-auto';

        const thead = document.createElement('thead');
        thead.innerHTML = `
        <tr class="bg-gray-700 text-cyan-400">
            <th class="p-4">Vuelo</th>
            <th class="p-4">Destino</th>
            <th class="p-4">Salida</th>
            <th class="p-4">Estado</th>
        </tr>`;

        tabla.appendChild(thead);

        const tbody = document.createElement('tbody');

        vuelos.forEach(vuelo => {
            const fila = this.#crearFilaVuelo(vuelo);
            tbody.appendChild(fila);
        });

        tabla.appendChild(tbody);

        // Finalmente, añadimos la tabla completa al DOM
        this.#contenedor.appendChild(tabla);
    }

    // metodo para crear una fila (<tr>)
    #crearFilaVuelo(vuelo) {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-gray-700 hover:bg-gray-600 transition-colors';

        tr.innerHTML = `
                <td class="p-4 font-mono flex items-center gap-3">
                    <img src="${vuelo.bandera_url}" alt="Bandera" class="w-8 h-auto shadow-md">
                    ${vuelo.codigo}
                </td>
                <td class="p-4">${vuelo.obtenerDestinoCompleto()}</td>
                <td class="p-4 font-mono">${vuelo.hora_salida}</td>
                <td class="p-4 ${vuelo.obtenerClaseEstado()}">${vuelo.estado}</td>
            `;
        return tr;
    }

    // metodo auxiliar para mostrar errores en la interfaz
    mostrarError(mensaje) {
        this.#contenedor.innerHTML = `<p class="text-center text-red-500 bg-red-900 bg-opacity-30 p-4 rounded-lg">${mensaje}</p>`;
    }

    // metodo auxiliar para actualizar la fecha
    actualizarFecha() {
        const ahora = new Date();
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.#fechaContenedor.innerText = ahora.toLocaleDateString('es-ES', opciones);
    }
}
