export const RenderUI = {
    //  callbackEditar y callbackEliminar como parámetros
    renderizar(contenedor, lista, callbackDetalle, callbackEditar, callbackEliminar) {
        contenedor.innerHTML = "";

        // Manejo de Estado Vacío
        if (!lista || lista.length === 0) {
            contenedor.innerHTML = `
                <div class="estado-vacio" style="grid-column: 1/-1; text-align: center; padding: 20px; color: #666;">
                    <p>No se encontraron asesorías programadas.</p>
                </div>`;
            return;
        }

        lista.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-tutoria';
            
            card.style = "border: 1px solid #ddd; padding: 15px; margin-bottom: 12px; border-radius: 6px; background: #fff; display: flex; flex-direction: column;";
            
            // Añadimos los 3 botones en un contenedor flexible
            card.innerHTML = `
                <h3 style="margin-top:0; color:#0056b3;">${item.materia}</h3>
                <p><strong>Docente:</strong> ${item.docente}</p>
                <p><strong>Fecha:</strong> ${item.fecha}</p>
                <p><strong>Estado:</strong> <span class="badge" style="display:inline-block; padding:3px 8px; border-radius:4px; font-size:12px; font-weight:bold; background:#e3f2fd; color:#0d47a1;">${item.estado || 'Solicitada'}</span></p>
                
                <div style="display: flex; gap: 8px; margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;">
                    <button class="btn-ver-detalle" style="flex: 1; background:#e3f2fd; color:#0d47a1; border:none; padding:8px; border-radius:4px; cursor:pointer; font-weight:bold;">Ver Detalles</button>
                    <button class="btn-editar" style="flex: 1; background:#fff3cd; color:#856404; border:none; padding:8px; border-radius:4px; cursor:pointer; font-weight:bold;">Editar</button>
                    <button class="btn-eliminar" style="flex: 1; background:#f8d7da; color:#721c24; border:none; padding:8px; border-radius:4px; cursor:pointer; font-weight:bold;">Eliminar</button>
                </div>
            `;
            
            // 1. Evento para Ver Detalle
            card.querySelector('.btn-ver-detalle').addEventListener('click', () => callbackDetalle(item.id));
            
            // 2. Evento para Editar
            if (callbackEditar) {
                card.querySelector('.btn-editar').addEventListener('click', () => callbackEditar(item.id));
            }
            
            // 3. Evento para Eliminar
            if (callbackEliminar) {
                card.querySelector('.btn-eliminar').addEventListener('click', () => callbackEliminar(item.id));
            }

            contenedor.appendChild(card);
        });
    }
};