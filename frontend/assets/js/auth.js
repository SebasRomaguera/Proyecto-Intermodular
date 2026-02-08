const API_URL = 'http://localhost:3000/api';

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo = 'error') {
  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.textContent = mensaje;
  mensajeDiv.className = `mensaje ${tipo}`;
  mensajeDiv.classList.remove('hidden');
  
  setTimeout(() => {
    mensajeDiv.classList.add('hidden');
  }, 5000);
}

// Función para validar email
function validarEmail(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

// Función para registro
async function registrarUsuario(event) {
  event.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const telefono = document.getElementById('telefono').value.trim();

  // Validaciones
  if (!nombre || !email || !password) {
    mostrarMensaje('Por favor, completa todos los campos obligatorios', 'error');
    return;
  }

  if (nombre.length < 2) {
    mostrarMensaje('El nombre debe tener al menos 2 caracteres', 'error');
    return;
  }

  if (!validarEmail(email)) {
    mostrarMensaje('Por favor, introduce un email válido', 'error');
    return;
  }

  if (password.length < 6) {
    mostrarMensaje('La contraseña debe tener al menos 6 caracteres', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, email, password, telefono })
    });

    const data = await response.json();

    if (data.success) {
      mostrarMensaje('¡Registro exitoso! Redirigiendo al login...', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    } else {
      mostrarMensaje(data.mensaje, 'error');
    }

  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error de conexión. Asegúrate de que el servidor esté ejecutándose.', 'error');
  }
}

// Función para login
async function loginUsuario(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Validaciones
  if (!email || !password) {
    mostrarMensaje('Por favor, completa todos los campos', 'error');
    return;
  }

  if (!validarEmail(email)) {
    mostrarMensaje('Por favor, introduce un email válido', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      // Guardar información del usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      
      mostrarMensaje('¡Login exitoso! Bienvenido...', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      mostrarMensaje(data.mensaje, 'error');
    }

  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error de conexión. Asegúrate de que el servidor esté ejecutándose.', 'error');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', registrarUsuario);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', loginUsuario);
  }
});
