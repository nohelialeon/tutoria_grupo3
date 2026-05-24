import { StorageService } from './storage.js';

export class ModuleService {
    constructor(datosSemilla) {
    
        this.tutorias = StorageService.obtenerDatos() || datosSemilla;
        if (!StorageService.obtenerDatos()) {
            StorageService.guardarDatos(this.tutorias);
        }
    }

    obtenerTodas() {
        return this.tutorias;
    }

    agregar(nuevaTutoria) {
        this.tutorias.push(nuevaTutoria);
        StorageService.guardarDatos(this.tutorias);
    }

    filtrar(texto, estado) {
        const query = texto.toLowerCase();
        return this.tutorias.filter(t => {
            const coincideTexto = t.materia.toLowerCase().includes(query) || t.tutor.toLowerCase().includes(query);
            const coincideEstado = estado === "Todos" || t.estado === estado;
            return coincideTexto && coincideEstado;
        });
    }

    ordenarPorFecha(ascendente = true) {
        this.tutorias.sort((a, b) => {
            const fechaA = new Date(`${a.fecha}T${a.hora}`);
            const fechaB = new Date(`${b.fecha}T${b.hora}`);
            return ascendente ? fechaA - fechaB : fechaB - fechaA;
        });
        StorageService.guardarDatos(this.tutorias);
    }
}