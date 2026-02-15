# Sistema de Viajes - EasyTaxi Palma

## 📋 Descripción General

El sistema de viajes permite a los usuarios solicitar taxis de manera sencilla mediante una interfaz intuitiva. El sistema asigna automáticamente un conductor disponible, calcula el precio y tiempo estimados, y muestra el progreso del viaje en tiempo real mediante una línea de tiempo (timeline) animada.

---

## 🏗️ Arquitectura del Sistema

### Backend

#### Modelos de Datos

**Conductor (`/backend/src/models/Conductor.js`)**
```javascript
{
  nombre: String,
  apellidos: String,
  telefono: String,
  vehiculo: {
    marca: String,
    modelo: String,
    color: String,
    matricula: String
  },
  ubicacionActual: {
    lat: Number,
    lng: Number
  },
  estado: "disponible" | "ocupado" | "desconectado",
  valoracion: Number (0-5),
  totalViajes: Number
}
```

**Viaje (`/backend/src/models/Viaje.js`)**
```javascript
{
  usuario: ObjectId (ref: Usuario),
  conductor: ObjectId (ref: Conductor),
  origen: String,
  destino: String,
  estado: "asignado" | "en_camino" | "llegando" | "completado" | "cancelado",
  precioEstimado: Number,
  tiempoEstimadoMinutos: Number,
  horaInicio: Date,
  horaFinEstimada: Date,
  progreso: Number (0-100),
  valoracionUsuario: Number (1-5),
  comentario: String
}
```

#### Controladores (`/backend/src/controllers/viajeController.js`)

**`solicitarViaje(req, res)`**
- Valida origen y destino
- Busca conductor disponible
- Calcula distancia, precio y tiempo estimados
- Crea el viaje en la base de datos
- Actualiza estado del conductor a "ocupado"
- Retorna datos completos del viaje y conductor

**`obtenerEstadoViaje(req, res)`**
- Obtiene el viaje por ID
- Calcula progreso actual basado en tiempo transcurrido
- Actualiza estado según progreso (asignado → en_camino → llegando → completado)
- Retorna progreso, tiempo restante e información actualizada

**`cancelarViaje(req, res)`**
- Valida que el viaje no esté completado
- Cambia estado a "cancelado"
- Libera al conductor (estado → disponible)

**`valorarViaje(req, res)`**
- Guarda valoración del usuario (1-5 estrellas)
- Actualiza valoración promedio del conductor
- Incrementa contador de viajes del conductor

#### Rutas API (`/backend/src/routes/viajeRoutes.js`)

```
POST   /api/viajes/solicitar      (requiere autenticación)
GET    /api/viajes/:id/estado     (sin autenticación)
POST   /api/viajes/:id/cancelar   (requiere autenticación)
POST   /api/viajes/:id/valorar    (requiere autenticación)
GET    /api/viajes/historial      (requiere autenticación)
```

#### Algoritmos de Cálculo

**Precio Estimado:**
```javascript
precio = tarifaBase (4€) + (distanciaKm × 1.2€/km)
```

**Tiempo Estimado:**
```javascript
minutos = (distanciaKm / 30 km/h) × 60
// Mínimo 3 minutos
```

**Progreso del Viaje:**
```javascript
tiempoTranscurrido = ahora - horaInicio
duracionTotal = horaFinEstimada - horaInicio
progreso = (tiempoTranscurrido / duracionTotal) × 100

// Estados según progreso:
// 0-20%:   asignado
// 20-80%:  en_camino
// 80-100%: llegando
// 100%:    completado
```

---

### Frontend

#### Página Principal (`/frontend/index.html`)

**Función `solicitarViaje()`**
1. Valida origen y destino
2. Muestra modal de carga "Buscando conductor..."
3. Envía petición POST a `/api/viajes/solicitar`
4. Redirige a `viaje-en-curso.html?id={viajeId}`

#### Página de Tracking (`/frontend/viaje-en-curso.html`)

**Componentes Visuales:**

1. **Card del Conductor**
   - Nombre completo
   - Valoración (estrellas)
   - Información del vehículo (marca, modelo, color, matrícula)
   - Teléfono de contacto

2. **Timeline (Línea de Tiempo)**
   - 3 estados: Asignado → En camino → Llegando
   - Puntos circulares con iconos
   - Conectores que cambian de color según progreso
   - Estados activo/completado con estilos diferenciados

3. **Barra de Progreso**
   - Animación fluida (transition: 1s)
   - Muestra porcentaje en tiempo real
   - Gradiente visual (púrpura)

4. **Información del Viaje**
   - Origen y destino con iconos
   - Tiempo restante actualizado
   - Precio estimado destacado

5. **Sistema de Valoración (al completar)**
   - 5 estrellas interactivas
   - Hover preview
   - Confirmación de envío

**Lógica JavaScript:**

