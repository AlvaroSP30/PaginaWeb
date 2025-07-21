document.addEventListener('DOMContentLoaded', () => {
    // 1. Actualizar dinámicamente el año en el footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Añadir funcionalidad de copiar al portapapeles para los bloques de código
    const copyableCodeBlocks = document.querySelectorAll('.copyable-code');

    copyableCodeBlocks.forEach(codeBlock => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.style.position = 'relative';
        wrapperDiv.style.display = 'inline-block'; // Para que el botón se posicione correctamente si el bloque de código es inline
        wrapperDiv.style.width = '100%'; // Para que ocupe todo el ancho disponible si es un bloque
        
        // Mover el codeBlock dentro del wrapperDiv
        codeBlock.parentNode.insertBefore(wrapperDiv, codeBlock);
        wrapperDiv.appendChild(codeBlock);

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copiar';
        // Estilos del botón para que flote a la derecha superior
        copyButton.style.position = 'absolute';
        copyButton.style.top = '5px';
        copyButton.style.right = '5px';
        copyButton.style.padding = '4px 8px';
        copyButton.style.backgroundColor = '#3b82f6'; // Tailwind blue-600
        copyButton.style.color = 'white';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '4px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.opacity = '0'; // Inicialmente invisible
        copyButton.style.transition = 'opacity 0.2s ease-in-out, background-color 0.2s ease-in-out';
        copyButton.style.zIndex = '10'; // Para asegurar que esté encima del código

        wrapperDiv.appendChild(copyButton);

        // Mostrar/ocultar botón al pasar el mouse sobre el wrapper del código
        wrapperDiv.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });

        wrapperDiv.addEventListener('mouseleave', () => {
            // Solo ocultar si el mouse no está sobre el botón
            if (!copyButton.matches(':hover')) {
                copyButton.style.opacity = '0';
            }
        });

        copyButton.addEventListener('click', () => {
            const codeToCopy = codeBlock.textContent.trim();
            
            navigator.clipboard.writeText(codeToCopy)
                .then(() => {
                    copyButton.textContent = '¡Copiado!';
                    copyButton.style.backgroundColor = '#4CAF50'; // Un verde para indicar éxito
                    setTimeout(() => {
                        copyButton.textContent = 'Copiar';
                        copyButton.style.backgroundColor = '#3b82f6'; // Restaurar color original
                        copyButton.style.opacity = '0'; // Ocultar después de un tiempo
                    }, 1500); // 1.5 segundos
                })
                .catch(err => {
                    console.error('Error al copiar el texto: ', err);
                    // Fallback para navegadores antiguos
                    const textArea = document.createElement('textarea');
                    textArea.value = codeToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                    
                    copyButton.textContent = '¡Copiado! (Fallback)';
                    copyButton.style.backgroundColor = '#FFC107'; // Amarillo para fallback
                    setTimeout(() => {
                        copyButton.textContent = 'Copiar';
                        copyButton.style.backgroundColor = '#3b82f6';
                        copyButton.style.opacity = '0';
                    }, 1500);
                });
        });
        
        // Asegurar que el botón se oculte si el mouse sale del botón pero no ha re-entrado al contenedor
        copyButton.addEventListener('mouseleave', () => {
            wrapperDiv.dispatchEvent(new Event('mouseleave'));
        });
    });

    // 3. Generar Tabla de Contenidos Dinámica
    const tocContainer = document.getElementById('table-of-contents');
    const blogCards = document.querySelectorAll('.blog-card');
    const tocList = document.createElement('ul');
    tocList.style.listStyle = 'none'; // Quitar viñetas por defecto
    tocList.style.paddingLeft = '0';

    let currentH2List = null; // Para anidar h3s bajo su h2 padre

    blogCards.forEach(card => {
        const headings = card.querySelectorAll('h2, h3');
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

            // Smooth scroll al hacer clic
            link.addEventListener('click', (event) => {
                event.preventDefault();
                document.querySelector(event.target.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });

            if (heading.tagName === 'H2') {
                listItem.style.marginTop = '10px';
                listItem.style.fontWeight = 'bold';
                link.style.fontSize = '1.1em';
                tocList.appendChild(listItem);
                listItem.appendChild(link);
                currentH2List = document.createElement('ul');
                currentH2List.style.listStyle = 'none';
                currentH2List.style.paddingLeft = '20px';
                listItem.appendChild(currentH2List);
            } else if (heading.tagName === 'H3' && currentH2List) {
                listItem.style.marginTop = '5px';
                link.style.fontSize = '0.95em';
                link.style.color = '#334155'; // Un gris más oscuro
                currentH2List.appendChild(listItem);
                listItem.appendChild(link);
            }
        });
    });

    if (tocList.children.length > 0) {
        tocContainer.appendChild(tocList);
    } else {
        // Si no hay encabezados para generar TOC, ocultar el contenedor
        tocContainer.style.display = 'none';
    }
});