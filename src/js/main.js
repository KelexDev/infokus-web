document.addEventListener('DOMContentLoaded', () => {

    // --- Menú Móvil: Toggle hamburguesa ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Cerrar menú al tocar un link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Parallax: Imágenes de fondo ---
    const heroBg = document.getElementById('hero-bg');
    const servicesBg = document.getElementById('services-bg');
    const portfolioBg = document.getElementById('portfolio-bg');
    const contactBg = document.getElementById('contact-bg');

    function updateParallax() {
        const scrolled = window.scrollY;

        if (heroBg) {
            heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.4}px)`;
        }

        if (servicesBg) {
            const section = servicesBg.closest('section');
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const offset = (sectionCenter - viewportCenter) * 0.15;
            const clamped = Math.max(-30, Math.min(30, offset));
            servicesBg.style.transform = `scale(1.1) translateY(${clamped}px)`;
        }

        if (portfolioBg) {
            const section = portfolioBg.closest('section');
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const offset = (sectionCenter - viewportCenter) * 0.15;
            const clamped = Math.max(-30, Math.min(30, offset));
            portfolioBg.style.transform = `scale(1.1) translateY(${clamped}px)`;
        }

        if (contactBg) {
            const section = contactBg.closest('section');
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const offset = (sectionCenter - viewportCenter) * 0.15;
            const clamped = Math.max(-30, Math.min(30, offset));
            contactBg.style.transform = `scale(1.1) translateY(${clamped}px)`;
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    }, { passive: true });

    // --- Header: Ocultar al bajar, mostrar al subir ---
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 5) {
            // Scrolling down — hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up — show header
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // --- Formulario de Contacto ---
    const contactForm = document.querySelector('#contacto form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Evitamos el comportamiento por defecto de recarga de la página
            event.preventDefault();

            // Capturamos los campos del formulario
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');

            // Validación básica de campos vacíos (Sanity Check)
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert('Por favor, completa todos los campos antes de enviar.');
                return;
            }

            // Validación simple de formato de correo electrónico mediante Regex estándar
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                alert('Por favor, introduce un correo electrónico válido.');
                emailInput.focus();
                return;
            }

            // Simulación de envío exitoso (En fases futuras esto conectará con una API o servicio de correo)
            console.log('Formulario válido. Datos listos para procesar:', {
                nombre: nameInput.value.trim(),
                correo: emailInput.value.trim(),
                mensaje: messageInput.value.trim()
            });

            // Feedback visual de éxito para el usuario (UX)
            alert('¡Mensaje enviado con éxito! En breve nos pondremos en contacto contigo.');

            // Limpiamos el formulario tras el envío exitoso
            contactForm.reset();
        });
    }
});