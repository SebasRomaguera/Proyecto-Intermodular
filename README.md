# EasyTaxi Palma 🚕  
Aplicación web para la reserva y solicitud de taxis en Palma de Mallorca
https://proyecto-intermodular-liard.vercel.app/

## � Estado del proyecto
**Versión actual:** UD1B - Sistema de viajes implementado  
**Fecha:** Marzo 2026  
**Estado:** ✅ En desarrollo activo  

### Funcionalidades implementadas
- ✅ Sistema de registro de usuarios.
- ✅ Sistema de login/autenticación
- ✅ Validación de datos (frontend y backend)
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Conexión con MongoDB
- ✅ API REST funcional (Express)
- ✅ Interfaz de usuario responsive
- ✅ Gestión de sesiones con localStorage
- ✅ **Sistema de solicitud de viajes**
- ✅ **Asignación automática de conductores**
- ✅ **Tracking en tiempo real con timeline**
- ✅ **Cálculo de precios y tiempos estimados**
- ✅ **Sistema de valoraciones**
- ✅ **Cancelación de viajes**
- ✅ **Historial de viajes del usuario**
- ✅ **Soporte para reservas futuras**
- ✅ **Consulta de disponibilidad de conductores en tiempo real**
- ✅ **Despliegue configurado en Vercel (serverless)**

### Próximas funcionalidades (UD1C y siguientes)
- ⏳ Tokens JWT para autenticación
- ⏳ WebSockets para actualizaciones en tiempo real
- ⏳ Sistema de notificaciones push

---

## �📌 Descripción del proyecto
EasyTaxi Palma es una aplicación web que tengo como objetivo desarrollar para modernizar el sector del taxi en Palma de Mallorca. Después de trabajar como taxista durante cinco meses, pude ver de primera mano las limitaciones tecnológicas del sector y cómo esto afecta tanto a conductores como a usuarios.

Mientras plataformas como Uber o Cabify han avanzado muchísimo digitalmente, el taxi tradicional sigue funcionando de manera muy manual. Por eso quiero crear una alternativa moderna, accesible y fácil de usar que permita solicitar taxis, ver su ubicación en tiempo real y gestionar todo desde una interfaz clara y rápida.

---

## 🛠️ Stack tecnológico

### Backend
- **Node.js** + **Express.js** - Servidor y API REST
- **MongoDB** + **Mongoose** - Base de datos NoSQL
- **Bcrypt** - Encriptación de contraseñas
- **CORS** - Manejo de peticiones entre dominios
- **Dotenv** - Variables de entorno

### Frontend
- **HTML5** + **CSS3** + **JavaScript ES6+**
- **Fetch API** - Peticiones HTTP

### Herramientas
- **Git/GitHub** - Control de versiones
- **Trello** - Gestión del proyecto
- **VS Code** - Editor de código
- **Nodemon** - Recarga automática

---

## 🎯 Objetivos

### Objetivo general
Desarrollar una aplicación web funcional que permita solicitar, reservar y gestionar taxis en tiempo real, de manera segura, rápida y accesible.

### Objetivos específicos
1. Implementar un sistema de registro y autenticación para usuarios (clientes).  
2. Implementar una base de datos local de ubicaciones clave en Palma para facilitar la selección del destino.
3. Simular el progreso del taxi en tiempo real hacia la ubicación del cliente.  
4. Crear un sistema de gestión de reservas con distintos estados (pendiente, en camino, completado).  
5. Calcular automáticamente el taxi más cercano según la ubicación del usuario.  

---

## 🧭 Motivación y contexto
La idea de este proyecto nace de mi experiencia real trabajando en el sector del taxi. Vi cómo muchos procesos siguen siendo tradicionales y poco eficientes, y cómo eso impide competir con las plataformas modernas.

Quiero crear una solución digital que ayude tanto a los usuarios (mayor comodidad y rapidez) como a los conductores (menos kilómetros en vacío, más eficiencia y menos estrés).  
Además, este proyecto me permite aplicar los conocimientos que he adquirido en el ciclo de Desarrollo de Aplicaciones Web y seguir mejorando como desarrollador.

---

## 🔐 Aspectos éticos, accesibilidad e impacto

### Accesibilidad
Quiero crear una interfaz pensada para todos, incluyendo personas mayores. Para ello aplicaré:
- Etiquetas ARIA.  
- Colores de alto contraste.  
- Interfaces muy claras.  
- Navegación con teclado.  

