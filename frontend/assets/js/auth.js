const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api';

// Translations for validation messages
const authTranslations = {
  es: {
    requiredFields: 'Por favor, completa todos los campos obligatorios',
    nameLength: 'El nombre debe tener al menos 2 caracteres',
    validEmail: 'Por favor, introduce un email válido',
    passwordLength: 'La contraseña debe tener al menos 6 caracteres',
    registerSuccess: '¡Registro exitoso! Redirigiendo al login...',
    loginSuccess: '¡Login exitoso! Bienvenido...',
    connectionError: 'Error de conexión. Asegúrate de que el servidor esté ejecutándose.'
  },
  en: {
    requiredFields: 'Please fill in all required fields',
    nameLength: 'Name must be at least 2 characters',
    validEmail: 'Please enter a valid email',
    passwordLength: 'Password must be at least 6 characters',
    registerSuccess: 'Registration successful! Redirecting to login...',
    loginSuccess: 'Login successful! Welcome...',
    connectionError: 'Connection error. Make sure the server is running.'
  },
  ca: {
    requiredFields: 'Si us plau, omple tots els camps obligatoris',
    nameLength: 'El nom ha de tenir almenys 2 caràcters',
    validEmail: 'Si us plau, introdueix un email vàlid',
    passwordLength: 'La contrasenya ha de tenir almenys 6 caràcters',
    registerSuccess: 'Registre exitós! Redirigint al login...',
    loginSuccess: 'Login exitós! Benvingut...',
    connectionError: 'Error de connexió. Assegura\'t que el servidor està funcionant.'
  }
};

function getTranslation(key) {
  const lang = localStorage.getItem('language') || 'es';
  return authTranslations[lang][key] || authTranslations.es[key];
}

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo = 'error') {
  const mensajeDiv = document.getElementById('mensaje');
  if (!mensajeDiv) return;
  
  mensajeDiv.textContent = mensaje;
  mensajeDiv.className = `message ${tipo}`;
  mensajeDiv.style.display = 'block';
  
  setTimeout(() => {
    mensajeDiv.style.display = 'none';
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
    mostrarMensaje(getTranslation('requiredFields'), 'error');
    return;
  }

  if (nombre.length < 2) {
    mostrarMensaje(getTranslation('nameLength'), 'error');
    return;
  }

  if (!validarEmail(email)) {
    mostrarMensaje(getTranslation('validEmail'), 'error');
    return;
  }

  if (password.length < 6) {
    mostrarMensaje(getTranslation('passwordLength'), 'error');
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
      mostrarMensaje(getTranslation('registerSuccess'), 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    } else {
      mostrarMensaje(data.mensaje, 'error');
    }

  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje(getTranslation('connectionError'), 'error');
  }
}

// Función para login
async function loginUsuario(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Validaciones
  if (!email || !password) {
    mostrarMensaje(getTranslation('requiredFields'), 'error');
    return;
  }

  if (!validarEmail(email)) {
    mostrarMensaje(getTranslation('validEmail'), 'error');
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
      localStorage.setItem('userEmail', data.usuario.email);
      localStorage.setItem('userId', data.usuario._id);
      
      mostrarMensaje(getTranslation('loginSuccess'), 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      mostrarMensaje(data.mensaje, 'error');
    }

  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje(getTranslation('connectionError'), 'error');
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
