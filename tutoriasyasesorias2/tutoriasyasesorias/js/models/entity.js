export class TutoriaEntity {
    constructor(docente, materia, fecha) {
        this.id = Date.now(); // ID único autogenerado
        this.docente = docente.trim();
        this.materia = materia;
        this.fecha = fecha;
        this.estado = "Pendiente"; // Regla de Negocio: Estado inicial automático
    }
}