```javascript
// Polling cada 3 segundos
setInterval(obtenerEstadoViaje, 3000);

// Actualización automática del progreso
function mostrarViaje(viaje) {
  - Actualiza timeline según estado
  - Mueve barra de progreso
  - Actualiza tiempo restante
  - Cambia estados visuales
}

// Al llegar a 100%
if (viaje.estado === 'completado') {
  clearInterval();
  mostrarViajeCompletado();
}
```

---

## 🔄 Flujo de Uso Completo

### 1. Usuario solicita viaje
```
Usuario → index.html → click "Ver precios"
  ↓
Validación de origen/destino
  ↓
POST /api/viajes/solicitar
  ↓
Backend busca conductor disponible
  ↓
Backend crea viaje y asigna conductor
  ↓
Backend retorna datos del viaje
  ↓
Redirect a viaje-en-curso.html?id=xxx
```

### 2. Tracking en tiempo real
```
viaje-en-curso.html se carga
  ↓
Obtiene ID del viaje de URL
  ↓
Cada 3 segundos:
  GET /api/viajes/:id/estado
    ↓
  Backend calcula progreso actual
    ↓
  Frontend actualiza:
    - Timeline
    - Barra de progreso
    - Tiempo restante
    ↓
Si progreso = 100%:
  Detiene polling
  Muestra formulario de valoración
```

### 3. Valoración y finalización
```
Usuario selecciona estrellas (1-5)
  ↓
Click "Enviar valoración"
  ↓
POST /api/viajes/:id/valorar
  ↓
Backend guarda valoración
  ↓
Backend actualiza valoración del conductor
  ↓
Redirect a index.html
```

---

## 🎨 Diseño Visual

### Paleta de Colores
- **Primario:** `#667eea` (púrpura)
- **Secundario:** `#764ba2` (púrpura oscuro)
- **Éxito:** `#10b981` (verde)
- **Error:** `#ef4444` (rojo)
- **Amarillo:** `#fbbf24` (estrellas)
- **Fondo:** `#f9fafb` (gris claro)

### Animaciones
- **Fade in:** Modal de carga
- **Spin:** Icono de carga (360° infinito)
- **Progress bar:** Transición suave 1s
- **Hover:** Estrellas cambian de color

---

## 🧪 Testing y Debugging

### Crear Conductores de Prueba
```bash
cd backend
node seed-conductores.js
```

### Verificar Estado de un Viaje
```bash
curl http://localhost:3000/api/viajes/{viajeId}/estado
```

### Simular Viaje Completo
1. El viaje dura el tiempo definido en `tiempoEstimadoMinutos`
2. El progreso se calcula automáticamente en tiempo real
3. A los ~80% cambia a estado "llegando"
4. A 100% se marca como "completado"

### Debugging Common Issues

**No hay conductores disponibles:**
```bash
# Ver conductores en DB
mongosh mongodb://localhost:27018/easytaxi
db.conductores.find({ estado: "disponible" })
```

**Viaje no se actualiza:**
- Verificar que el polling esté activo (cada 3s)
- Revisar console del navegador
- Verificar que backend esté corriendo

**Error de autenticación:**
- Asegurarse de estar logueado
- Verificar que `userEmail` esté en localStorage

---

## 🚀 Mejoras Futuras

### Fase 1 (Corto plazo)
- [ ] Historial de viajes del usuario
- [ ] Filtros por estado (completados, cancelados)
- [ ] Notificaciones cuando el taxi está cerca

### Fase 2 (Medio plazo)
- [ ] WebSockets para updates en tiempo real (sin polling)
- [ ] Mapa interactivo con Leaflet
- [ ] Animación del taxi moviéndose en el mapa
- [ ] Chat en vivo con el conductor

### Fase 3 (Largo plazo)
- [ ] Sistema de pagos integrado
- [ ] Programar viajes futuros
- [ ] Compartir viaje con otros usuarios
- [ ] PWA con notificaciones push
- [ ] Versión para conductores (app móvil)

---

## 📱 Responsive Design

El sistema está diseñado para funcionar en:
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667, 414x896)

Media queries importantes:
```css
@media (max-width: 768px) {
  /* Timeline vertical */
  /* Botones full-width */
  /* Reducir padding */
}
```

---

## 🔒 Seguridad

### Implementado
- ✅ Validación de datos en cliente y servidor
- ✅ Headers CORS configurados
- ✅ Middleware de autenticación temporal

### Pendiente
- [ ] JWT tokens
- [ ] Rate limiting
- [ ] Sanitización avanzada de inputs
- [ ] HTTPS en producción

---

## 📊 Métricas y Analytics (Futuro)

Datos a trackear:
- Tiempo promedio de viaje
- Valoración promedio por conductor
- Tasa de cancelación
- Horas pico de uso
- Destinos más solicitados
- Ingresos por viaje

---

**Autor:** Sebastià Romaguera Camps  
**Fecha:** Febrero 2026  
**Versión:** UD1B
