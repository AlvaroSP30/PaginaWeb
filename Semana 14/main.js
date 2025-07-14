// main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Efecto de revelado al scroll para las tarjetas de contenido ---
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // El viewport es el elemento raíz
        rootMargin: '0px',
        threshold: 0.1 // El 10% de la sección debe ser visible para activar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Deja de observar una vez que la sección es visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Pequeña animación para el título principal al cargar ---
    const headerTitle = document.querySelector('.header-title');
    if (headerTitle) {
        headerTitle.style.opacity = '0';
        headerTitle.style.transform = 'translateY(-20px)';
        // Pequeño retraso para que la transición sea visible después de la carga inicial del DOM
        setTimeout(() => {
            headerTitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            headerTitle.style.opacity = '1';
            headerTitle.style.transform = 'translateY(0)';
        }, 100); // 100ms de retraso
    }

    // --- Lógica para el toggle de visibilidad de bloques de código ---
    const toggleButtons = document.querySelectorAll('.toggle-code-button');

    toggleButtons.forEach(button => {
        // Al cargar la página, aseguramos que el código esté oculto si el HTML lo indica
        const codeBlock = button.nextElementSibling;
        if (codeBlock && codeBlock.classList.contains('code-block')) {
            // Si tiene style="display: none;" en HTML, el JS lo respeta.
            // Si no lo tiene, lo ocultamos por defecto y actualizamos el texto del botón.
            if (codeBlock.style.display !== 'block') {
                codeBlock.style.display = 'none';
                button.innerText = 'Mostrar Código';
            } else {
                button.innerText = 'Ocultar Código';
            }
        }


        button.addEventListener('click', () => {
            const codeBlock = button.nextElementSibling; // El elemento <pre class="code-block"> es el siguiente hermano
            if (codeBlock) {
                if (codeBlock.style.display === 'none' || codeBlock.style.display === '') {
                    codeBlock.style.display = 'block';
                    button.innerText = 'Ocultar Código';
                } else {
                    codeBlock.style.display = 'none';
                    button.innerText = 'Mostrar Código';
                }
            }
        });
    });
});