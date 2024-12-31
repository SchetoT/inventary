# Proyecto de API para Gestión de Ítems

Este proyecto proporciona una API para la gestión de ítems en una tienda online, con funcionalidades de registro e inicio de sesión de usuarios, así como creación, actualización, eliminación y visualización de ítems.

## Requisitos

- Node.js
- MongoDB
- NPM o Yarn

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    ```

2. Accede al directorio del proyecto:

    ```bash
    cd tu_repositorio
    ```

3. Instala las dependencias:

    Si usas NPM:

    ```bash
    npm install
    ```

    O si usas Yarn:

    ```bash
    yarn install
    ```

4. Crea el archivo `.env` en la raíz del proyecto y agrega las variables de entorno necesarias:

    ```env
    PORT=3000
    JWT_SECRET=tu_clave_secreta
    MONGO_DB_URI=tu_uri_de_mongo_db
    ```

5. Inicia el servidor:

    Si usas NPM:

    ```bash
    npm start
    ```

    O si usas Yarn:

    ```bash
    yarn start
    ```

## Rutas de la API

### Autenticación

#### **POST** `/api/auth/register`

Registra un nuevo usuario.

**Campos requeridos:**
- `email`: Correo electrónico del usuario.
- `nameUser`: Nombre del usuario.
- `password`: Contraseña del usuario.
- `role`: Rol del usuario (ej. "user", "admin").

#### **POST** `/api/auth/login`

Inicia sesión con un usuario existente.

**Campos requeridos:**
- `email`: Correo electrónico del usuario.
- `password`: Contraseña del usuario.

**Respuesta:**

```json
{
  "id": "usuario_id",
  "name": "nombre_usuario",
  "email": "email_usuario",
  "role": "role_usuario",
  "token": "access_token",
  "refreshToken": "refresh_token"
}
```
## Rutas de la API - Ítems

### **GET** `/api/items`

Obtiene todos los ítems disponibles.

**Descripción:**
Esta ruta devuelve una lista con todos los ítems disponibles en la tienda.

**Respuesta:**

```json
[
  {
    "id": "item_id",
    "userName": "usuario_id",
    "title": "Título del ítem",
    "talle": "Tamaño",
    "price": 100,
    "category": "Categoría",
    "color": "Color",
    "images": ["url_imagen1", "url_imagen2"]
  },
  {
    "id": "item_id2",
    "userName": "usuario_id2",
    "title": "Título del ítem 2",
    "talle": "Tamaño",
    "price": 150,
    "category": "Categoría",
    "color": "Color",
    "images": ["url_imagen1", "url_imagen2"]
  }
]
```
### **POST** `/api/items`

Crea un nuevo ítem.

#### **Descripción**

Esta ruta permite a un usuario con rol de administrador crear un nuevo ítem. Un ítem incluye información como el título, talle, precio, categoría, color y las imágenes asociadas.

#### **Campos Requeridos en el Cuerpo de la Solicitud**

- **`userName`**: ID del usuario que crea el ítem.  
  Tipo: `string`  
  Descripción: Es el ID del usuario que está creando el ítem. Este campo se obtiene automáticamente cuando el usuario está autenticado.

- **`title`**: Título del ítem.  
  Tipo: `string`  
  Descripción: El nombre o título del ítem, que será visible para los usuarios.

- **`talle`**: Talle del ítem.  
  Tipo: `string`  
  Descripción: El tamaño o talle del ítem (ej. S, M, L, XL).

- **`price`**: Precio del ítem.  
  Tipo: `number`  
  Descripción: El precio del ítem.

- **`category`**: Categoría del ítem.  
  Tipo: `string`  
  Descripción: La categoría del ítem (ej. Ropa, Calzado, Electrónica).

- **`color`**: Color del ítem.  
  Tipo: `string`  
  Descripción: El color del ítem (ej. Rojo, Azul, Negro).

- **`images[]`**: Array de URLs de imágenes del ítem.  
  Tipo: `array of strings`  
  Descripción: Un array de URLs de imágenes que representan el ítem.

#### **Autorización**

Solo los usuarios con el rol de **`admin`** pueden crear ítems. Esta ruta está protegida mediante autenticación JWT.

#### **Ejemplo de Cuerpo de la Solicitud**

```json
{
  "userName": "usuario_id",
  "title": "Camiseta de Algodón",
  "talle": "M",
  "price": 199.99,
  "category": "Ropa",
  "color": "Rojo",
  "images": ["url_imagen1", "url_imagen2"]
}
```


## Dependencias
- express: Framework para Node.js para gestionar rutas.
- mongoose: ODM para MongoDB.
- jsonwebtoken: Librería para generar y verificar JWT.
- bcryptjs: Librería para encriptar contraseñas.
- winston: Librería para logging.

## Licencia
Este proyecto está bajo la Licencia MIT.

