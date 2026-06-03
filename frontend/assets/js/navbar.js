(function () {

    /* =====================================================================
       ESTILOS — Se inyectan en el <head> para que apliquen a todo.
       Son exactamente los mismos que index.html.
    ===================================================================== */
    const CSS = `
        /* Navbar */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 80px;
            background: #FDB913;
            color: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: relative;
        }

        .hamburger-btn {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 28px;
            color: black;
            padding: 5px;
            line-height: 1;
        }

        .nav-left, .nav-right {
            display: flex;
            align-items: center;
            gap: 25px;
        }

        .navbar .logo {
            font-size: 24px;
            font-weight: bold;
            margin-right: 20px;
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        .logo-short { display: none; }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 20px;
        }

        .nav-links a, .nav-right a {
            color: black;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: opacity 0.3s;
        }

        .nav-links a.nav-drivers-btn {
            background: white;
            padding: 8px 14px;
            border-radius: 20px;
            font-weight: 600;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .nav-links a:hover, .nav-right a:hover { opacity: 0.7; }

        .nav-links a.active {
            font-weight: 700;
            text-decoration: underline;
        }

        .navbar .btn-register {
            background: white;
            color: black !important;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            text-decoration: none;
        }

        .navbar .btn-register:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            opacity: 1 !important;
        }

        /* Language Dropdown */
        .language-selector { position: relative; display: inline-block; }

        .language-btn {
            background: transparent;
            border: none;
            color: black;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px 10px;
            border-radius: 5px;
            transition: background 0.3s;
        }

        .language-btn:hover { background: rgba(0,0,0,0.1); }

        .language-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            min-width: 150px;
            display: none;
            margin-top: 5px;
            overflow: hidden;
            z-index: 1000;
        }

        .language-dropdown.show { display: block; }

        .language-option {
            padding: 12px 16px;
            color: #333;
            cursor: pointer;
            transition: background 0.2s;
            font-size: 14px;
            border-bottom: 1px solid #f0f0f0;
        }

        .language-option:last-child { border-bottom: none; }
        .language-option:hover { background: #f0f0f0; }
        .language-option.active { background: #FDB913; color: black; font-weight: 600; }

        /* Responsive navbar */
        @media (max-width: 768px) {
            .navbar { padding: 15px 20px; position: relative; }

            .nav-links { display: none; }

            .nav-links.mobile-open {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #FDB913;
                padding: 15px 20px;
                gap: 0;
                z-index: 999;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                list-style: none;
                margin: 0;
            }

            .nav-links.mobile-open li { width: 100%; }

            .nav-links.mobile-open a {
                display: block;
                padding: 12px 0;
                font-size: 16px;
                font-weight: 600;
                border-bottom: 1px solid rgba(0,0,0,0.15);
                color: black;
                text-decoration: none;
            }

            .hamburger-btn { display: block; }

            .nav-right { gap: 8px; }

            .logo-full { display: none; }
            .logo-short { display: inline; }

            #current-lang { display: none; }

            #btn-login { font-size: 13px; white-space: nowrap; }

            .navbar .btn-register { font-size: 12px; padding: 6px 10px; white-space: nowrap; }
        }
    `;

    /* =====================================================================
       TRADUCCIONES DEL NAVBAR
    ===================================================================== */
    const t = {
        es: { drivers: 'Conductores', driversBtn: 'Consultar taxistas', help: 'Ayuda', trips: 'Tus viajes', login: 'Inicia sesión', register: 'Registrarse', logout: 'Cerrar sesión' },
        en: { drivers: 'Drivers', driversBtn: 'Check drivers', help: 'Help', trips: 'Your trips', login: 'Sign in', register: 'Register', logout: 'Sign out' },
        ca: { drivers: 'Conductors', driversBtn: 'Consultar taxistes', help: 'Ajuda', trips: 'Els teus viatges', login: 'Inicia sessió', register: "Registra't", logout: 'Tanca sessió' }
    };

    /* =====================================================================
       DETECTAR PÁGINA ACTIVA
    ===================================================================== */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isSimplePage = currentPage === 'login.html' || currentPage === 'register.html';

    function getActivePage() {
        if (currentPage.includes('conductores')) return 'conductores';
        if (currentPage.includes('ayuda')) return 'ayuda';
        if (currentPage.includes('historial-viajes')) return 'viajes';
        return '';
    }

    /* =====================================================================
       CONSTRUIR HTML DEL NAVBAR
    ===================================================================== */
    function langSelectorHTML(lang) {
        const langMap = { es: 'ES', en: 'EN', ca: 'CA' };
        return `
            <div class="language-selector">
                <button class="language-btn" onclick="toggleLanguageDropdown()">
                    <i class="ph ph-globe"></i>
                    <span id="current-lang">${langMap[lang] || 'ES'}</span>
                    <i class="ph ph-caret-down" style="font-size:12px;"></i>
                </button>
                <div class="language-dropdown" id="language-dropdown">
                    <div class="language-option${lang === 'es' ? ' active' : ''}" onclick="changeLanguage('es','ES')">🇪🇸 Español</div>
                    <div class="language-option${lang === 'en' ? ' active' : ''}" onclick="changeLanguage('en','EN')">🇬🇧 English</div>
                    <div class="language-option${lang === 'ca' ? ' active' : ''}" onclick="changeLanguage('ca','CA')">🏴 Català</div>
                </div>
            </div>`;
    }

    function buildSimpleNav(lang) {
        return `
    <nav class="navbar">
        <a href="index.html" class="logo"><span class="logo-full">EasyTaxi Palma</span><span class="logo-short">ETP</span></a>
        <div class="nav-right" id="nav-right">
            ${langSelectorHTML(lang)}
        </div>
    </nav>`;
    }

    function buildFullNav(lang, activePage, usuario) {
        const tr = t[lang] || t.es;
        const userName = usuario ? (usuario.nombre || 'Usuario') : null;
        const langMap = { es: 'ES', en: 'EN', ca: 'CA' };
        const showDriversButton = currentPage === 'index.html' && userName;

        const navRightHTML = userName ? `
            <div class="language-selector">
                <button class="language-btn" onclick="toggleLanguageDropdown()">
                    <i class="ph ph-globe"></i>
                    <span id="current-lang">${langMap[lang] || 'ES'}</span>
                    <i class="ph ph-caret-down" style="font-size:12px;"></i>
                </button>
                <div class="language-dropdown" id="language-dropdown">
                    <div class="language-option${lang === 'es' ? ' active' : ''}" onclick="changeLanguage('es','ES')">🇪🇸 Español</div>
                    <div class="language-option${lang === 'en' ? ' active' : ''}" onclick="changeLanguage('en','EN')">🇬🇧 English</div>
                    <div class="language-option${lang === 'ca' ? ' active' : ''}" onclick="changeLanguage('ca','CA')">🏴 Català</div>
                </div>
            </div>
            <a href="perfil.html" style="display:flex;align-items:center;gap:10px;color:black;font-weight:500;text-decoration:none;transition:opacity 0.3s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">
                <i class="ph ph-user-circle" style="font-size:20px;"></i>
                <span>${userName}</span>
            </a>
            <a href="#" onclick="cerrarSesion()" class="btn-register btn-logout" id="navbar-btn-logout">${tr.logout}</a>
        ` : `
            ${langSelectorHTML(lang)}
            <a href="login.html" id="btn-login">${tr.login}</a>
            <a href="register.html" class="btn-register" id="btn-register">${tr.register}</a>
        `;

        return `
    <nav class="navbar">
        <div class="nav-left">
            <a href="index.html" class="logo"><span class="logo-full">EasyTaxi Palma</span><span class="logo-short">ETP</span></a>
            <ul class="nav-links">
                <li><a href="conductores.html" id="nav-drivers"${activePage === 'conductores' ? ' class="active"' : ''}>${tr.drivers}</a></li>
                <li><a href="ayuda.html" id="nav-help"${activePage === 'ayuda' ? ' class="active"' : ''}>${tr.help}</a></li>
                <li id="nav-viajes"${!userName ? ' style="display:none;"' : ''}><a href="historial-viajes.html" id="nav-viajes-link"${activePage === 'viajes' ? ' class="active"' : ''}>${tr.trips}</a></li>
                ${showDriversButton ? `<li><a href="#" class="nav-drivers-btn" id="nav-drivers-btn" onclick="consultarTaxistasDisponibles(); return false;">${tr.driversBtn}</a></li>` : ''}
            </ul>
            <button class="hamburger-btn" onclick="this.closest('nav').querySelector('.nav-links').classList.toggle('mobile-open')" aria-label="Menú">
                <i class="ph ph-list"></i>
            </button>
        </div>
        <div class="nav-right" id="nav-right">
            ${navRightHTML}
        </div>
    </nav>`;
    }

    /* =====================================================================
       FUNCIONES GLOBALES
    ===================================================================== */
    window.toggleLanguageDropdown = function () {
        document.getElementById('language-dropdown')?.classList.toggle('show');
    };

    window.changeLanguage = function (langCode, langDisplay) {
        localStorage.setItem('language', langCode);
        const el = document.getElementById('current-lang');
        if (el) el.textContent = langDisplay;
        document.getElementById('language-dropdown')?.classList.remove('show');
        document.querySelectorAll('.language-option').forEach(o => o.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');

        // Actualizar textos del navbar
        const tr = t[langCode] || t.es;
        const nd = document.getElementById('nav-drivers');        if (nd) nd.textContent = tr.drivers;
        const nh = document.getElementById('nav-help');          if (nh) nh.textContent = tr.help;
        const nv = document.getElementById('nav-viajes-link');   if (nv) nv.textContent = tr.trips;
        const db = document.getElementById('nav-drivers-btn');   if (db) db.textContent = tr.driversBtn;
        const bl = document.getElementById('btn-login');         if (bl) bl.textContent = tr.login;
        const br = document.getElementById('btn-register');      if (br) br.textContent = tr.register;
        const lo = document.getElementById('navbar-btn-logout'); if (lo) lo.textContent = tr.logout;

        // Llamar al callback de la página (si existe)
        if (typeof window.onLanguageChange === 'function') {
            window.onLanguageChange(langCode);
        }
    };

    window.cerrarSesion = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    };

    /* =====================================================================
       INYECTAR CSS + HTML SINCRONAMENTE
    ===================================================================== */
    const styleEl = document.createElement('style');
    styleEl.id = 'navbar-shared-styles';
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    const lang = localStorage.getItem('language') || 'es';
    let usuario = null;
    try { usuario = JSON.parse(localStorage.getItem('usuario') || 'null'); } catch (e) {}

    const navHTML = isSimplePage
        ? buildSimpleNav(lang)
        : buildFullNav(lang, getActivePage(), usuario);

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    /* =====================================================================
       CERRAR DROPDOWN AL HACER CLICK FUERA
    ===================================================================== */
    document.addEventListener('DOMContentLoaded', function () {
        document.addEventListener('click', function (e) {
            const selector = document.querySelector('.language-selector');
            const dropdown = document.getElementById('language-dropdown');
            if (selector && !selector.contains(e.target)) {
                dropdown?.classList.remove('show');
            }
        });
    });

})();
