document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los enlaces de la barra de navegación que apuntan a una sección de la página.
    document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el comportamiento de salto predeterminado del enlace.

            // Obtiene el ID de la sección a la que se debe desplazar (ej., "backend-concepts", "project-gallery").
            const targetId = this.getAttribute('href');
            // Encuentra el elemento de destino en el DOM.
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Realiza el desplazamiento suave hacia el elemento de destino.
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('nav').offsetHeight), // Ajusta la posición para compensar la altura de la barra de navegación fija.
                    behavior: 'smooth' // Habilita el desplazamiento suave.
                });
            }
        });
    });
});