# Documentación Técnica - EasyTaxi Palma
## Proyecto Intermodular - UD1A

**Autor:** Sebastià Romaguera Camps  
**Ciclo:** Desarrollo de Aplicaciones Web (IFC33X)  
**Fecha:** Febrero 2026  
**Versión:** 1.0.0 (UD1A - Primera versión funcional)

---

## 📋 Índice
1. [Arquitectura del proyecto](#arquitectura)
2. [Tecnologías utilizadas](#tecnologías)
3. [Estructura de archivos](#estructura)
4. [Instalación y configuración](#instalación)
5. [Base de datos](#base-de-datos)
6. [API REST - Endpoints](#endpoints)
7. [Frontend - Funcionalidades](#frontend)
8. [Seguridad](#seguridad)
9. [Próximos pasos](#próximos-pasos)

---

## 🏗️ Arquitectura del proyecto {#arquitectura}

EasyTaxi Palma sigue una arquitectura **cliente-servidor** con separación clara entre frontend y backend:

- **Backend:** API RESTful con Node.js y Express
- **Frontend:** Aplicación web SPA (Single Page Application) con HTML/CSS/JavaScript
- **Base de datos:** MongoDB (NoSQL)
- **Comunicación:** HTTP/JSON

```
Cliente (Browser)  <---> API REST (Express)  <---> MongoDB
    Frontend              Backend              Base de datos
```

---

## 💻 Tecnologías utilizadas {#tecnologías}

### Backend
- **Node.js** (v18+) - Entorno de ejecución JavaScript
- **Express.js** (v4.18) - Framework web para Node.js
- **MongoDB** (v6+) - Base de datos NoSQL
- **Mongoose** (v8) - ODM para MongoDB
- **bcryptjs** (v2.4) - Encriptación de contraseñas
- **cors** - Manejo de CORS
- **dotenv** - Gestión de variables de entorno

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con animaciones
- **JavaScript ES6+** - Lógica del cliente
- **Fetch API** - Peticiones HTTP asíncronas

### Herramientas de desarrollo
- **Nodemon** - Recarga automática del servidor
- **Git** - Control de versiones
- **VS Code** - Editor de código

---

## 📁 Estructura de archivos {#estructura}

```
Proyecto-Intermodular/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Configuración MongoDB
│   │   ├── models/
│   │   │   └── Usuario.js           # Modelo de usuario
│   │   ├── controllers/
│   │   │   └── authController.js    # Lógica de autenticación
│   │   └── routes/
│   │       └── authRoutes.js        # Rutas de autenticación
│   ├── .env                         # Variables de entorno (no subir a Git)
│   ├── .env.example                 # Ejemplo de variables
│   ├── package.json                 # Dependencias del proyecto
│   └── server.js                    # Punto de entrada del servidor
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css          # Estilos globales
│   │   └── js/
│   │       └── auth.js             # Lógica de autenticación
│   ├── index.html                  # Página de inicio
│   ├── login.html                  # Página de login
│   ├── register.html               # Página de registro
│   └── dashboard.html              # Dashboard (temporal)
├── docs/
│   └── tecnica.md                  # Este archivo
├── .gitignore                      # Archivos ignorados por Git
└── README.md                       # Documentación principal
```

---

## ⚙️ Instalación y configuración {#instalación}

### Requisitos previos
- Node.js v18 o superior
- MongoDB v6 o superior (instalado y ejecutándose)
- Git

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/SebasRomaguera/Proyecto-Intermodular.git
cd Proyecto-Intermodular
```

### Paso 2: Configurar el backend
```bash
cd backend
npm install
```

### Paso 3: Configurar variables de entorno
Crear archivo `.env` en la carpeta `backend/`:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/easytaxi
NODE_ENV=development
```

### Paso 4: Iniciar MongoDB
```bash
# En Linux/Mac
sudo systemctl start mongod

# O usando MongoDB Compass (interfaz gráfica)
```

### Paso 5: Iniciar el servidor
```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

### Paso 6: Abrir el frontend
Abrir el archivo `frontend/index.html` en un navegador o usar Live Server de VS Code.

---

## 🗄️ Base de datos {#base-de-datos}

### Nombre de la base de datos
`easytaxi`

### Colecciones implementadas (UD1A)

#### Colección: `usuarios`
Almacena la información de los usuarios registrados.

**Esquema:**
```javascript
{
  _id: ObjectId,
  nombre: String (required, min: 2 caracteres),
  email: String (required, unique, lowercase),
  password: String (required, hashed con bcrypt),
  telefono: String (opcional),
  createdAt: Date (default: Date.now)
}
```

**Ejemplo de documento:**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "$2a$10$xyzABC123...",
  "telefono": "666123456",
  "createdAt": "2026-02-08T10:30:00.000Z"
}
```

### Índices
- `email`: Único, para evitar duplicados

---

## 🌐 API REST - Endpoints {#endpoints}

### Base URL
```
http://localhost:3000/api
```

### Endpoints implementados

#### 1. Raíz de la API
**GET /** `/`

Verificar que la API está funcionando.

**Respuesta exitosa (200):**
```json
{
  "mensaje": "🚕 EasyTaxi Palma API",
  "version": "1.0.0",
  "estado": "Activo"
}
```

---

#### 2. Registro de usuario
**POST** `/auth/register`

Crea un nuevo usuario en el sistema.

**Body (JSON):**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "mipassword123",
  "telefono": "666123456"  // Opcional
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "mensaje": "Usuario registrado correctamente",
  "usuario": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com"
  }
}
```

**Errores posibles:**
- 400: Campos incompletos o email ya registrado
- 500: Error del servidor

---

#### 3. Login de usuario
**POST** `/auth/login`

Autentica un usuario existente.

**Body (JSON):**
```json
{
  "email": "juan@ejemplo.com",
  "password": "mipassword123"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "mensaje": "Login exitoso",
  "usuario": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com"
  }
}
```

**Errores posibles:**
- 400: Campos incompletos
- 401: Credenciales incorrectas
- 500: Error del servidor

---

## 🎨 Frontend - Funcionalidades {#frontend}

### Páginas implementadas

#### 1. **index.html** - Página de inicio
- Logo de la aplicación
- Botones para login y registro
- Diseño responsive

#### 2. **register.html** - Registro de usuario
- Formulario con validación
- Campos: nombre, email, contraseña, teléfono (opcional)
- Validación en tiempo real
- Mensajes de error/éxito
- Redirección automática al login tras registro exitoso

#### 3. **login.html** - Inicio de sesión
- Formulario de login
- Campos: email, contraseña
- Validación de campos
- Mensajes de error/éxito
- Almacenamiento de sesión en localStorage
- Redirección al dashboard tras login exitoso

#### 4. **dashboard.html** - Panel de usuario
- Mensaje de bienvenida personalizado
- Indicador de sesión activa
- Botón de cerrar sesión
- Protección de ruta (redirige a login si no hay sesión)

### Características de accesibilidad
- Etiquetas `aria-label` en formularios
- Atributos `aria-required` en campos obligatorios
- Contraste de colores adecuado
- Foco visible en elementos interactivos
- Navegación por teclado funcional

### Validaciones del lado cliente
- Email válido (formato)
- Contraseña mínimo 6 caracteres
- Nombre mínimo 2 caracteres
- Campos requeridos no vacíos

---

## 🔒 Seguridad {#seguridad}

### Medidas implementadas

1. **Encriptación de contraseñas**
   - Uso de bcryptjs con salt de 10 rondas
   - Las contraseñas nunca se almacenan en texto plano

2. **Validación de datos**
   - Validación en el frontend (experiencia de usuario)
   - Validación en el backend (seguridad)
   - Mongoose schema validation

3. **CORS**
   - Configurado para permitir peticiones del frontend

4. **Variables de entorno**
   - Credenciales sensibles en archivo `.env`
   - `.env` incluido en `.gitignore`

### Pendientes de implementar (próximas fases)
- JWT (JSON Web Tokens) para sesiones
- HTTPS en producción
- Rate limiting para prevenir ataques
- Sanitización adicional de inputs
- Recuperación de contraseña

---

## 🚀 Próximos pasos {#próximos-pasos}

### UD1B - Segunda fase
- [ ] Implementar sistema de tokens JWT
- [ ] Crear colección de taxis en la BD
- [ ] Implementar colección de reservas
- [ ] Añadir endpoints CRUD para reservas

### UD2 - Funcionalidades avanzadas
- [ ] Integrar mapa interactivo con Leaflet
- [ ] Implementar geolocalización HTML5
- [ ] Simular movimiento de taxi en tiempo real
- [ ] Calcular taxi más cercano
- [ ] Historial de reservas del usuario

### UD3 - Optimización y mejoras
- [ ] Tests unitarios y de integración
- [ ] Optimización de consultas a BD
- [ ] Mejora de la interfaz (diseño más pulido)
- [ ] Implementar Socket.io (opcional)
- [ ] Deploy en servidor (Heroku, Railway, etc.)

---

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Verificar que MongoDB esté ejecutándose: `sudo systemctl status mongod`
- Comprobar la URI en el archivo `.env`

### Error: "CORS policy blocked"
- Asegurarse de que el backend esté ejecutándose
- Verificar que CORS esté habilitado en `server.js`

### Error: "Email already registered"
- El email ya existe en la base de datos
- Usar otro email o eliminar el usuario existente

---

## 📞 Contacto y soporte

**Desarrollador:** Sebastià Romaguera Camps  
**Email:** [Tu email]  
**GitHub:** https://github.com/SebasRomaguera/Proyecto-Intermodular  
**Trello:** [Enlace al tablero]

---

**Última actualización:** Febrero 2026  
**Versión del documento:** 1.0
