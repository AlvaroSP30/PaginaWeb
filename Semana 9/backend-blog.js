document.addEventListener('DOMContentLoaded', () => {
    // 1. Actualizar dinámicamente el año en el footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Generar Tabla de Contenidos Dinámica
    const tocContainer = document.getElementById('table-of-contents');
    const blogCards = document.querySelectorAll('.blog-card');
    const tocList = document.createElement('ul');
    tocList.style.listStyle = 'none'; // Quitar viñetas por defecto
    tocList.style.paddingLeft = '0';

    blogCards.forEach(card => {
        // Solo procesamos h2 para este documento, ya que no hay h3
        const headings = card.querySelectorAll('h2'); 
        headings.forEach(heading => {
            // Asegurar que cada encabezado tenga un ID para el ancla
            if (!heading.id) {
                heading.id = heading.textContent.toLowerCase()
                                .replace(/[^a-z0-9\s]/g, '') // Quitar caracteres especiales
                                .replace(/\s+/g, '-')       // Reemplazar espacios por guiones
                                .substring(0, 50);          // Limitar longitud
            }

            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            link.style.textDecoration = 'none';
            link.style.color = '#1e40af'; // Azul oscuro para los enlaces
            link.style.fontSize = '1.1em';
            listItem.style.marginTop = '10px';
            listItem.style.fontWeight = 'bold';

            // Smooth scroll al hacer clic
            link.addEventListener('click', (event) => {
                event.preventDefault();
                document.querySelector(event.target.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
    });

    if (tocList.children.length > 0) {
        tocContainer.appendChild(tocList);
    } else {
        // Si no hay encabezados para generar TOC, ocultar el contenedor
        tocContainer.style.display = 'none';
    }
});