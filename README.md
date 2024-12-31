# Proyecto de API para Gestión de Items

Este proyecto proporciona una API para la gestión de ítems en una tienda online, con funcionalidades de registro e inicio de sesión de usuarios, así como creación, actualización, eliminación y visualización de ítems.

## Requisitos

- Node.js
- MongoDB
- NPM o Yarn

## Instalación

1. Clona el repositorio:
```
   git clone https://github.com/tu_usuario/tu_repositorio.git
```

####Rutas API
#####Autenticación
####- POST /api/auth/register
Registra un nuevo usuario.
Campos requeridos: email, nameUser, password, role

####- POST /api/auth/login
Inicia sesión con un usuario existente.
Campos requeridos: email, password

Respuesta:

json
```
{
  "id": "usuario_id",
  "name": "nombre_usuario",
  "email": "email_usuario",
  "role": "role_usuario",
  "token": "access_token",
  "refreshToken": "refresh_token"
}
```
###Ítems
####- GET /api/items
Obtiene todos los ítems disponibles.

####- GET /api/items/:id
Obtiene un ítem específico por ID.

####- POST /api/items
Crea un nuevo ítem.
Campos requeridos: userName, title, talle, price, category, color, images[]
Solo accesible para usuarios con rol de administrador.

####- PUT /api/items/:id
Actualiza un ítem por ID.
Solo accesible para usuarios con rol de administrador.

####- DELETE /api/items/:id
Elimina un ítem por ID.
Solo accesible para usuarios con rol de administrador.

###Middleware de Autenticación
- Protección: Todas las rutas requieren autenticación a través de un token JWT en los encabezados de la solicitud.
Ejemplo de encabezado:

```
Authorization: Bearer <token>
```
- Autorización: Solo los usuarios con el rol adecuado (por ejemplo, "admin") pueden acceder a ciertas rutas (como la creación, actualización y eliminación de ítems).

Estructura del Proyecto

```
.
├── controllers                # Lógica de las rutas
│   ├── auth
│   │   ├── loginController.js
│   │   └── registerController.js
│   ├── items
│   │   ├── createItem.js
│   │   ├── deleteItem.js
│   │   ├── getAllItems.js
│   │   ├── getItemById.js
│   │   └── updateItem.js
├── models                     # Modelos de la base de datos
│   ├── itemModel.js
│   └── userModel.js
├── routes                     # Rutas de la API
│   ├── authRoutes.js
│   └── itemRoutes.js
├── middlewares                # Middleware (Autenticación, manejo de errores)
│   ├── authMiddlewares.js
│   └── errorMiddleware.js
├── utils                      # Utilidades
│   ├── authUtils.js           # Funciones para generar tokens
│   ├── logger.js              # Configuración de Winston para logs
│   └── config.js              # Configuración general (como JWT_SECRET)
├── logs                       # Archivos de logs
├── .env                       # Variables de entorno
├── server.js                  # Archivo principal de servidor
├── package.json               # Dependencias del proyecto
└── README.md                  # Este archivo
```
Dependencias
- express: Framework para Node.js para gestionar rutas.
- mongoose: ODM para MongoDB.
- jsonwebtoken: Librería para generar y verificar JWT.
- bcryptjs: Librería para encriptar contraseñas.
- winston: Librería para logging.

##Licencia
Este proyecto está bajo la Licencia MIT.
