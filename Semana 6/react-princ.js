document.addEventListener('DOMContentLoaded', () => {
    // 1. Actualizar dinámicamente el año en el footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Añadir funcionalidad de copiar al portapapeles para los bloques de código
    const copyableCodeBlocks = document.querySelectorAll('.copyable-code');

    copyableCodeBlocks.forEach(codeBlock => {
        // Envolver el bloque de código en un div para posicionar el botón de copiar
        const wrapperDiv = document.createElement('div');
        wrapperDiv.style.position = 'relative';
        wrapperDiv.style.display = 'block'; // Asegura que el contenedor del pre sea un bloque
        
        // Mover el codeBlock dentro del wrapperDiv
        codeBlock.parentNode.insertBefore(wrapperDiv, codeBlock);
        wrapperDiv.appendChild(codeBlock);
        wrapperDiv.style.width = '100%'; // Ocupa el ancho completo del padre

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copiar';
        // Estilos del botón para que flote a la derecha superior
        copyButton.style.position = 'absolute';
        copyButton.style.top = '5px';
        copyButton.style.right = '5px';
        copyButton.style.padding = '4px 8px';
        copyButton.style.backgroundColor = '#3b82f6'; // Un azul
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
            // Solo ocultar si el mouse no está sobre el botón o si el botón no tiene foco
            if (!copyButton.matches(':hover') && document.activeElement !== copyButton) {
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
                    // Fallback para navegadores antiguos o permisos denegados
                    const textArea = document.createElement('textarea');
                    textArea.value = codeToCopy;
                    // Estilos para ocultar el textarea pero que sea seleccionable
                    textArea.style.position = 'fixed';
                    textArea.style.top = '0';
                    textArea.style.left = '0';
                    textArea.style.width = '2em';
                    textArea.style.height = '2em';
                    textArea.style.padding = '0';
                    textArea.style.border = 'none';
                    textArea.style.outline = 'none';
                    textArea.style.boxShadow = 'none';
                    textArea.style.background = 'transparent';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        copyButton.textContent = '¡Copiado! (Fallback)';
                        copyButton.style.backgroundColor = '#FFC107'; // Amarillo para fallback
                    } catch (ex) {
                        copyButton.textContent = 'Error al copiar';
                        copyButton.style.backgroundColor = '#f44336'; // Rojo para error
                    } finally {
                        textArea.remove();
                        setTimeout(() => {
                            copyButton.textContent = 'Copiar';
                            copyButton.style.backgroundColor = '#3b82f6';
                            copyButton.style.opacity = '0';
                        }, 1500);
                    }
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

    let currentH2ListItem = null; // Para anidar h3s bajo su h2 padre

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
                currentH2ListItem = document.createElement('ul'); // Crea una nueva UL para los h3 de este h2
                currentH2ListItem.style.listStyle = 'none';
                currentH2ListItem.style.paddingLeft = '20px'; // Indentación para los h3
                listItem.appendChild(currentH2ListItem);
            } else if (heading.tagName === 'H3' && currentH2ListItem) {
                listItem.style.marginTop = '5px';
                link.style.fontSize = '0.95em';
                link.style.color = '#334155'; // Un gris más oscuro
                currentH2ListItem.appendChild(listItem);
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