# Tutorías y Asesorías – Backend · Grupo 3
**Universidad Técnica de Manabí · Actividad 5**

Backend REST construido con **Node.js + Express + MySQL2** para el módulo de Tutorías y Asesorías.

---

## Tecnologías

| Paquete    | Versión | Rol                             |
|------------|---------|----------------------------------|
| Node.js    | ≥ 18    | Entorno de ejecución             |
| Express    | ^4.19   | Framework HTTP                   |
| mysql2     | ^3.9    | Driver MariaDB/MySQL (promesas)  |
| dotenv     | ^16.4   | Variables de entorno             |
| cors       | ^2.8    | Cabeceras CORS                   |
| nodemon    | ^3.1    | Recarga automática en desarrollo |

Base de datos: **MariaDB** en `grupofmo.com` · esquema `am_grupo3`.

---

## Estructura del proyecto

```
tutorias-backend/
├── src/
│   ├── app.js                     # Entrada: servidor Express
│   ├── config/
│   │   └── db.js                  # Pool de conexiones MariaDB
│   ├── database/
│   │   ├── schema.sql             # DDL tabla tutorias + 8 seeds
│   │   └── seed.js                # Runner Node.js para el seed
│   ├── models/
│   │   └── tutoria.model.js       # Queries SQL (findAll, findById, create…)
│   ├── services/
│   │   └── tutoria.service.js     # Reglas de negocio (RN-01..RN-04)
│   ├── controllers/
│   │   └── tutoria.controller.js  # Handlers HTTP (req → service → res)
│   ├── routes/
│   │   └── tutoria.routes.js      # Registro de rutas Express
│   └── middlewares/
│       └── errorHandler.js        # Manejo global de errores
├── .env.example                   # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## Configuración rápida

```bash
# 1. Clonar / descomprimir el proyecto
# 2. Instalar dependencias
npm install

# 3. Crear archivo de entorno
cp .env.example .env
# Editar .env si fuera necesario

# 4. Crear la tabla e insertar datos semilla
npm run seed

# 5. Arrancar en modo desarrollo
npm run dev

# 6. Arrancar en producción
npm start
```

---

## Variables de entorno (`.env`)

```env
PORT=3000
NODE_ENV=development

DB_HOST=grupofmo.com
DB_PORT=3306
DB_USER=grupo3
DB_PASSWORD=Grup03.2026
DB_NAME=am_grupo3
```

---

## Endpoints disponibles

| Método | Ruta                  | Descripción                         |
|--------|-----------------------|-------------------------------------|
| GET    | `/`                   | Health-check / info del módulo      |
| GET    | `/api/tutorias`       | Listar todas las tutorías           |
| GET    | `/api/tutorias/:id`   | Obtener una tutoría por ID          |
| POST   | `/api/tutorias`       | Crear nueva tutoría                 |
| PUT    | `/api/tutorias/:id`   | Actualizar tutoría existente        |
| DELETE | `/api/tutorias/:id`   | Eliminar tutoría                    |

### Filtros disponibles en GET /api/tutorias

```
GET /api/tutorias?estado=Disponible
GET /api/tutorias?materia=Programación Web
GET /api/tutorias?modalidad=Virtual
```

### Ejemplo de respuesta exitosa

```json
{
  "ok": true,
  "total": 8,
  "data": [
    {
      "id": 1,
      "docente": "Carlos Gómez",
      "materia": "Matemáticas Discretas",
      "horario": "Lunes 08:00–10:00",
      "modalidad": "Presencial",
      "cupos": 10,
      "estado": "Disponible",
      "descripcion": "Práctica de grafos, lógica proposicional y combinatoria.",
      "creado_en": "2026-06-02T00:00:00.000Z"
    }
  ]
}
```

### Ejemplo de cuerpo para POST /api/tutorias

```json
{
  "docente":    "Pedro Ramírez",
  "materia":    "Bases de Datos",
  "horario":    "Viernes 10:00–12:00",
  "modalidad":  "Virtual",
  "cupos":      8,
  "descripcion":"Repaso de normalización y optimización de consultas."
}
```

---

## Reglas de negocio implementadas

| ID    | Regla                                                                            |
|-------|----------------------------------------------------------------------------------|
| RN-01 | Toda tutoría nueva se crea con estado **"Disponible"** automáticamente.           |
| RN-02 | Solo se aceptan materias del catálogo oficial (6 materias definidas).            |
| RN-03 | El número de cupos debe ser un entero entre **1 y 20**.                          |
| RN-04 | No se puede crear directamente una tutoría con estado **"Cancelada"**.           |

---

## Instrucciones para Postman

1. Importar la colección o crear las peticiones manualmente.
2. Base URL: `http://localhost:3000`
3. Para POST/PUT: en **Body → raw → JSON** enviar el objeto correspondiente.
4. Verificar que el header `Content-Type: application/json` esté presente.
