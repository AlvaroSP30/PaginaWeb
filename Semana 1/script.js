// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mensaje de bienvenida al cargar la página
    alert('¡Bienvenido a la presentación del Sílabus!');

    // 2. Actualizar dinámicamente el año en el footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 3. Añadir interactividad a las tarjetas de las semanas
    const weekCards = document.querySelectorAll('.week-card');

    weekCards.forEach(card => {
        // Efecto de escala al pasar el mouse por encima
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.2s ease-in-out';
        });

        // Restaurar escala al quitar el mouse
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
            card.style.transition = 'transform 0.2s ease-in-out';
        });

        // Opcional: Mostrar el título de la semana al hacer clic
        card.addEventListener('click', () => {
            const weekTitle = card.querySelector('h3').textContent;
            console.log(`Hiciste clic en: ${weekTitle}`);
            // Podrías añadir más interactividad aquí, como mostrar más detalles en un modal
        });
    });
});