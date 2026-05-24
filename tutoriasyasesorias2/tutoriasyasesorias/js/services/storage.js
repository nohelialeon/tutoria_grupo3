const STORAGE_KEY = 'tutorias_data';

export const StorageService = {
    obtener() {
        const datos = localStorage.getItem(STORAGE_KEY);
        return datos ? JSON.parse(datos) : null;
    },
    guardar(datos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
    }
};