### Usabilidad
Mi objetivo principal es que cualquier persona pueda usar la aplicación sin complicaciones.  
Los procesos serán breves, los formularios simples y la interfaz será intuitiva.

### Protección de datos
Trabajaré con datos sensibles (email, nombre, ubicación, contraseñas), así que aplicaré:
- Cifrado de contraseñas (bcrypt).  
- Conexiones HTTPS.  
- Tokens JWT.  
- Política de privacidad clara y accesible.  

### Tecnologías utilizadas
**Backend:**
- Node.js + Express (API REST).  
- MongoDB (base de datos).  
- Bcrypt (cifrado de contraseñas).  

**Frontend:**
- HTML5, CSS3, JavaScript vanilla.  
- Geolocalización HTML5 (para detectar ubicación actual del usuario como texto).  

**Simulación:**
- Actualización progresiva del estado del viaje mediante `setInterval`.  
- Datos de taxis generados (5-10 taxis simulados con datos realistas).  

Todas las tecnologías son gratuitas y open source.

### Alcance del proyecto
Este es un proyecto educativo que simula el funcionamiento de una plataforma de reserva de taxis.  
**No habrá taxis reales**, sino datos simulados para demostrar la funcionalidad del sistema.  

La aplicación está pensada para ser intuitiva y accesible, especialmente para personas que prefieren solicitar un taxi desde su móvil en lugar de llamar por teléfono o esperar en la calle.

---

## � Funcionalidades principales

### Para usuarios (clientes)
1. **Registro e inicio de sesión** - Sistema de autenticación con email y contraseña.  
2. **Solicitar taxi** - El usuario introduce o permite detectar su ubicación actual.  
3. **Seguimiento del viaje** - Ver en tiempo real:
   - El estado del taxi asignado (asignado, en camino, llegando).
   - Timeline visual con progreso simulado.
4. **Ver tiempo estimado de llegada** - Cálculo aproximado según distancia.  
5. **Historial de reservas** - Consultar viajes anteriores.  
6. **Cancelar reserva** - Antes de que el taxi llegue.
7. **Reservas futuras** - Opción de programar viajes estableciendo fecha y hora.
8. **Disponibilidad de flota** - Posibilidad de consultar los conductores disponibles en tiempo real.

### Sistema de simulación
- Los taxis son **datos falsos** almacenados en la base de datos con ubicaciones reales de Palma.  
- Cuando un usuario pide taxi, el sistema asigna uno disponible.  
- El progreso del viaje se simula mediante una actualización periódica de su estado y tiempo restante.  

---
## 🚀 Instalación y ejecución del proyecto

### Requisitos previos
- Node.js v18 o superior
- MongoDB v6 o superior (instalado y ejecutándose)
- Git

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/SebasRomaguera/Proyecto-Intermodular.git
cd Proyecto-Intermodular
```

### Paso 2: Instalar dependencias del backend
```bash
cd backend
npm install
```

### Paso 3: Configurar variables de entorno
Crear archivo `.env` en la carpeta `backend/` con el siguiente contenido:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/easytaxi
NODE_ENV=development
```

### Paso 4: Asegurarse de que MongoDB esté ejecutándose
```bash
# Linux/Mac
sudo systemctl start mongod

# Windows - Iniciar el servicio de MongoDB
# O usar MongoDB Compass
```

### Paso 5: Iniciar el servidor backend
```bash
cd backend
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

### Paso 6: Abrir el frontend
Abrir el archivo `frontend/index.html` en un navegador o usar Live Server de VS Code.

---

## 🐳 Arranque local con Docker Compose

Si quieres levantar el frontend y el backend en local desde Docker Desktop sin tocar Vercel, usa este modo.

### 1. Crear el archivo de variables de entorno
Copia `.env.example` a `.env` en la raíz del proyecto y pon la misma `MONGO_URI` que usa el proyecto en Vercel.

### 2. Levantar los contenedores
```bash
docker compose up --build
```

### 3. Abrir la app
- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3000`

### 4. Detener el entorno
```bash
docker compose down
```

Este modo no crea una base de datos local. El backend de Docker se conecta a la misma base de datos remota que usa Vercel.

### Verificar que funciona
1. Abre el navegador en `frontend/index.html`
2. Haz clic en "Registrarse"
3. Completa el formulario de registro
4. Inicia sesión con tus credenciales
5. Deberías ver el dashboard con tu nombre

