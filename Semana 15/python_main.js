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
        const codeBlock = button.nextElementSibling; // El bloque de código es el siguiente hermano del botón

        if (codeBlock && codeBlock.classList.contains('code-block')) {
            // Oculta el bloque de código por defecto y ajusta el texto del botón
            if (codeBlock.style.display !== 'block') {
                codeBlock.style.display = 'none';
                button.textContent = 'Mostrar Ejemplos'; // Texto inicial: "Mostrar Ejemplos"
            } else {
                button.textContent = 'Ocultar Ejemplos'; // Si por alguna razón ya estaba visible
            }
        }

        button.addEventListener('click', () => {
            const currentCodeBlock = button.nextElementSibling; 
            if (currentCodeBlock) {
                if (currentCodeBlock.style.display === 'none' || currentCodeBlock.style.display === '') {
                    currentCodeBlock.style.display = 'block';
                    button.textContent = 'Ocultar Ejemplos'; // Cambia a "Ocultar Ejemplos"
                } else {
                    currentCodeBlock.style.display = 'none';
                    button.textContent = 'Mostrar Ejemplos'; // Cambia a "Mostrar Ejemplos"
                }
            }
        });
    });
});