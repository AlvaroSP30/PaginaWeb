document.addEventListener('DOMContentLoaded', () => {
    // 1. Actualizar dinámicamente el año en el footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Generar Tabla de Contenidos Dinámica
    const tocContainer = document.getElementById('toc-container');
    const blogArticles = document.querySelectorAll('article.blog-card');
    const tocList = document.createElement('ul');
    tocList.style.listStyle = 'none'; // Quitar viñetas por defecto
    tocList.style.paddingLeft = '0';

    blogArticles.forEach(article => {
        // En este caso, solo hay h2 como títulos principales para el TOC
        const h2 = article.querySelector('h2');
        if (h2) {
            // Asegurar que el h2 tenga un ID para el ancla
            if (!h2.id) {
                h2.id = h2.textContent.toLowerCase()
                            .replace(/[^a-z0-9\s]/g, '')
                            .replace(/\s+/g, '-')
                            .substring(0, 50); // Limitar longitud para IDs
            }

            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${h2.id}`;
            link.textContent = h2.textContent;
            link.style.textDecoration = 'none';
            link.style.color = '#1e40af'; // Azul oscuro para los enlaces
            link.style.fontSize = '1.1em';
            link.style.marginBottom = '8px'; // Pequeño margen entre elementos
            link.style.display = 'block'; // Para que el margin funcione bien

            // Smooth scroll al hacer clic
            link.addEventListener('click', (event) => {
                event.preventDefault();
                document.querySelector(event.target.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        }
    });

    if (tocList.children.length > 0) {
        tocContainer.appendChild(tocList);
    } else {
        // Si no se encontraron encabezados para el TOC, ocultar el contenedor
        tocContainer.style.display = 'none';
    }

    // 3. Resaltado de Código Inline
    const inlineCodeElements = document.querySelectorAll('.code-inline');

    inlineCodeElements.forEach(codeElement => {
        codeElement.style.transition = 'background-color 0.2s ease-in-out, color 0.2s ease-in-out';
        codeElement.style.padding = '2px 4px';
        codeElement.style.borderRadius = '3px';
        codeElement.style.cursor = 'pointer';

        codeElement.addEventListener('mouseover', () => {
            codeElement.style.backgroundColor = '#e0f2fe'; // Azul claro al pasar el mouse
            codeElement.style.color = '#000'; // Asegurar contraste
        });

        codeElement.addEventListener('mouseout', () => {
            codeElement.style.backgroundColor = 'inherit'; // Volver al color de fondo original
            codeElement.style.color = 'inherit'; // Volver al color de texto original
        });

        codeElement.addEventListener('click', () => {
            console.log(`Clase o Utilidad de CSS: ${codeElement.textContent}`);
            // Podrías añadir una pequeña alerta visual si lo prefieres,
            // pero el console.log es menos intrusivo para fragmentos pequeños.
        });
    });
});