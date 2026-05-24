import { tutoriasIniciales } from '../data.js';
import { Validators } from './utils/validators.js';
import { StorageService } from './services/storage.js';
import { TutoriaEntity } from './models/entity.js';
import { RenderUI } from './ui/render.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar datos
    let listaTutorias = StorageService.obtener();
    if (!listaTutorias) {
        listaTutorias = tutoriasIniciales || [];
        StorageService.guardar(listaTutorias);
    }

    // Elementos del DOM
    const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
    const formulario = document.getElementById('form-solicitud');
    const txtError = document.getElementById('mensaje-error');
    const buscadorDocente = document.getElementById('input-busqueda');
    const filtroMateria = document.getElementById('select-materia');

    // Variables y elementos específicos para Edición
    let editandoId = null;
    const inputDocente = document.getElementById('docente');
    const inputMateria = document.getElementById('materia');
    const inputFecha = document.getElementById('fecha');
    
    // Estos elementos deben existir en tu HTML
    const btnSubmit = document.getElementById('btn-submit');
    const btnCancelar = document.getElementById('btn-cancelar'); 
    const tituloFormulario = document.getElementById('titulo-formulario');

    // Función de filtrado y renderizado
    const actualizarVista = () => {
        const query = buscadorDocente ? buscadorDocente.value.toLowerCase() : "";
        const materiaSeleccionada = filtroMateria ? filtroMateria.value : "Todas";

        const filtrados = listaTutorias.filter(t => {
            const coincideDocente = t.docente ? t.docente.toLowerCase().includes(query) : false;
            const coincideMateria = materiaSeleccionada === "Todas" || t.materia === materiaSeleccionada;
            return coincideDocente && coincideMateria;
        });

        // ATENCIÓN: Pasamos las nuevas funciones como parámetros al RenderUI
        RenderUI.renderizar(contenedorTarjetas, filtrados, mostrarModalDetalle, prepararEdicion, eliminarTutoria);
    };

    // --- 1. Lógica del Modal de Detalles ---
    const mostrarModalDetalle = (id) => {
        const elemento = listaTutorias.find(t => t.id === id);
        if (elemento) {
            document.getElementById('modal-detalle').classList.remove('oculto');
            document.getElementById('modal-materia').innerText = elemento.materia;
            document.getElementById('modal-docente').innerText = elemento.docente;
            document.getElementById('modal-fecha').innerText = elemento.fecha;
            document.getElementById('modal-estado').innerText = elemento.estado;
        }
    };

    const cerrarBtn = document.getElementById('cerrar-modal');
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', () => {
            document.getElementById('modal-detalle').classList.add('oculto');
        });
    }

    // --- 2. Nuevas Funciones: Editar y Eliminar ---
    const eliminarTutoria = (id) => {
        if (confirm("¿Estás seguro de eliminar esta asesoría? Esta acción no se puede deshacer.")) {
            listaTutorias = listaTutorias.filter(t => t.id !== id);
            StorageService.guardar(listaTutorias);
            actualizarVista();
            
            // Si estábamos editando la tutoría que acabamos de borrar, cancelamos la edición
            if (editandoId === id) cancelarEdicion();
        }
    };

    const prepararEdicion = (id) => {
        const elemento = listaTutorias.find(t => t.id === id);
        if (elemento) {
            editandoId = id;
            inputDocente.value = elemento.docente;
            inputMateria.value = elemento.materia;
            inputFecha.value = elemento.fecha;

            // Cambiar UI a modo edición
            if(tituloFormulario) tituloFormulario.innerText = "Editar Solicitud";
            if(btnSubmit) {
                btnSubmit.innerText = "Guardar Cambios";
                btnSubmit.style.backgroundColor = "#e0a800";
            }
            if(btnCancelar) btnCancelar.classList.remove('oculto');
        }
    };

    const cancelarEdicion = () => {
        editandoId = null;
        if(formulario) formulario.reset();
        
        // Restaurar UI a modo registro
        if(tituloFormulario) tituloFormulario.innerText = "Solicitar Nueva Asesoría";
        if(btnSubmit) {
            btnSubmit.innerText = "Registrar Solicitud";
            btnSubmit.style.backgroundColor = "#28a745";
        }
        if(btnCancelar) btnCancelar.classList.add('oculto');
        if(txtError) txtError.classList.add('oculto');
    };

    if(btnCancelar) {
        btnCancelar.addEventListener('click', cancelarEdicion);
    }

    // --- 3. Eventos de Escucha ---
    if (buscadorDocente) buscadorDocente.addEventListener('input', actualizarVista);
    if (filtroMateria) filtroMateria.addEventListener('change', actualizarVista);

    // Guardar o Actualizar registro
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            
            txtError.innerText = "";
            txtError.classList.add('oculto');

            const docenteVal = inputDocente.value;
            const materiaVal = inputMateria.value;
            const fechaVal = inputFecha.value;

            if (!Validators.validarTexto(docenteVal, 3) || !materiaVal || !fechaVal) {
                txtError.innerText = "❌ Todos los campos son obligatorios. El docente debe tener al menos 3 letras.";
                txtError.classList.remove('oculto');
                return;
            }

            if (!Validators.validarFechaFutura(fechaVal)) {
                txtError.innerText = "❌ Regla de Negocio: No se permiten tutorías en fechas pasadas.";
                txtError.classList.remove('oculto');
                return;
            }

            if (editandoId) {
                // MODO EDICIÓN
                const index = listaTutorias.findIndex(t => t.id === editandoId);
                if (index !== -1) {
                    listaTutorias[index].docente = docenteVal;
                    listaTutorias[index].materia = materiaVal;
                    listaTutorias[index].fecha = fechaVal;
                }
                cancelarEdicion();
                alert("¡Solicitud actualizada con éxito!");
            } else {
                // MODO CREACIÓN
                const nuevoRegistro = new TutoriaEntity(docenteVal, materiaVal, fechaVal);
                listaTutorias.push(nuevoRegistro);
                formulario.reset();
                alert("¡Solicitud registrada con éxito! ");
            }

            StorageService.guardar(listaTutorias);
            actualizarVista();
        });
    }

    // Carga inicial
    actualizarVista();
});