---
## �🗓️ Planificación del proyecto
La planificación del proyecto la llevo mediante Trello, donde tengo organizadas las tareas, fases y subtareas.

📌 **Tablero de Trello:**  
https://trello.com/invite/b/692c9bad0c0887593048e3b8/ATTI442e3823e003cc7552755b6467467faeAAC13E1D/easytaxi?authuser=0

---

## � Estructura del proyecto

```
Proyecto-Intermodular/
├── backend/                    # Servidor Node.js
│   ├── src/
│   │   ├── config/            # Configuración (BD)
│   │   ├── models/            # Modelos de datos (Mongoose)
│   │   ├── controllers/       # Lógica de negocio
│   │   └── routes/            # Rutas de la API
│   ├── .env                   # Variables de entorno
│   ├── seed-conductores.js    # Script para crear conductores de prueba
│   ├── package.json           # Dependencias
│   └── server.js              # Punto de entrada
├── frontend/                  # Aplicación web
│   ├── assets/
│   │   ├── css/              # Estilos
│   │   └── js/               # Scripts
│   ├── index.html            # Página principal
│   ├── login.html            # Login
│   ├── register.html         # Registro
│   ├── perfil.html           # Perfil de usuario
│   ├── conductores.html      # Info para conductores
│   ├── ayuda.html            # Ayuda y FAQ
│   ├── viaje-en-curso.html   # Tracking del viaje activo
│   └── historial-viajes.html # Historial de viajes
├── docs/
│   └── tecnica.md            # Documentación técnica
├── docker-compose.yml
├── vercel.json               # Configuración de despliegue Vercel
└── README.md
```

---
## 🚖 Cómo probar el sistema de viajes

### 1. Iniciar los servicios

```bash
# Terminal 1: Iniciar MongoDB
docker-compose up -d

# Terminal 2: Iniciar backend
cd backend
npm start

# Terminal 3: Iniciar frontend
cd frontend
python3 -m http.server 8080
```

### 2. Crear conductores de prueba (solo primera vez)

```bash
cd backend
node seed-conductores.js
```

Esto creará 5 conductores disponibles:
- Juan García López (Toyota Prius)
- María Rodríguez Martín (Seat León)
- Pedro Sánchez Fernández (Volkswagen Passat)
- Ana Martínez Díaz (Nissan Leaf)
- Carlos López Ruiz (Ford Mondeo)

### 3. Probar la aplicación

1. Accede a http://localhost:8080/index.html
2. Regístrate o inicia sesión
3. En la página principal, ingresa:
   - **Origen:** Calle Mayor, 5
   - **Destino:** Aeropuerto de Palma
4. Click en "Pedir taxi" (o "Reservar taxi" para reservas futuras)
5. Se te asignará un conductor automáticamente (para viajes inmediatos) o uno sin solapes de horario (para reservas futuras)
6. Verás la página de tracking con:
   - Timeline visual (Asignado → En camino → Llegando)
   - Barra de progreso animada
   - Tiempo restante actualizado cada 3 segundos
   - Información del conductor y vehículo
   - Precio estimado
7. Cuando el viaje se complete (100%), podrás valorar al conductor
8. Puedes cancelar el viaje en cualquier momento antes de completarse

### API Endpoints disponibles

```
POST   /api/viajes/solicitar      - Solicitar un nuevo viaje
GET    /api/viajes/:id/estado     - Obtener estado del viaje
GET    /api/viajes/historial      - Historial de viajes
POST   /api/viajes/:id/cancelar   - Cancelar viaje
POST   /api/viajes/:id/valorar    - Valorar viaje completado
GET    /api/conductores/disponibles - Consultar conductores disponibles
```

---
## �📚 Bibliografía y recursos consultados
- MDN Web Docs – Accesibilidad y buenas prácticas.  
- MongoDB – Security Best Practices.  
- Express.js Documentation – Creación de APIs REST.  
- Consultas técnicas sobre accesibilidad y elección de tecnologías.  

---

## 🔗 Enlaces del proyecto
- **Repositorio GitHub:**  
  https://github.com/SebasRomaguera/Proyecto-Intermodular  

---

## 📄 Información
Proyecto Intermodular – UT0  
Sebastià Romaguera Camps – IFC33X  
Marzo 2026

