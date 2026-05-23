# Módulo de Tutorías y Asesorías — Grupo 3

## Descripción

Aplicación web para gestionar tutorías y asesorías académicas. Permite a los estudiantes consultar las sesiones disponibles, solicitar nuevas asesorías, editarlas y eliminarlas, todo desde una interfaz sencilla y responsiva. Los datos se persisten en el navegador mediante `localStorage`, por lo que sobreviven al recargar la página.

---

## Características implementadas

### Visualización
- **Listado en tarjetas** con información de cada tutoría: materia, docente, fecha y estado.
- **Modal de detalles** que muestra información completa al hacer clic en "Ver Detalles".

### Búsqueda y filtrado
- **Búsqueda en tiempo real** por nombre de docente.
- **Filtro por materia** mediante un menú desplegable.
- Ambos filtros se aplican de forma combinada e instantánea.

### CRUD completo
| Operación | Descripción |
|-----------|-------------|
| **Crear** | Formulario para registrar una nueva solicitud de asesoría con docente, materia y fecha. |
| **Leer** | Las tarjetas y el modal muestran todos los datos de cada tutoría. |
| **Editar** | El formulario se reutiliza para modificar una tutoría existente; el botón cambia de color para indicar el modo edición. |
| **Eliminar** | Solicita confirmación antes de borrar permanentemente una tutoría. |

### Validaciones del formulario
- Todos los campos son obligatorios.
- El nombre del docente debe tener al menos 3 caracteres.
- Los errores se muestran en un mensaje destacado sobre el formulario.

### Persistencia
- Los datos se guardan automáticamente en `localStorage` tras cada operación (crear, editar, eliminar).
- Al cargar la página por primera vez se usan los datos iniciales definidos en `data.js`.

---

## Estructura del proyecto

```
/
├── index.html      # Estructura HTML de la aplicación
├── styles.css      # Estilos y diseño responsivo
├── data.js         # Datos iniciales de tutorías
├── app.js          # Lógica de la aplicación (CRUD, filtros, modal)
└── readme.md       # Este archivo
```

### Materias disponibles
- Programación Web
- Matemáticas Discretas
- Bases de Datos
- Física
- Ingeniería de Software
- Redes

---

## Instrucciones de uso

1. **Abrir la aplicación**: Abrir `index.html` directamente en el navegador (no requiere servidor).
2. **Explorar asesorías**: Las tarjetas se cargan automáticamente con los datos iniciales.
3. **Filtrar**: Escribe un nombre en el buscador o selecciona una materia del menú.
4. **Ver detalles**: Haz clic en **Ver Detalles** en cualquier tarjeta.
5. **Solicitar una asesoría**: Rellena el formulario lateral y haz clic en **Registrar Solicitud**.
6. **Editar**: Haz clic en **Editar** sobre la tarjeta deseada, modifica los campos y guarda.
7. **Eliminar**: Haz clic en **Eliminar** y confirma la acción en el diálogo.

> **Nota:** Los datos se guardan en el `localStorage` del navegador. Limpiar los datos del sitio en el navegador restablecerá la lista a los valores iniciales.
