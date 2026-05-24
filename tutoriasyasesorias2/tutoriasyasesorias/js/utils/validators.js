export const Validators = {
    validarTexto(texto, minLength = 3) {
        return texto && texto.trim().length >= minLength;
    },

    validarFechaFutura(fechaString) {
        if (!fechaString) return false;
        const fechaSeleccionada = new Date(fechaString + 'T00:00:00');
        const fechaActual = new Date();
        fechaActual.setHours(0,0,0,0);
        return fechaSeleccionada >= fechaActual;
    }
};