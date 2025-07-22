document.addEventListener('DOMContentLoaded', () => {
    // 1. Actualizar dinámicamente el año en el footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Añadir la animación de aparición escalonada a las tarjetas de las semanas
    const weekCards = document.querySelectorAll('.week-card');

    weekCards.forEach((card, index) => {
        // Aplica un retraso a la animación para cada tarjeta
        card.style.animationDelay = `${index * 0.1}s`;
        // Añade la clase que activa la animación CSS definida en style.css
        card.classList.add('animate-fade-in');

        // Opcional: Mostrar el título de la semana al hacer clic (para depuración o futura interactividad)
        card.addEventListener('click', () => {
            const weekTitle = card.querySelector('h3').textContent;
            console.log(`Hiciste clic en: ${weekTitle}`);
            // Aquí podrías añadir lógica adicional, como abrir un modal con más detalles
        });
    });

    // Nota: Los efectos de escala al pasar el mouse (transform: scale)
    // y la transición de sombra ahora se manejan directamente con las clases
    // de Tailwind CSS en el HTML (`hover:shadow-xl transition-all duration-300`)
    // para un rendimiento óptimo y un código más limpio.
});