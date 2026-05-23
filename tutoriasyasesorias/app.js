let tutorias = [];
const datosGuardados = localStorage.getItem('tutoriasData');

if (datosGuardados) {
    tutorias = JSON.parse(datosGuardados);
} else {
    tutorias = [...tutoriasIniciales]; 
    guardarEnLocal();
}

function guardarEnLocal() {
    localStorage.setItem('tutoriasData', JSON.stringify(tutorias));
}

const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const formSolicitud = document.getElementById('form-solicitud');
const mensajeError = document.getElementById('mensaje-error');

const inputBusqueda = document.getElementById('input-busqueda');
const selectMateria = document.getElementById('select-materia');

const modal = document.getElementById('modal-detalle');
const cerrarModalBtn = document.getElementById('cerrar-modal');

const tutoriaIdInput = document.getElementById('tutoria-id');
const docenteInput = document.getElementById('docente');
const materiaInput = document.getElementById('materia');
const fechaInput = document.getElementById('fecha');
const btnSubmit = document.getElementById('btn-submit');
const btnCancelar = document.getElementById('btn-cancelar');
const tituloFormulario = document.getElementById('titulo-formulario');

let editandoId = null;

function showToast(msg, tipo = 'ok') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast' + (tipo === 'error' ? ' toast-error' : ' toast-ok');
    el.classList.remove('oculto');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.add('oculto'), 3500);
}

function renderizarTutorias(arregloDatos) {
    contenedorTarjetas.innerHTML = ''; 
    
    if (arregloDatos.length === 0) {
        contenedorTarjetas.innerHTML = '<p class="aviso-vacio">No se encontraron asesorías que coincidan.</p>';
        return;
    }

    const tarjetasHTML = arregloDatos.map(tutoria => `
        <div class="tarjeta" data-id="${tutoria.id}">
            <h3>${tutoria.materia}</h3>
            <p><strong>Docente:</strong> ${tutoria.docente}</p>
            <p><strong>Fecha:</strong> ${tutoria.fecha}</p>
            <p><strong>Estado:</strong> ${tutoria.estado}</p>
            <div class="card-buttons">
                <button class="btn-detalle" onclick="abrirModal(${tutoria.id})">Ver Detalles</button>
                <button class="btn-editar" onclick="prepararEdicion(${tutoria.id})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarTutoria(${tutoria.id})">Eliminar</button>
            </div>
        </div>
    `).join(''); 

    contenedorTarjetas.innerHTML = tarjetasHTML;
}

function aplicarFiltros() {
    const textoBusqueda = inputBusqueda.value.toLowerCase();
    const materiaFiltro = selectMateria.value;

    const resultado = tutorias.filter(tutoria => {
        const coincideTexto = tutoria.docente.toLowerCase().includes(textoBusqueda);
        const coincideMateria = (materiaFiltro === 'Todas') || (tutoria.materia === materiaFiltro);
        return coincideTexto && coincideMateria;
    });

    renderizarTutorias(resultado);
}

function abrirModal(idTutoria) {
    const tutoriaEncontrada = tutorias.find(t => t.id === idTutoria);
    
    if (tutoriaEncontrada) {
        document.getElementById('modal-materia').textContent = tutoriaEncontrada.materia;
        document.getElementById('modal-docente').textContent = tutoriaEncontrada.docente;
        document.getElementById('modal-fecha').textContent = tutoriaEncontrada.fecha;
        document.getElementById('modal-estado').textContent = tutoriaEncontrada.estado;
        modal.classList.remove('oculto');
    }
}

cerrarModalBtn.addEventListener('click', () => {
    modal.classList.add('oculto');
});

function eliminarTutoria(idTutoria) {
    if (confirm("¿Estás seguro de que quieres eliminar esta tutoría? Esta acción no se puede deshacer.")) {
        tutorias = tutorias.filter(tutoria => tutoria.id !== idTutoria);
        guardarEnLocal(); 
        aplicarFiltros(); 
        if (editandoId === idTutoria) cancelarEdicion();
        showToast('Tutoría eliminada correctamente.');
    }
}

function prepararEdicion(idTutoria) {
    const tutoriaAEditar = tutorias.find(t => t.id === idTutoria);

    if (tutoriaAEditar) {
        tutoriaIdInput.value = tutoriaAEditar.id;
        docenteInput.value = tutoriaAEditar.docente;
        materiaInput.value = tutoriaAEditar.materia;
        fechaInput.value = tutoriaAEditar.fecha;

        editandoId = idTutoria;
        tituloFormulario.textContent = "Editar Solicitud";
        btnSubmit.textContent = "Guardar Cambios";
        btnSubmit.style.backgroundColor = "";
        btnCancelar.classList.remove('oculto'); 

        docenteInput.focus();
    }
}

function cancelarEdicion() {
    formSolicitud.reset(); 
    editandoId = null;
    tituloFormulario.textContent = "Solicitar Nueva Asesoría";
    btnSubmit.textContent = "Registrar Solicitud";
    btnSubmit.style.backgroundColor = "";
    btnCancelar.classList.add('oculto'); 
    mensajeError.classList.add('oculto'); 
}

formSolicitud.addEventListener('submit', function(evento) {
    evento.preventDefault(); 
    mensajeError.classList.add('oculto'); 

    const docenteValue = docenteInput.value.trim();
    const materiaValue = materiaInput.value.trim();
    const fechaValue = fechaInput.value;

    if (docenteValue === '' || materiaValue === '' || fechaValue === '') {
        mostrarError("Todos los campos son obligatorios.");
        return;
    }

    if (docenteValue.length < 3) {
        mostrarError("El nombre del docente debe tener al menos 3 caracteres.");
        return;
    }

    if (editandoId) {
        const indiceTutoria = tutorias.findIndex(t => t.id === editandoId);
        
        if (indiceTutoria !== -1) {
            tutorias[indiceTutoria] = {
                ...tutorias[indiceTutoria], 
                docente: docenteValue,      
                materia: materiaValue,
                fecha: fechaValue
            };
            cancelarEdicion(); 
            showToast('Tutoría actualizada correctamente.');
        }
    } else {
        const nuevaSolicitud = {
            id: Date.now(), 
            docente: docenteValue,
            materia: materiaValue,
            fecha: fechaValue,
            estado: "Solicitada", 
            descripcion: "Solicitud registrada por el estudiante."
        };

        tutorias.push(nuevaSolicitud);
        formSolicitud.reset(); 
        showToast('Solicitud registrada correctamente.');
    }

    guardarEnLocal();
    aplicarFiltros(); 
});

btnCancelar.addEventListener('click', cancelarEdicion);

function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove('oculto');
    docenteInput.focus(); 
}

document.addEventListener('DOMContentLoaded', () => {
    aplicarFiltros(); 
    inputBusqueda.addEventListener('input', aplicarFiltros);
    selectMateria.addEventListener('change', aplicarFiltros);
});
